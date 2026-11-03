# benthomas.life — Backend & Admin Panel Specification

**Owner:** Ben Thomas (Benison Thomas)
**Audience:** The AI coding agent / developer who will turn the current design into a full product
**Status:** v1 — ready for implementation

---

## 0. The one rule: do not change the design

The front end in this repository is the **approved design**. It must be reproduced pixel-for-pixel.

- Do **not** change any markup, Tailwind classes, spacing, colours, fonts, the graph-paper background, highlighter marks, layout, copy hierarchy or animations in `app/` (public routes) or `components/`.
- Do **not** rename, restyle or "improve" components. No new sections on the public site unless the owner asks.
- The **only** change allowed in public components is **where the data comes from**: replace static imports from `lib/content.ts` with server-side data functions that return **exactly the same TypeScript types** (see §4).
- Every string, image, date, number, category and link currently visible on the site must become editable from the admin panel. Nothing visible may remain hard-coded.
- Before/after screenshots of every public page must match (see §13 acceptance criteria).

> Recommended technique: keep the existing types in `lib/content.ts` as the **contract**. Build `lib/data/*.ts` functions (`getJournalPosts()`, `getPost(slug)`, `getLibrary()`, `getInstagramPosts()`, `getLinkedInPosts()`, `getProfile()`, `getSiteCopy()`…) that read from the database and map rows → those exact types. Then swap imports in components. If a component renders correctly with the static data, it will render identically with database data.

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
| LinkedIn | `/`, `/linkedin` | `linkedinPosts` | **Manual / semi-automatic** (see §7 for why) |
| Images | Everywhere | `public/images/*.png` | Media library (upload, replace, alt text) |

Hard-coded image references that must become media fields:
`components/site/hero.tsx`, `components/site/founders.tsx`, `components/library/resource-preview.tsx`, `components/social/linkedin-post-card.tsx`, `app/instagram/page.tsx`, `app/journal/[slug]/page.tsx` (author avatar).

---

## 2. Recommended stack

Keep everything on Vercel so the owner has one place to manage it.

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 App Router (already in repo) | Admin lives at `/admin` in the same app |
| Database | **Neon Postgres** | Via Vercel Marketplace integration |
| ORM | Drizzle ORM | Schema in `lib/db/schema.ts`, migrations committed |
| Auth | **Better Auth**, email + password | Admin-only. **Public sign-up disabled.** Seed one owner account; owner can invite editors |
| Media storage | **Vercel Blob** | All uploads + re-hosted Instagram/LinkedIn media |
| Scheduled jobs | **Vercel Cron** | Instagram sync, token refresh, scheduled publishing |
| Rich text editor | Tiptap (or similar) | Stored as JSON, rendered with the existing article styles |
| Caching | Next.js `"use cache"` + `cacheTag`, `revalidateTag(tag, 'max')` / `updateTag` on publish | Public pages stay static and fast; edits appear within seconds |
| Image delivery | `next/image` with Blob domains whitelisted in `next.config` | |
| Email (optional, later) | Resend | Only if newsletter is added later; **no contact form** on the site |

---

## 3. Roles & security

- **Roles:** `owner` (everything, including settings and integrations), `editor` (content only, cannot touch integrations, users or settings).
- `/admin/**` protected in `proxy.ts` **and** re-checked in every server action / route handler (never trust the proxy alone).
- No public registration endpoint. Invitations generate a one-time link.
- Rate-limit login; lock after repeated failures.
- All mutations via Server Actions with Zod validation.
- Integration tokens (Instagram, LinkedIn) stored **encrypted** in the database (AES-GCM with a key in an env var), never sent to the browser.
- Audit log table: who changed what and when.
- Security headers in `next.config` (`X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security`, `X-Frame-Options: SAMEORIGIN` on `/admin` only).

---

## 4. Data model

All tables have `id` (uuid), `created_at`, `updated_at`. Content tables also have `status` (`draft | scheduled | published | archived`), `published_at`, `created_by`, `updated_by`.

