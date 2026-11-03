export const profile = {
  name: 'Ben Thomas',
  fullName: 'Benison Thomas',
  role: 'CEO · AI Entrepreneur',
  domain: 'benthomas.life',
  email: 'hello@benthomas.life',
  instagram: 'https://instagram.com/benthomas.life',
  instagramHandle: '@benthomas.life',
  linkedin: 'https://linkedin.com/in/benisonthomas',
  linkedinHandle: 'in/benisonthomas',
}

export const navLinks = [
  { label: 'Journal', href: '/journal' },
  { label: 'Instagram', href: '/instagram' },
  { label: 'LinkedIn', href: '/linkedin' },
  { label: 'Library', href: '/library' },
  { label: 'Founders', href: '/#founders' },
]

/* ---------- Journal ---------- */

export type JournalCategory = 'AI' | 'Entrepreneurship' | 'Geopolitics' | 'Field Notes'

export const journalCategories: JournalCategory[] = [
  'AI',
  'Entrepreneurship',
  'Geopolitics',
  'Field Notes',
]

export type JournalPost = {
  slug: string
  title: string
  category: JournalCategory
  date: string
  readTime: string
  excerpt: string
  body: { heading?: string; text: string }[]
}

export const journalPosts: JournalPost[] = [
  {
    slug: 'agents-are-employees-not-features',
    title: 'Treat AI agents like new hires, not new features',
    category: 'AI',
    date: 'Nov 3, 2026',
    readTime: '6 min',
    excerpt:
      'The companies getting value from agents are onboarding them, giving them a manager, and reviewing their work. The rest are shipping demos.',
    body: [
      {
        text: 'Every week I sit with a founder who has bought an "AI solution" and is quietly disappointed. When I look closer, the pattern is almost always the same: the agent was installed like software, not onboarded like a person.',
      },
      {
        heading: 'Give it a job description',
        text: 'Before writing a single prompt, write the role. What decisions can it make alone? What must it escalate? Who does it report to? This one page does more for reliability than any model upgrade.',
      },
      {
        heading: 'Give it a manager',
        text: 'Someone on your team should own the agent the way they would own a junior hire. They review its work, correct it, and decide when it earns more responsibility.',
      },
      {
        heading: 'Review it weekly',
        text: 'Pull twenty real conversations every Friday. Read them. You will learn more about your customers, and about the agent, than from any dashboard.',
      },
    ],
  },
  {
    slug: 'tariffs-and-the-quiet-opportunity',
    title: 'When trade routes shift, small companies move first',
    category: 'Geopolitics',
    date: 'Nov 2, 2026',
    readTime: '8 min',
    excerpt:
      'Large companies need quarters to re-route supply chains. A focused founder can do it in weeks. Here is how I think about that window.',
    body: [
      {
        text: 'Every time a tariff, sanction or trade agreement changes, headlines focus on the giants. But the real opportunity sits with the companies small enough to change direction on a Tuesday.',
      },
      {
        heading: 'Read the second-order effect',
        text: 'The first-order effect is obvious and priced in. The second-order effect, who now needs a new supplier, a new market, a new partner, is where founders win.',
      },
      {
        heading: 'Speed is the moat',
        text: 'With AI handling research, translation and outreach, a two-person team can now explore a new market faster than a regional office used to.',
      },
    ],
  },
  {
    slug: 'the-year-i-lost-everything',
    title: 'What the year I lost everything actually taught me',
    category: 'Entrepreneurship',
    date: 'Oct 31, 2026',
    readTime: '9 min',
    excerpt:
      'Not the inspirational version. The real one: the phone calls, the pride, and the three decisions I would make differently.',
    body: [
      {
        text: 'People like the comeback part of the story. I want to talk about the part before it, because that is where most of the learning happened.',
      },
      {
        heading: 'Pride is expensive',
        text: 'I waited four months too long to ask for help. Those four months cost more than the entire first year of the business.',
      },
      {
        heading: 'Cash is a feeling',
        text: 'Revenue on a spreadsheet and cash in the bank are different emotions. Build for the second one.',
      },
    ],
  },
  {
    slug: 'five-things-i-tried-this-week',
    title: 'Five AI tools I tried this week, and the one I kept',
    category: 'Field Notes',
    date: 'Oct 30, 2026',
    readTime: '4 min',
    excerpt:
      'Short notes from my own desk. What worked, what was noise, and what is now part of my daily stack.',
    body: [
      {
        text: 'I test a lot of tools so you do not have to. Most of them are impressive for ten minutes. A few earn a permanent place.',
      },
      {
        heading: 'The keeper',
        text: 'A meeting agent that writes the follow-up email in my voice, not a summary. Small difference, huge time saved.',
      },
    ],
  },
  {
    slug: 'mentoring-is-a-two-way-trade',
    title: 'Why I take calls with first-time founders',
    category: 'Entrepreneurship',
    date: 'Oct 28, 2026',
    readTime: '5 min',
    excerpt:
      'People assume I do it to give back. Honestly, I learn more from these calls than almost anything else in my week.',
    body: [
      {
        text: 'New founders see problems without the scar tissue. That makes them ask better questions than people who have been around for twenty years.',
      },
    ],
  },
  {
    slug: 'rag-is-a-librarian-problem',
    title: 'Most RAG failures are a librarian problem, not a model problem',
    category: 'AI',
    date: 'Oct 26, 2026',
    readTime: '7 min',
    excerpt:
      'If your documents are a mess, your agent will be confidently wrong. Fix the shelves before you blame the model.',
    body: [
      {
        text: 'When an agent hallucinates on company knowledge, teams reach for a bigger model. Nine times out of ten the fix is organising the source documents.',
      },
    ],
  },
]

