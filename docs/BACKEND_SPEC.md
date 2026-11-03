# benthomas.life — Backend & Admin Panel Specification

**Owner:** Ben Thomas (Benison Thomas)
**Audience:** The AI coding agent / developer who will turn the current design into a full product
**Status:** v2 — ready for implementation
**Phase 1 scope:** full admin panel + content management, automatic Instagram sync, **automatic LinkedIn sync of personal posts**, and a **multilingual site (English, Spanish, Portuguese) governed from the backend**.

---

## 0. The one rule: do not change the design

The front end in this repository is the **approved design**. It must be reproduced pixel-for-pixel.

- Do **not** change any markup, Tailwind classes, spacing, colours, fonts, the graph-paper background, highlighter marks, layout, copy hierarchy or animations in `app/` (public routes) or `components/`.
- Do **not** rename, restyle or "improve" components. No new sections on the public site unless the owner asks.
- The **only** change allowed in public components is **where the data comes from**: replace static imports from `lib/content.ts` with server-side data functions that return **exactly the same TypeScript types** (see §3).
- Every string, image, date, number, category and link currently visible on the site must become editable from the admin panel. Nothing visible may remain hard-coded.
- Before/after screenshots of every public page must match (see §13 acceptance criteria).
- The **only** new visible element allowed on the public site is the small language switcher described in §7.5, built from the existing nav-link style.

> Recommended technique: keep the existing types in `lib/content.ts` as the **contract**. Build data functions (`getJournalPosts(locale)`, `getPost(slug, locale)`, `getLibrary(locale)`, `getInstagramPosts(locale)`, `getLinkedInPosts(locale)`, `getProfile(locale)`, `getSiteCopy(locale)`…) that read from the backend and map records → those exact types. Then swap imports in components. If a component renders correctly with the static data, it will render identically with backend data.

### 0.1 Tech stack: the agent decides

The implementing agent chooses the backend stack and documents the choice (with a one-line reason per item) in `docs/ARCHITECTURE.md` before writing code. This includes:

- Database and how it is queried (SQL, ORM, query builder, headless CMS, etc.)
- Authentication / session library for the admin
- Media storage (images, reel videos, PDFs) and image processing
- Admin panel UI library
- Background job / cron scheduler
- Translation tooling (machine-translation provider, if any — see §7.7)
- Hosting and deployment

Fixed constraints the stack must respect:

1. **The front end stays exactly as it is.** The public site is the existing Next.js (App Router) + React + Tailwind CSS code in this repo. Do not port it to another framework, do not change its styling system, do not regenerate components. Framework-specific mentions in this document (Server Actions, `"use cache"`, `next/og`, `generateStaticParams`, etc.) refer to this existing front end; backend-side mentions are examples, not requirements.
2. Everything in this document (data model, admin screens, integrations, languages, acceptance criteria) must be delivered regardless of the stack chosen.
3. Secrets stay server-side; integration tokens are encrypted at rest.
4. The table/field names in §3 describe the **data that must exist**, not a mandatory schema. The agent may rename or restructure them as long as every field and behaviour is covered.

---

## 1. What the website contains today (content inventory)

| Area | Public routes | Data source today | Must be managed in admin |
|---|---|---|---|
| Profile & brand | All pages (header, footer, hero, bylines) | `profile` object | Name, full name, role/title, domain, email, Instagram URL + handle, LinkedIn URL + handle, profile photo(s) |
| Navigation | Header + footer | `navLinks` | Labels, order, visibility |
| Home page copy | `/` (hero, section headings, Founders section) | Hard-coded in `components/site/*.tsx` | Every headline, sub-headline, highlighted words, button labels, section intros, images |
| Journal (daily blog) | `/`, `/journal`, `/journal/[slug]` | `journalPosts`, `journalCategories` | Posts, categories, dates, read time, excerpt, body, cover image (optional), SEO |
| Library (free resources) | `/`, `/library`, `/library/[slug]` | `library` | Resources, kinds, formats, files, previews (prompts / chapters / tools / video chapters) |
| Instagram | `/`, `/instagram` | `instagramPosts` | **Auto-synced** from Instagram + manual overrides |
| LinkedIn | `/`, `/linkedin` | `linkedinPosts` | **Auto-synced** personal posts + publish-from-admin + manual fallback (see §6) |
| Images | Everywhere | `public/images/*.png` | Media library (upload, replace, alt text) |
| Languages | Every page, in EN / ES / PT | English only today | Enabled languages, default language, translations of every item above (see §7) |