Store **raw values** in the database and **format at render time** so the UI shows exactly what it shows today:
- Numbers like `412K`, `1.2M`, `8,412` → store integers, format with a shared `formatCompact()` / `formatThousands()` helper.
- Dates like `Nov 3, 2026`, `Nov 3`, `2d`, `1w` → store `timestamptz`, format with the same patterns per component.
- Read time `6 min` → auto-calculated from body word count (≈ 225 wpm), overridable.

### 4.1 Site & profile (singletons)

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

### 4.2 Journal (daily blog)

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

### 4.3 Library (free resources)

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
  media_id        fk media nullable   -- PDFs uploaded to Blob
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

### 4.4 Instagram

```
instagram_posts
  ig_media_id       text unique      -- id from Instagram API (null for manual posts)
  type              enum('reel','photo','carousel')
  permalink         text
  caption           text
  caption_override  text nullable    -- editor can shorten/clean caption shown on site
  thumbnail_media_id fk media        -- re-hosted cover image (Blob)
  video_media_id    fk media nullable -- re-hosted reel video (optional, see §6.4)
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

### 4.5 LinkedIn

```
linkedin_posts
  urn               text unique nullable  -- urn:li:share:… / urn:li:activity:…
  permalink         text
  topic             enum('AI','Entrepreneurship','Geopolitics','Leadership')  -- manageable list preferred
  text              text                  -- line breaks preserved (\n)
  image_media_id    fk media nullable
  image_alt         text nullable
  posted_at         timestamptz
  reaction_count    int
  comment_count     int
  repost_count      int
  visible, pinned
  source            enum('manual','embed','api')
```

### 4.6 Media library

```
media
  blob_url, pathname, content_type, size_bytes
  width, height, blurhash/lqip (for nice loading)
  alt_text text (required for images)
  caption text
  source enum('upload','instagram','linkedin')
  used_in jsonb  -- back-references so the editor sees where an image is used
```

Rules: images converted to WebP/AVIF on upload, max 10 MB images, 200 MB video, 50 MB PDFs. Deleting media that is in use is blocked.

### 4.7 Integrations & jobs

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

## 5. Admin panel (`/admin`)

Uses its own simple admin layout (it does **not** need the public graph-paper design; shadcn/ui components are fine). Must be usable on a phone, because Ben will often publish on the move.

| Screen | What it does |
|---|---|
| **Dashboard** | Today's post status ("Nothing published today" reminder), drafts, scheduled posts, integration health (token expiry warnings), last sync, top library downloads |
| **Journal → Posts** | List with filters (status, category, date), search. Create/edit with rich-text editor, live preview **using the real public components**, schedule date/time, duplicate, archive |
| **Journal → Categories** | Add / rename / reorder / delete (blocked if posts use it, or reassign) |
| **Library** | List + drag-to-reorder. Edit form with preview-type editor, file uploads per format, external links, "What's inside" list |
| **Instagram** | Connect / reconnect account, "Sync now" button, grid of synced posts with toggles: visible, pinned, caption override, alt text. Manual "add post by URL" fallback |
| **LinkedIn** | Add post (paste URL → fills URN + embed; paste text, upload image, enter counts), edit counts, visible/pinned. Optional API connect (see §7) |
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

---

## 6. Instagram integration (automatic)

### 6.1 Which API

Use the **Instagram API with Instagram Login** (Meta). The old *Instagram Basic Display API* was shut down in December 2024 and must not be used.

Requirements on Ben's side:
1. Instagram account switched to **Professional** (Creator or Business). Free, done in the Instagram app.
2. A **Meta developer app** (developers.facebook.com) with the *Instagram* product added, using "Instagram API with Instagram Login".
3. Scopes: `instagram_business_basic` (read profile + media). Add `instagram_business_manage_insights` to read reel view counts.
4. Since only Ben's own account is read, the app can run in **development/standard access** with Ben added as an Instagram tester. App Review is only needed if other accounts must connect.

> Verify scope names and metrics against Meta's current docs at implementation time; Meta renames metrics frequently (e.g. `plays`/`impressions` were replaced by `views` in 2025).

### 6.2 Connect flow (admin)

1. Owner clicks **Connect Instagram** in `/admin/instagram`.
2. OAuth redirect to Instagram → callback route `/api/integrations/instagram/callback`.
3. Exchange code → short-lived token → **long-lived token (60 days)**.
4. Store encrypted token + expiry in `integrations`.
5. Run first full sync immediately.

### 6.3 Sync job

Vercel Cron, every 30–60 minutes (`/api/cron/instagram-sync`, protected by `CRON_SECRET`):

1. `GET https://graph.instagram.com/me/media?fields=id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count,children{media_type,media_url,thumbnail_url}` with pagination.
2. Map type:
   - `media_product_type = REELS` → `reel`
   - `media_type = CAROUSEL_ALBUM` → `carousel`
   - `media_type = IMAGE` → `photo`