export function getPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug)
}

/* ---------- Library ---------- */

export type ResourceFormat = 'PDF' | 'Figma + PDF' | 'YouTube' | 'Notion'

export type LibraryItem = {
  slug: string
  title: string
  kind: 'Prompt System' | 'Field Guide' | 'Toolkit' | 'Canvas' | 'Session'
  formats: ResourceFormat[]
  summary: string
  why: string
  meta: string
  updated: string
  inside: string[]
  preview:
    | { type: 'prompts'; groups: { name: string; prompts: string[] }[] }
    | { type: 'chapters'; chapters: { title: string; detail: string }[] }
    | { type: 'tools'; groups: { name: string; tools: { name: string; note: string }[] }[] }
    | { type: 'video'; chapters: { time: string; title: string }[] }
}

export const library: LibraryItem[] = [
  {
    slug: '100-prompts',
    title: '100 Prompts I Actually Use',
    kind: 'Prompt System',
    formats: ['PDF', 'Notion'],
    summary:
      'The prompts I run every week for strategy, hiring, sales and investor updates. Grouped by situation, not by gimmick.',
    why: 'I kept rewriting the same prompts for founders on calls. Now they live in one place.',
    meta: '100 prompts · 6 sections',
    updated: 'Updated Nov 2026',
    inside: [
      'Strategy and decision prompts',
      'Hiring and people prompts',
      'Sales and outreach prompts',
      'Investor and board update prompts',
      'Operations and SOP prompts',
      'Personal clarity prompts',
    ],
    preview: {
      type: 'prompts',
      groups: [
        {
          name: 'Strategy',
          prompts: [
            'Act as a skeptical board member. Here is my plan: [plan]. List the three questions that would make me most uncomfortable, and why.',
            'Given these numbers [metrics], what is the single constraint limiting growth right now? Explain like I have five minutes.',
            'Rewrite this decision as two options with the real cost of each, including what I lose by not choosing the other.',
          ],
        },
        {
          name: 'Hiring',
          prompts: [
            'Turn this messy role description into a one-page scorecard with outcomes, not tasks: [notes].',
            'Write five interview questions that reveal how a candidate handles ambiguity, with what a great answer sounds like.',
          ],
        },
        {
          name: 'Investor updates',
          prompts: [
            'Draft a monthly investor update from these bullet points. Lead with the hardest news, keep it under 250 words: [bullets].',
          ],
        },
      ],
    },
  },
  {
    slug: 'agent-field-guide',
    title: 'The AI Agent Field Guide',
    kind: 'Field Guide',
    formats: ['PDF'],
    summary:
      'A plain-English guide to what agents are, where they earn their keep, and how to design one that your team will actually trust.',
    why: 'Written from real projects with companies, including the ones that did not work.',
    meta: '40 pages · 7 chapters',
    updated: 'Updated Oct 2026',
    inside: [
      'What an agent is (and is not)',
      'Choosing the first workflow',
      'Designing tools and guardrails',
      'Measuring if it works',
    ],
    preview: {
      type: 'chapters',
      chapters: [
        { title: 'Agents, without the hype', detail: 'A working definition you can explain to your board.' },
        { title: 'Pick the boring workflow first', detail: 'Why the least exciting process is usually the best start.' },
        { title: 'The job description', detail: 'Scope, permissions and escalation in one page.' },
        { title: 'Tools and memory', detail: 'What to connect, and what to leave out.' },
        { title: 'Guardrails', detail: 'How to stop an agent from being confidently wrong.' },
        { title: 'Measuring it', detail: 'The three numbers I track on every project.' },
        { title: 'Rolling it out', detail: 'Getting a sceptical team to actually use it.' },
      ],
    },
  },
  {
    slug: 'ai-stack-toolkit',
    title: 'My AI Stack',
    kind: 'Toolkit',
    formats: ['Notion'],
    summary:
      'Every model, framework and tool I use to build agents and run my day, with a one-line note on why it earned its place.',
    why: 'People ask what I use on almost every call. This is the honest answer, updated as it changes.',
    meta: '60+ tools · 5 groups',
    updated: 'Updated monthly',
    inside: ['Models', 'Agent frameworks', 'Data and retrieval', 'Daily productivity', 'What I stopped using'],
    preview: {
      type: 'tools',
      groups: [
        {
          name: 'Building agents',
          tools: [
            { name: 'AI SDK', note: 'My default for shipping agents into real products.' },
            { name: 'Vector database', note: 'Boring, reliable, does the job.' },
          ],
        },
        {
          name: 'Daily use',
          tools: [
            { name: 'Meeting agent', note: 'Writes follow-ups in my voice.' },
            { name: 'Research assistant', note: 'First pass on any new market or country.' },
          ],
        },
        {
          name: 'What I stopped using',
          tools: [{ name: 'All-in-one AI suites', note: 'Great demos, weak at any one thing.' }],
        },
      ],
    },
  },
  {
    slug: 'rag-done-right',
    title: 'RAG Done Right',
    kind: 'Field Guide',
    formats: ['PDF', 'YouTube'],
    summary:
      'How to connect an agent to company knowledge without hallucinations. Mostly about organising documents, a little about models.',
    why: 'This is the single most common thing that goes wrong in the projects I see.',
    meta: '22 pages · 24 min walkthrough',
    updated: 'Updated Sep 2026',
    inside: ['Cleaning the source', 'Chunking that makes sense', 'Testing answers', 'When not to use RAG'],
    preview: {
      type: 'chapters',
      chapters: [
        { title: 'It is a librarian problem', detail: 'Why messy documents create confident mistakes.' },
        { title: 'Chunking', detail: 'Split by meaning, not by character count.' },
        { title: 'Testing', detail: 'Build a 30-question exam before you ship.' },
        { title: 'When to skip RAG', detail: 'Sometimes a good prompt and a table is enough.' },
      ],
    },
  },
  {
    slug: 'use-case-canvas',
    title: 'Agent Use-Case Canvas',
    kind: 'Canvas',
    formats: ['Figma + PDF'],
    summary:
      'The one-page canvas I use with leadership teams to decide which workflow deserves an agent first.',
    why: 'It turns a vague "we should use AI" meeting into a decision in under an hour.',
    meta: '1 canvas · 6 blocks',
    updated: 'Updated Aug 2026',
    inside: ['Workflow map', 'Volume and pain score', 'Risk and escalation', 'Owner and success metric'],
    preview: {
      type: 'chapters',
      chapters: [
        { title: 'The workflow', detail: 'Write the steps exactly as they happen today.' },
        { title: 'Volume × pain', detail: 'Score how often and how much it hurts.' },
        { title: 'Risk', detail: 'What happens if the agent gets it wrong?' },
        { title: 'Owner', detail: 'One human name. Not a department.' },
        { title: 'Success metric', detail: 'The one number that proves it worked.' },
        { title: 'Go / not yet', detail: 'A clear decision before anyone writes code.' },
      ],
    },
  },
  {
    slug: 'support-agent-session',
    title: 'Building a Support Agent, Live',
    kind: 'Session',
    formats: ['YouTube'],
    summary:
      'An unedited session where I build a customer support agent from a blank file to something a team could use.',
    why: 'I wanted to show the messy middle, including the parts that broke.',
    meta: '32 min',
    updated: 'Recorded Oct 2026',
    inside: ['Scoping the job', 'Connecting knowledge', 'Adding escalation', 'Testing with real questions'],
    preview: {
      type: 'video',
      chapters: [
        { time: '00:00', title: 'What we are building and why' },
        { time: '04:12', title: 'Writing the job description' },
        { time: '09:40', title: 'Connecting the help centre' },
        { time: '17:05', title: 'It breaks. Here is why.' },
        { time: '23:30', title: 'Adding a human handoff' },
        { time: '28:15', title: 'Testing with real tickets' },
      ],
    },
  },
]