Hard-coded image references that must become media fields:
`components/site/hero.tsx`, `components/site/founders.tsx`, `components/library/resource-preview.tsx`, `components/social/linkedin-post-card.tsx`, `app/instagram/page.tsx`, `app/journal/[slug]/page.tsx` (author avatar).

---

## 2. Roles & security

- **Roles:** `owner` (everything, including settings and integrations), `editor` (content only, cannot touch integrations, users or settings).
- `/admin/**` protected at the routing layer (e.g. Next.js `proxy.ts`) **and** re-checked in every mutation / API handler (never trust the routing layer alone).
- No public registration endpoint. Invitations generate a one-time link.
- Rate-limit login; lock after repeated failures.
- All mutations validated server-side against a schema (validator of the agent's choice).
- Integration tokens (Instagram, LinkedIn) stored **encrypted** in the database (AES-GCM with a key in an env var), never sent to the browser.
- Audit log table: who changed what and when.
- Security headers in `next.config` (`X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security`, `X-Frame-Options: SAMEORIGIN` on `/admin` only).

---

## 3. Data model

All tables have `id` (uuid), `created_at`, `updated_at`. Content tables also have `status` (`draft | scheduled | published | archived`), `published_at`, `created_by`, `updated_by`.

**Translatable fields** (titles, body, excerpts, copy, labels, alt text, captions, SEO fields, slugs) are listed per entity in §7.3. They are stored per language, not only in the base records shown below.

Store **raw values** in the database and **format at render time** so the UI shows exactly what it shows today:
- Numbers like `412K`, `1.2M`, `8,412` → store integers, format with a shared `formatCompact()` / `formatThousands()` helper.
- Dates like `Nov 3, 2026`, `Nov 3`, `2d`, `1w` → store `timestamptz`, format with the same patterns per component.
- Read time `6 min` → auto-calculated from body word count (≈ 225 wpm), overridable.

### 3.1 Site & profile (singletons)

```
site_settings (single row)
  name                 text      -- "Ben Thomas"
  full_name            text      -- "Benison Thomas"
  role                 text      -- "CEO · AI Entrepreneur"
  domain               text
  email                text
  instagram_url        text
  instagram_handle     text
  linkedin_url         text
  linkedin_handle      text
  avatar_media_id      fk media  -- small round photo (bylines, LinkedIn cards, IG header)
  portrait_media_id    fk media  -- hero portrait
  seo_title            text
  seo_description      text
  og_image_media_id    fk media

nav_links
  label, href, position int, visible bool, location enum('header','footer','both')

site_copy                        -- every hard-coded string on the public site
  key        text unique         -- e.g. "home.hero.headline", "home.founders.body"
  value      jsonb               -- { text, highlight?: string[] } or rich text
  description text               -- shown to the editor ("Hero headline – 2 lines max")
```

`site_copy` keys must be seeded by extracting **every** literal string currently in `components/site/*.tsx`, `app/**/page.tsx` headings and empty-state text. Highlighted (yellow marker) words are stored as `highlight` so the editor can choose which words get the marker.

### 3.2 Journal (daily blog)

```
journal_categories
  name text unique, slug text unique, description text, position int
  -- seed: AI, Entrepreneurship, Geopolitics, Field Notes

journal_posts
  slug            text unique
  title           text
  category_id     fk journal_categories
  excerpt         text  (max ~220 chars)
  body            jsonb         -- rich text (headings, paragraphs, quotes, lists, images, embeds)
  cover_media_id  fk media nullable
  read_time_min   int nullable  -- null = auto
  featured        bool          -- pinned in hero "latest" slot
  seo_title, seo_description, og_image_media_id
  status, published_at          -- published_at drives the visible date
```

- Current body shape `{ heading?: string; text: string }[]` must still render identically; the rich-text renderer maps H2 → current heading style, paragraph → current paragraph style.
- **Scheduling:** posts with `status = scheduled` and `published_at <= now()` are published by a cron job every 5 minutes (needed for "daily" publishing).
- Slug auto-generated from title, editable, unique, with redirects kept if changed (`journal_redirects` table).
- Also generate **RSS feed** (`/journal/rss.xml`) and include posts in `sitemap.xml`.

### 3.3 Library (free resources)

```
library_items
  slug          text unique
  title         text
  kind          enum('Prompt System','Field Guide','Toolkit','Canvas','Session')  -- manageable list preferred
  formats       text[]        -- 'PDF','Figma + PDF','YouTube','Notion'
  summary       text
  why           text          -- "Why I made this"
  meta          text          -- "100 prompts · 6 sections" (or computed)
  updated_label text          -- "Updated Nov 2026" (or computed from updated_at)
  inside        text[]        -- "What's inside" bullet list, orderable
  preview       jsonb         -- discriminated union, see below
  position      int
  status, published_at

library_assets                 -- the actual downloadable / linked files
  library_item_id fk
  format          text         -- matches one of item.formats
  type            enum('file','link')
  media_id        fk media nullable   -- uploaded PDFs
  url             text nullable       -- Notion / YouTube / Figma links
  label           text
  download_count  int default 0
```

`preview` must match the existing union exactly:
- `{ type: 'prompts', groups: [{ name, prompts: string[] }] }`
- `{ type: 'chapters', chapters: [{ title, detail }] }`
- `{ type: 'tools', groups: [{ name, tools: [{ name, note }] }] }`
- `{ type: 'video', chapters: [{ time, title }], youtubeUrl? }`

The admin form switches its editor based on `preview.type`. Validate with a Zod discriminated union.

Downloads go through `/api/library/[slug]/download?format=PDF` so we can count downloads and swap files without breaking links. All resources stay **free, no email gate** (the site is about free education, not selling).

### 3.4 Instagram

```
instagram_posts
  ig_media_id       text unique      -- id from Instagram API (null for manual posts)
  type              enum('reel','photo','carousel')
  permalink         text
  caption           text
  caption_override  text nullable    -- editor can shorten/clean caption shown on site
  thumbnail_media_id fk media        -- re-hosted cover image
  video_media_id    fk media nullable -- re-hosted reel video (optional, see §5.4)
  carousel_media    jsonb            -- [{ media_id, type }] for carousels
  alt_text          text             -- required before it can be visible
  posted_at         timestamptz
  like_count        int
  comment_count     int
  view_count        int nullable     -- reels
  visible           bool default true
  pinned            bool default false
  position_override int nullable
  last_synced_at    timestamptz
  source            enum('api','manual')
```

The site's `stat` field = `view_count` for reels, `like_count` for photos/carousels, formatted compact (`412K`).

### 3.5 LinkedIn

```
linkedin_posts
  urn               text unique nullable  -- urn:li:share:… / urn:li:ugcPost:… / urn:li:activity:…
  author_urn        text                  -- urn:li:person:{id}
  permalink         text
  topic             enum('AI','Entrepreneurship','Geopolitics','Leadership')  -- manageable list preferred
  topic_suggested   bool                  -- true until an editor confirms the auto-suggested topic
  text              text                  -- original text from LinkedIn, line breaks preserved (\n)
  text_override     text nullable         -- editor-cleaned version shown on site
  image_media_id    fk media nullable     -- re-hosted (LinkedIn media URLs expire)
  image_alt         text nullable
  is_repost         bool                  -- reshares without own commentary (hidden by default)
  posted_at         timestamptz
  reaction_count    int
  comment_count     int
  repost_count      int
  counts_source     enum('api','manual')  -- manual until read access is live (§6.2)
  visible, pinned, position_override
  last_synced_at    timestamptz
  source            enum('api','admin_publish','manual','embed')
```

Editor-owned fields (`topic` once confirmed, `text_override`, `image_alt`, `visible`, `pinned`, `position_override`) are **never overwritten** by sync.

### 3.6 Media library

```
media
  url, storage_key, content_type, size_bytes
  width, height, blurhash/lqip (for nice loading)
  alt_text text (required for images)
  caption text
  source enum('upload','instagram','linkedin')
  used_in jsonb  -- back-references so the editor sees where an image is used
```

Rules: images converted to WebP/AVIF on upload, max 10 MB images, 200 MB video, 50 MB PDFs. Deleting media that is in use is blocked.

### 3.7 Integrations & jobs

```
integrations
  provider enum('instagram','linkedin')
  account_id, account_username
  access_token_encrypted, token_expires_at, scopes text[]
  status enum('connected','expiring','expired','error')
  last_error text, last_synced_at

sync_runs
  provider, started_at, finished_at, status, items_created, items_updated, error
```

---

## 4. Admin panel (`/admin`)

Uses its own simple admin layout (it does **not** need the public graph-paper design; shadcn/ui components are fine). Must be usable on a phone, because Ben will often publish on the move.

| Screen | What it does |
|---|---|
| **Dashboard** | Today's post status ("Nothing published today" reminder), drafts, scheduled posts, integration health (token expiry warnings), last sync, top library downloads |
| **Journal → Posts** | List with filters (status, category, date), search. Create/edit with rich-text editor, live preview **using the real public components**, schedule date/time, duplicate, archive |
| **Journal → Categories** | Add / rename / reorder / delete (blocked if posts use it, or reassign) |
| **Library** | List + drag-to-reorder. Edit form with preview-type editor, file uploads per format, external links, "What's inside" list |
| **Instagram** | Connect / reconnect account, "Sync now" button, grid of synced posts with toggles: visible, pinned, caption override, alt text. Manual "add post by URL" fallback |
| **LinkedIn** | Connect account (publish + read), sync status and "Sync now", grid of synced posts with visible/pinned/topic/text override/alt text, **composer to publish a new post to LinkedIn from the admin**, smart-paste fallback (see §6) |
| **Languages** (owner) | Enable/disable languages, set default, translation-coverage matrix, machine-translation settings (see §7) |
| **Pages & copy** | Edit every `site_copy` key, grouped by page/section, with a live preview of that section. Choose highlighted words |
| **Profile & links** | `site_settings` form: name, role, email, socials, photos |
| **Navigation** | Reorder / rename / hide links |
| **Media** | Upload, browse, replace file (keeps same id everywhere), edit alt text, see usage |
| **Users** (owner) | Invite editor, remove, reset password |
| **Settings** (owner) | SEO defaults, OG image, integrations, audit log |

Editor experience requirements:
- **Preview before publish** for journal, library and copy changes (draft preview route `/admin/preview/...`, or Next.js draft mode).
- Autosave drafts every few seconds.
- Unsaved-changes warning.
- Publishing triggers cache revalidation so the live site updates in seconds.
- Every editor for translatable content has **language tabs** (EN / ES / PT) with a per-language status badge (missing · machine draft · needs review · published). See §7.6.

---

## 5. Instagram integration (automatic)

### 5.1 Which API

Use the **Instagram API with Instagram Login** (Meta). The old *Instagram Basic Display API* was shut down in December 2024 and must not be used.

Requirements on Ben's side:
1. Instagram account switched to **Professional** (Creator or Business). Free, done in the Instagram app.
2. A **Meta developer app** (developers.facebook.com) with the *Instagram* product added, using "Instagram API with Instagram Login".
3. Scopes: `instagram_business_basic` (read profile + media). Add `instagram_business_manage_insights` to read reel view counts.
4. Since only Ben's own account is read, the app can run in **development/standard access** with Ben added as an Instagram tester. App Review is only needed if other accounts must connect.

> Verify scope names and metrics against Meta's current docs at implementation time; Meta renames metrics frequently (e.g. `plays`/`impressions` were replaced by `views` in 2025).

### 5.2 Connect flow (admin)

1. Owner clicks **Connect Instagram** in `/admin/instagram`.
2. OAuth redirect to Instagram → callback route `/api/integrations/instagram/callback`.
3. Exchange code → short-lived token → **long-lived token (60 days)**.
4. Store encrypted token + expiry in `integrations`.
5. Run first full sync immediately.

### 5.3 Sync job

Scheduled job, every 30–60 minutes (`/api/cron/instagram-sync`, protected by `CRON_SECRET`):

1. `GET https://graph.instagram.com/me/media?fields=id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count,children{media_type,media_url,thumbnail_url}` with pagination.
2. Map type:
   - `media_product_type = REELS` → `reel`
   - `media_type = CAROUSEL_ALBUM` → `carousel`
   - `media_type = IMAGE` → `photo`
3. For reels, fetch insights (`/{media-id}/insights?metric=views`) for the view count.
4. **Re-host media in the site's own media storage.** Instagram `media_url` links are signed CDN URLs that **expire**; never hot-link them on the site. Download the thumbnail (and optionally the video) once, store it, save `media_id`.
5. Upsert by `ig_media_id`. **Never overwrite** editor fields (`caption_override`, `alt_text`, `visible`, `pinned`, `position_override`).
6. Refresh counts (likes/views/comments) on every run for the latest ~50 posts.
7. Posts deleted on Instagram → mark `visible = false` (do not hard-delete).
8. New posts default to `visible = true`, with a suggested alt text generated from the caption (editor can fix).
9. Revalidate the `instagram` cache tag.

### 5.4 Showing reels on the site

The design shows reels as a grid of thumbnails with a play badge and view count. On click, either:
- **Option A (default, simplest):** open the reel on Instagram (`permalink`) in a new tab.
- **Option B:** play the re-hosted video in a lightbox on the site (keeps visitors on the site). Requires storing the video files (storage cost).
- **Option C:** Instagram oEmbed (`instagram_oembed`) requires Meta App Review for oEmbed Read. Avoid unless needed.

Ship A first; B is a toggle in settings.

### 5.5 Token maintenance

- Daily cron: if token expires in < 10 days, call `GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=…` and store the new token.
- If refresh fails → status `expired`, show a red banner in the admin dashboard and email the owner, keep showing the last synced posts on the site (never show an empty feed).

### 5.6 Manual fallback

"Add Instagram post" form (paste permalink, upload cover image, type, caption, counts). Used if the API is down or for posts from other accounts (collabs).

---

## 6. LinkedIn integration (automatic sync of personal posts — Phase 1)

Automatic sync of Ben's **personal** LinkedIn posts is **in Phase 1**. New posts Ben makes on LinkedIn must appear on `/linkedin` and the home page in the existing card design, with text, image, date and reaction/comment/repost counts, without manual work.

### 6.1 Constraints the agent must design around

- **Reading** a personal profile's posts and engagement needs the `r_member_social` permission. LinkedIn only grants it to apps approved for the **Community Management API**. Self-serve LinkedIn products only allow **signing in** (OpenID Connect) and **publishing** as the member (`w_member_social`, "Share on LinkedIn").
- **No scraping:** no headless-browser logins, no unofficial or reverse-engineered APIs, and no third-party services that scrape. These break LinkedIn's terms and put Ben's account at risk.
- Approval timing is controlled by LinkedIn. The build must therefore deliver automatic sync through the three parts below, all in Phase 1, so the feed is automatic at launch and becomes fully automatic (including counts) once read access is granted.

> Verify product names, permission scopes, endpoint paths and the required `LinkedIn-Version` header against LinkedIn's current developer documentation at implementation time. LinkedIn's APIs are versioned and change often.

### 6.2 Part A — Read sync via approved API access (primary path)

**Day 1 of the project (owner + agent):**
1. Create a LinkedIn developer app at developer.linkedin.com, linked to a LinkedIn Company Page Ben administers (LinkedIn requires a page to verify the app).
2. Add the self-serve products **Sign In with LinkedIn using OpenID Connect** and **Share on LinkedIn**. Both are used by Part B.
3. Apply for **Community Management API** access requesting `r_member_social`. The agent drafts the use-case text ("display the member's own posts on the member's own website; no data shared with third parties"), and Ben submits it from his account.
4. If Ben is a member in the EEA or Switzerland, also evaluate LinkedIn's **Member Data Portability API** (self-serve for those members), which lets a member's app read their own posts. Use it if eligible and if it covers posts and counts.

**When access is granted:**
- Owner clicks **Connect LinkedIn** in `/admin/linkedin`. Run OAuth and store the access token (about 60 days) and the refresh token (where issued), both encrypted, with their expiry.
- **Sync job** every 60 minutes (`/api/cron/linkedin-sync`):
  1. Fetch posts authored by `urn:li:person:{id}` from the Posts API, newest first, with pagination.
  2. For each post, read the commentary (text), media, created time and URN, and build the permalink `https://www.linkedin.com/feed/update/{urn}`.
  3. Fetch engagement (reactions, comments, reposts) from the social actions / social metadata endpoints. Set `counts_source = 'api'`.
  4. **Re-host images** in the site's media storage, because LinkedIn media URLs are signed and expire.
  5. Upsert by `urn`, never overwriting editor-owned fields (§3.5). Match existing `admin_publish` / `manual` posts by URN so they take over API counts.
  6. Skip reshares that have no own commentary by default (`is_repost`; setting to include them).
  7. If a post was deleted on LinkedIn, set `visible = false`. Do not hard-delete it.
  8. **Topic auto-suggestion:** classify new posts into the topic list (keyword rules or an AI classifier, agent's choice). Set `topic_suggested = true` so the editor can confirm the topic in one tap.
  9. Refresh counts for the latest ~50 posts on every run, then revalidate the `linkedin` cache tag.
- **Token maintenance:** a daily job refreshes the token before expiry. If refresh fails, show a red banner on the dashboard, email the owner and keep showing the last synced posts (never an empty feed).

### 6.3 Part B — Publish to LinkedIn from the admin (automatic from day one)

This needs only the self-serve products, so it works at launch:
- `/admin/linkedin` has a **composer**: text (LinkedIn length counter), optional image, topic.
- **Publish** posts to Ben's LinkedIn via the Posts API (`w_member_social`). LinkedIn returns the post URN. The post is saved with `source = 'admin_publish'` and appears on the site immediately.
- The journal editor gets a **"Share to LinkedIn"** action that drafts a LinkedIn-length version of a journal post in the composer.
- Until Part A is live, counts on these posts show the last values entered manually (`counts_source = 'manual'`), editable with a quick "Update counts" action.

### 6.4 Part C — Smart paste (fallback for posts written in the LinkedIn app before Part A is live)

- Ben pastes the post URL. The backend extracts the URN and fetches what it legitimately can (e.g. the official embed `https://www.linkedin.com/embed/feed/update/{urn}`).
- Ben pastes the text, optionally uploads the image and enters counts. Takes under a minute.
- Optional per-post toggle to show LinkedIn's official embed instead of the native card. The default is always the **native card from the current design**.

### 6.5 Status in the admin

The LinkedIn integration card shows each capability separately: **Sign-in: connected**, **Publishing: connected**, **Reading/sync: pending approval / connected / error**, plus the last sync time and token expiry. When read access becomes available, switching it on needs only the Connect button. No code change or redeploy is required.

---

## 7. Multilingual site (English, Spanish, Portuguese) — governed from the backend

### 7.1 Languages

- Phase 1 languages: **English (`en`, default)**, **Spanish (`es`)**, **Portuguese (`pt`)**. Use `pt-BR` vs `pt-PT` per Ben's audience; default to `pt-BR` unless the owner chooses otherwise in settings.
- Languages are **data, not code**. A `locales` record holds `code`, `name`, `native_name` ("Español", "Português"), `enabled`, `is_default`, `position`. Adding a fourth language later means adding a row and translations, with no code change.
- Only enabled languages appear in the switcher, the routing, the sitemap and `hreflang`.

### 7.2 URLs & routing

- Default language without a prefix: `/`, `/journal`, `/library/…`. Others are prefixed: `/es`, `/es/journal`, `/pt/library/…`.
- Slugs for journal posts and library items are **translatable** (`/es/journal/como-construir-agentes`). Old slugs redirect, as in §3.2.
- **No forced auto-redirect** based on browser language (it hurts SEO and annoys users). On a visitor's first visit, the `Accept-Language` header may preselect the switcher's suggestion. The visitor's explicit choice is remembered in a cookie.
- `<html lang>` is set per language. Every page outputs `hreflang` alternates (+ `x-default`) and per-language canonical URLs.

### 7.3 What is translatable

| Entity | Translatable fields | Not translated (shared) |
|---|---|---|
| `site_settings` | role/title, SEO title/description, OG image (optional per language) | name, email, social URLs/handles, photos |
| `nav_links` | label | href (prefixed automatically), order, visibility |
| `site_copy` | every value, including which words get the yellow highlight | key |
| Journal categories | name, slug, description | position |
| Journal posts | title, slug, excerpt, body, SEO fields, cover alt text | category, cover image, featured, dates |
| Library items | title, slug, kind label, summary, why, meta, inside, preview content, updated label | formats, position |
| Library assets | file per language (e.g. Spanish PDF), label | download URL pattern |
| Instagram posts | caption override, alt text | media, counts, dates, permalink |
| LinkedIn posts | text override, image alt | original text, counts, dates, permalink |
| Media | alt text, caption | file |

Storage approach (the agent chooses): per-entity translation tables (`entity_id`, `locale`, fields…, `status`, `source`), JSON per-locale fields, or the CMS's native localisation. Requirements:
- Each translation has its own **status** (`missing · machine_draft · needs_review · published`). A Spanish translation can stay in draft while the English version is live.
- Each translation records its `source` (`human` / `machine`) and the source-text version it was translated from. When the English text changes, its translations are flagged **outdated**.

### 7.4 Fallback rules

- **UI copy, navigation, labels, alt text:** if a translation is missing or unpublished, show the default-language value. Never show an empty string or a raw key.
- **Journal posts & library items:** each language has a setting `show_untranslated_in_default_language` (default **on**). When it is on, untranslated items appear in that language's listings in English and the page sets `lang="en"` on the article. When it is off, they are hidden from that language's listings.
- **Social posts:** show the original text (Ben posts in whatever language he chooses). The translated caption/text override is used only when it is published.

### 7.5 Language switcher (the only allowed UI addition)

- A compact text switcher (`EN · ES · PT`) in the header nav and the footer. It uses the **existing nav-link typography, colours and hover state**, with no new styles, flags or dropdown components unless the owner approves.
- Switching keeps the visitor on the equivalent page (the translated slug), or on that language's section index if no translation exists.
- On mobile it sits in the existing mobile menu.

### 7.6 Admin experience

- Language tabs on every editor (§4) with status badges. Actions: **Copy from English**, **Machine-translate draft**, **Mark reviewed**, **Publish this language**.
- A **translation-coverage matrix** (Languages screen): rows = content items, columns = languages, cells = status; filters for "missing", "outdated" and "needs review".
- The live preview renders the selected language using the real public components.
- The dashboard shows "N items missing Spanish / Portuguese".

### 7.7 Machine translation (optional assist, agent picks provider)

- Optional "machine-translate draft" uses a translation API or an LLM of the agent's choice, with a glossary that keeps the brand words fixed: **Ben Thomas**, **benthomas.life**, product/tool names and the "Field Manual"-style section labels where the owner wants them unchanged.
- Machine output is **always saved as `machine_draft`** and never auto-published. A human marks it reviewed.
- Keep rich-text structure (headings, lists, highlights) intact through translation.

### 7.8 Formatting & layout per language

- Dates and numbers are formatted with `Intl` for the active language: `Nov 3, 2026` → `3 nov 2026` (es) / `3 de nov. de 2026` (pt); `412K` → `412 mil`. Store raw values only (§3).
- Read time labels and all fixed UI words (`min`, "Read", "Download", etc.) come from `site_copy`.
- Spanish and Portuguese text runs about 20–30% longer. The design must hold without layout changes: copy fields have **character limits** shown in the admin, and acceptance screenshots are taken in all three languages (§13).
- The existing fonts must render all Spanish/Portuguese characters (á é í ó ú ñ ç ã õ ¿ ¡). Load the `latin-ext` subset if needed.

### 7.9 SEO per language

- `generateMetadata` uses the active language's SEO fields.
- `sitemap.xml` lists every published URL per language with `hreflang` alternates.
- RSS per language: `/journal/rss.xml`, `/es/journal/rss.xml`, `/pt/journal/rss.xml`.
- JSON-LD `inLanguage` is set on `BlogPosting`.

---

## 8. Caching & publishing

- Public data functions use `"use cache"` with tags: `profile`, `copy`, `nav`, `journal`, `journal:{slug}`, `library`, `library:{slug}`, `instagram`, `linkedin`.
- Every admin mutation calls `updateTag(...)` (Server Action, read-your-writes) for the affected tags.
- Sync jobs call `revalidateTag(tag, 'max')`.
- `generateStaticParams` for journal and library slugs; new slugs render on demand.
- Unpublished content is never returned by public data functions (filter `status = 'published' AND published_at <= now()`).

---

## 9. SEO & sharing

- Per-page `generateMetadata` from the database (title, description, OG image).
- Auto OG images for journal posts (title + category in the site's design) via `next/og`.
- `sitemap.xml` and `robots.txt` generated from published content.
- `/journal/rss.xml` RSS feed.
- JSON-LD: `Person` (Ben Thomas, sameAs Instagram/LinkedIn) on home, `BlogPosting` on journal posts.
- Canonical URLs on `benthomas.life`.

---

## 10. API surface (internal)

Use Server Actions (or the chosen backend's equivalent) for admin mutations. Route handlers only where needed. Paths are indicative; the agent may adapt them to the chosen stack:

| Route | Purpose |
|---|---|
| `POST /api/upload` | Signed uploads to media storage (admin only) |
| `GET /api/integrations/instagram/connect` · `/callback` | Instagram OAuth |
| `GET /api/integrations/linkedin/connect` · `/callback` | LinkedIn OAuth (sign-in + publish, and read once approved) |
| `POST /api/integrations/linkedin/publish` | Publish a post from the admin composer (admin only) |
| `GET /api/cron/instagram-sync` | Cron sync (requires `CRON_SECRET`) |
| `GET /api/cron/instagram-token-refresh` | Daily token refresh |
| `GET /api/cron/linkedin-sync` | Cron sync of personal posts + counts (requires `CRON_SECRET`) |
| `GET /api/cron/linkedin-token-refresh` | Daily token refresh |
| `GET /api/cron/publish-scheduled` | Publishes scheduled journal posts and translations (every 5 min) |
| `POST /api/translate` | Machine-translate draft for a content item (admin only, optional §7.7) |
| `GET /api/library/[slug]/download` | Counts and redirects to the file in the requested language |
| `GET /journal/rss.xml`, `/{locale}/journal/rss.xml` | RSS per language |

Scheduled jobs (any scheduler that can call these routes):

| Route | Schedule |
|---|---|
| `/api/cron/publish-scheduled` | Every 5 minutes (`*/5 * * * *`) |
| `/api/cron/instagram-sync` | Every 30 minutes (`*/30 * * * *`) |
| `/api/cron/linkedin-sync` | Every 60 minutes (`0 * * * *`) |
| `/api/cron/instagram-token-refresh` | Daily (`0 3 * * *`) |
| `/api/cron/linkedin-token-refresh` | Daily (`15 3 * * *`) |

---

## 11. Environment variables

| Variable | Source |
|---|---|
Names are indicative; the exact set depends on the stack the agent chooses.

| Variable | Source |
|---|---|
| Database connection | Depends on the database chosen |
| Media storage credentials | Depend on the storage provider chosen |
| Auth secret + site URL | Random secret for signing sessions / site URL |
| `INSTAGRAM_APP_ID`, `INSTAGRAM_APP_SECRET`, `INSTAGRAM_REDIRECT_URI` | Meta developer app |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, `LINKEDIN_REDIRECT_URI` | LinkedIn developer app (required in Phase 1) |
| `LINKEDIN_API_VERSION` | e.g. `202611`, sent as the `LinkedIn-Version` header |
| Machine-translation credentials | Only if §7.7 is enabled; provider of the agent's choice |
| `TOKEN_ENCRYPTION_KEY` | 32-byte random key |
| `CRON_SECRET` | Random string, checked by cron routes |

---

## 12. Migration & seeding

1. Create schema + migrations.
2. Seed script `scripts/seed.ts` that imports **everything from the current `lib/content.ts`** and all hard-coded strings and images, uploads `public/images/*` to media storage, and inserts them. After seeding, the site must look identical with database data.
3. Seed the `locales` records (`en` default, `es`, `pt`), all enabled. Seeded content is saved as English. Spanish and Portuguese start as `missing` (or `machine_draft` if §7.7 is enabled and the owner approves a bulk run).
4. Seed the owner account (email from env), and force a password change on first login.
5. Once verified, `lib/content.ts` keeps only the **types** (the contract); static arrays are deleted.
6. The current placeholder images are AI-generated stand-ins. Ben replaces them with real photos via the Media library.

---

## 13. Acceptance criteria

- [ ] Every public page (`/`, `/journal`, `/journal/[slug]`, `/library`, `/library/[slug]`, `/instagram`, `/linkedin`) matches the current design pixel-for-pixel at 375px, 768px and 1440px (screenshot diff).
- [ ] No visible text, number, date, category, link or image is hard-coded; everything is editable in `/admin`.
- [ ] Ben can write, preview, schedule and publish a journal post from his phone in under 3 minutes.
- [ ] Changes in admin appear on the live site within ~10 seconds.
- [ ] Instagram connects via OAuth; new reels/photos/carousels appear automatically within 30 minutes with view/like counts; no expired Instagram image URLs anywhere on the site.
- [ ] Instagram token refreshes automatically; expiry is surfaced in the dashboard well before it happens.
- [ ] LinkedIn: a post published from the admin composer appears on LinkedIn **and** on the site immediately, in the existing card design.
- [ ] LinkedIn: read sync is implemented end-to-end and switches on with the Connect button as soon as `r_member_social` (or Member Data Portability) access is granted. New personal posts then appear within 60 minutes with counts, and no expired LinkedIn image URLs appear anywhere.
- [ ] LinkedIn: until read access is granted, smart paste adds a post in under a minute. The admin clearly shows the pending-approval status.
- [ ] No scraping or unofficial LinkedIn/Instagram access anywhere in the codebase.
- [ ] The site works in English, Spanish and Portuguese (`/`, `/es`, `/pt`). Every page matches the design in all three languages at 375px, 768px and 1440px, with differences only in text.
- [ ] Languages can be enabled/disabled and the default changed from the admin with no code change. A disabled language disappears from the switcher, the routes and the sitemap.
- [ ] Every translatable field has per-language status. Missing translations fall back per §7.4, with no empty strings or raw keys.
- [ ] Machine translations are never published without human review.
- [ ] `hreflang`, per-language canonical URLs, `<html lang>`, per-language sitemap entries and RSS feeds are correct.
- [ ] `docs/ARCHITECTURE.md` documents the chosen stack and why.
- [ ] Library files can be replaced without changing their public link; download counts are tracked.
- [ ] Public sign-up is impossible; `/admin` is inaccessible without login; editors cannot access integrations or users.
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO 100 on public pages.
- [ ] Sitemap, RSS and OG images work.

---

## 14. Out of scope for Phase 1 (possible later)

- Newsletter / email capture (the site deliberately has none today).
- Contact form (not wanted; email link only).
- Comments on journal posts.
- Languages beyond English, Spanish and Portuguese (the system supports them via §7.1, but no content is planned).
- AI writing assistant inside the editor (e.g. turn a voice note into a journal draft), a strong Phase 2 candidate. Machine translation (§7.7) and the "Share to LinkedIn" draft (§6.3) are the only AI-assisted features in Phase 1.