3. For reels, fetch insights (`/{media-id}/insights?metric=views`) for the view count.
4. **Re-host media in Vercel Blob.** Instagram `media_url` links are signed CDN URLs that **expire**; never hot-link them on the site. Download the thumbnail (and optionally the video) once, store in Blob, save `media_id`.
5. Upsert by `ig_media_id`. **Never overwrite** editor fields (`caption_override`, `alt_text`, `visible`, `pinned`, `position_override`).
6. Refresh counts (likes/views/comments) on every run for the latest ~50 posts.
7. Posts deleted on Instagram → mark `visible = false` (do not hard-delete).
8. New posts default to `visible = true`, with a suggested alt text generated from the caption (editor can fix).
9. Revalidate the `instagram` cache tag.

### 6.4 Showing reels on the site

The design shows reels as a grid of thumbnails with a play badge and view count. On click, either:
- **Option A (default, simplest):** open the reel on Instagram (`permalink`) in a new tab.
- **Option B:** play the re-hosted video in a lightbox on the site (keeps visitors on the site). Requires storing video in Blob (storage cost).
- **Option C:** Instagram oEmbed (`instagram_oembed`) requires Meta App Review for oEmbed Read. Avoid unless needed.

Ship A first; B is a toggle in settings.

### 6.5 Token maintenance

- Daily cron: if token expires in < 10 days, call `GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=…` and store the new token.
- If refresh fails → status `expired`, show a red banner in the admin dashboard and email the owner, keep showing the last synced posts on the site (never show an empty feed).

### 6.6 Manual fallback

"Add Instagram post" form (paste permalink, upload cover image, type, caption, counts). Used if the API is down or for posts from other accounts (collabs).

---

## 7. LinkedIn integration (manual first; API is restricted)

### 7.1 The reality

LinkedIn does **not** offer a self-serve API to read a **personal profile's** posts. The permission needed (`r_member_social`) is restricted to approved LinkedIn partners. Scraping LinkedIn violates its terms and can get the account restricted. **Do not scrape.**

### 7.2 What to build (in priority order)

**Level 1 — Manual entry with smart paste (build this):**
- In `/admin/linkedin`, Ben pastes the post URL.
- Backend parses the URL to extract the activity/share URN and builds the official embed URL `https://www.linkedin.com/embed/feed/update/{urn}`.
- Ben pastes the post text (line breaks preserved), optionally uploads the image, picks a topic, and types the reaction/comment/repost counts.
- Counts can be updated any time ("Update counts" quick edit on the list).
- Takes under a minute per post.

**Level 2 — Official embed (optional toggle):** for a post, show LinkedIn's official embed iframe on the `/linkedin` page instead of the native card. The default stays the **native card from the current design**, because it matches the site. The embed is only a fallback.

**Level 3 — API (only if Ben creates a LinkedIn Company Page):** the **Community Management API** can read posts of an organisation page Ben administers (`r_organization_social`), but it requires LinkedIn app approval. If approved, add a cron sync identical in shape to Instagram's (upsert by URN, re-host images, never overwrite editor fields).