export function getLibraryItem(slug: string) {
  return library.find((item) => item.slug === slug)
}

/* ---------- Instagram ---------- */

export type InstagramPost = {
  id: string
  type: 'reel' | 'photo' | 'carousel'
  image: string
  alt: string
  caption: string
  date: string
  /** views for reels, likes for photos and carousels */
  stat: string
}

export const instagramPosts: InstagramPost[] = [
  {
    id: 'ig-1',
    type: 'reel',
    image: '/images/ben-desk.png',
    alt: 'Ben at his desk recording a reel',
    caption: 'The agent that replaced my Monday. Full breakdown of what it does and what it does not.',
    date: 'Nov 3',
    stat: '412K',
  },
  {
    id: 'ig-2',
    type: 'carousel',
    image: '/images/ig-whiteboard.png',
    alt: 'Ben sketching an AI workflow on a whiteboard',
    caption: 'How I map a workflow before building any agent. Swipe for the 6 boxes I always draw.',
    date: 'Nov 2',
    stat: '38.4K',
  },
  {
    id: 'ig-3',
    type: 'reel',
    image: '/images/ben-stage.png',
    alt: 'Ben speaking on stage to founders',
    caption: 'What I told a room of 300 founders about losing a company at 29.',
    date: 'Nov 1',
    stat: '1.2M',
  },
  {
    id: 'ig-4',
    type: 'photo',
    image: '/images/ig-airport.png',
    alt: 'Ben working from an airport lounge at dawn',
    caption: '5:40am, third country this month. The trade routes are shifting and so am I.',
    date: 'Oct 31',
    stat: '24.1K',
  },
  {
    id: 'ig-5',
    type: 'reel',
    image: '/images/ig-podcast.png',
    alt: 'Ben speaking into a podcast microphone',
    caption: 'Geopolitics for founders in 60 seconds: why tariffs are a small-company advantage.',
    date: 'Oct 30',
    stat: '688K',
  },
  {
    id: 'ig-6',
    type: 'reel',
    image: '/images/ben-workshop.png',
    alt: 'Ben running a workshop with a leadership team',
    caption: 'Scoping an AI project in 60 seconds. The one question that kills bad ideas early.',
    date: 'Oct 29',
    stat: '268K',
  },
  {
    id: 'ig-7',
    type: 'photo',
    image: '/images/ben-thomas.png',
    alt: 'Portrait of Ben Thomas',
    caption: 'Fourteen years, two companies lost, one lesson: ask for help earlier than your pride wants.',
    date: 'Oct 28',
    stat: '51.7K',
  },
  {
    id: 'ig-8',
    type: 'carousel',
    image: '/images/ig-podcast.png',
    alt: 'Ben in the studio between takes',
    caption: '10 prompts I use every week as a CEO. Save this one.',
    date: 'Oct 27',
    stat: '92.3K',
  },
  {
    id: 'ig-9',
    type: 'reel',
    image: '/images/ig-whiteboard.png',
    alt: 'Ben explaining RAG on a whiteboard',
    caption: 'Your RAG is not broken. Your documents are. Here is the fix.',
    date: 'Oct 26',
    stat: '354K',
  },
  {
    id: 'ig-10',
    type: 'photo',
    image: '/images/ben-stage.png',
    alt: 'Ben on stage at a founders summit',
    caption: 'Thank you Dubai. 40 founders stayed back for questions until the lights went off.',
    date: 'Oct 24',
    stat: '33.9K',
  },
  {
    id: 'ig-11',
    type: 'reel',
    image: '/images/ig-airport.png',
    alt: 'Ben recording a reel on the move',
    caption: 'The question I ask every founder before I agree to build anything.',
    date: 'Oct 22',
    stat: '890K',
  },
  {
    id: 'ig-12',
    type: 'carousel',
    image: '/images/ben-desk.png',
    alt: 'Ben at his desk with notes',
    caption: 'My full AI stack, October edition. What I added, what I dropped.',
    date: 'Oct 20',
    stat: '61.2K',
  },
]

/* ---------- LinkedIn ---------- */

export type LinkedInPost = {
  id: string
  date: string
  topic: 'AI' | 'Entrepreneurship' | 'Geopolitics' | 'Leadership'
  text: string
  image?: string
  imageAlt?: string
  reactions: string
  comments: string
  reposts: string
}

export const linkedinPosts: LinkedInPost[] = [
  {
    id: 'li-1',
    date: '2d',
    topic: 'Entrepreneurship',
    text: 'I lost a company at 29.\n\nThe lesson was not "never give up". It was "ask for help four months earlier than your pride wants to."\n\nThose four months cost more than the entire first year of the business.',
    reactions: '8,412',
    comments: '612',
    reposts: '1,104',
  },
  {
    id: 'li-2',
    date: '3d',
    topic: 'AI',
    text: 'Unpopular opinion: your first AI agent should do the most boring job in your company.\n\nBoring is measurable. Measurable gets funded. Funded gets a second agent.',
    image: '/images/ig-whiteboard.png',
    imageAlt: 'Ben mapping an agent workflow on a whiteboard',
    reactions: '5,930',
    comments: '388',
    reposts: '702',
  },
  {
    id: 'li-3',
    date: '5d',
    topic: 'Geopolitics',
    text: 'Every trade disruption creates a window.\n\nBig companies need a quarter to re-route supply chains. A focused founder with AI doing research, translation and outreach needs a week and a clear head.',
    reactions: '11,204',
    comments: '904',
    reposts: '2,318',
  },
  {
    id: 'li-4',
    date: '1w',
    topic: 'Leadership',
    text: 'Treat AI agents like new hires, not new features.\n\nGive them a job description. Give them a manager. Review their work every Friday. The companies doing this are getting real value. The rest are shipping demos.',
    image: '/images/ben-workshop.png',
    imageAlt: 'Ben running a workshop with a leadership team',
    reactions: '7,061',
    comments: '455',
    reposts: '980',
  },
  {
    id: 'li-5',
    date: '1w',
    topic: 'AI',
    text: 'Most RAG failures are a librarian problem, not a model problem.\n\nIf your documents are a mess, your agent will be confidently wrong. Fix the shelves before you blame the model.',
    reactions: '4,288',
    comments: '271',
    reposts: '515',
  },
  {
    id: 'li-6',
    date: '2w',
    topic: 'Entrepreneurship',
    text: 'People ask why I still take calls with first-time founders.\n\nHonestly, I learn more from those calls than almost anything else in my week. They see problems without the scar tissue.',
    image: '/images/ben-stage.png',
    imageAlt: 'Ben speaking to a room of founders',
    reactions: '9,840',
    comments: '733',
    reposts: '1,422',
  },
]