**Level 4 — Personal posts via API:** only possible by applying to LinkedIn's partner programme. Out of scope for v1.

### 7.3 Cross-posting helper (nice to have)

When a journal post is published, the admin offers "Copy as LinkedIn post", which prepares a LinkedIn-length version of the text to paste, and later "Add to LinkedIn feed" once it is posted.

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

Server Actions for all admin mutations. Route handlers only where needed:

| Route | Purpose |
|---|---|
| `POST /api/upload` | Signed client uploads to Vercel Blob (admin only) |
| `GET /api/integrations/instagram/connect` · `/callback` | Instagram OAuth |
| `GET /api/cron/instagram-sync` | Cron sync (requires `CRON_SECRET`) |
| `GET /api/cron/instagram-token-refresh` | Daily token refresh |
| `GET /api/cron/publish-scheduled` | Publishes scheduled journal posts (every 5 min) |
| `GET /api/library/[slug]/download` | Counts and redirects to the file |
| `GET /journal/rss.xml` | RSS |

`vercel.json` crons:
```json
{
  "crons": [
    { "path": "/api/cron/publish-scheduled", "schedule": "*/5 * * * *" },
    { "path": "/api/cron/instagram-sync", "schedule": "*/30 * * * *" },
    { "path": "/api/cron/instagram-token-refresh", "schedule": "0 3 * * *" }
  ]
}
```

---

## 11. Environment variables

| Variable | Source |
|---|---|
| `DATABASE_URL` | Neon integration (auto) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob (auto) |
| `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` | Generate / project URL |
| `INSTAGRAM_APP_ID`, `INSTAGRAM_APP_SECRET`, `INSTAGRAM_REDIRECT_URI` | Meta developer app |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET` | Only if Level 3 is approved |
| `TOKEN_ENCRYPTION_KEY` | 32-byte random key |
| `CRON_SECRET` | Random string, checked by cron routes |

---

## 12. Migration & seeding

1. Create schema + migrations.
2. Seed script `scripts/seed.ts` that imports **everything from the current `lib/content.ts`** and all hard-coded strings and images, uploads `public/images/*` to Blob, and inserts them. After seeding, the site must look identical with database data.
3. Seed the owner account (email from env), and force a password change on first login.
4. Once verified, `lib/content.ts` keeps only the **types** (the contract); static arrays are deleted.
5. The current placeholder images are AI-generated stand-ins. Ben replaces them with real photos via the Media library.

---

## 13. Acceptance criteria

- [ ] Every public page (`/`, `/journal`, `/journal/[slug]`, `/library`, `/library/[slug]`, `/instagram`, `/linkedin`) matches the current design pixel-for-pixel at 375px, 768px and 1440px (screenshot diff).
- [ ] No visible text, number, date, category, link or image is hard-coded; everything is editable in `/admin`.
- [ ] Ben can write, preview, schedule and publish a journal post from his phone in under 3 minutes.
- [ ] Changes in admin appear on the live site within ~10 seconds.
- [ ] Instagram connects via OAuth; new reels/photos/carousels appear automatically within 30 minutes with view/like counts; no expired Instagram image URLs anywhere on the site.
- [ ] Instagram token refreshes automatically; expiry is surfaced in the dashboard well before it happens.
- [ ] LinkedIn posts can be added by pasting a URL + text in under a minute, and render with the existing card design.
- [ ] Library files can be replaced without changing their public link; download counts are tracked.
- [ ] Public sign-up is impossible; `/admin` is inaccessible without login; editors cannot access integrations or users.
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO 100 on public pages.
- [ ] Sitemap, RSS and OG images work.

---

## 14. Out of scope for v1 (possible later)

- Newsletter / email capture (the site deliberately has none today).
- Contact form (not wanted; email link only).
- Comments on journal posts.
- Multi-language.
- Automatic LinkedIn sync of personal posts (needs LinkedIn partner approval).
- AI writing assistant inside the editor (e.g. turn a voice note into a journal draft, or a journal post into a LinkedIn post) — a strong v2 candidate.
