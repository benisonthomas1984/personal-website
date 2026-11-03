export const profile = {
  name: 'Ben Thomas',
  fullName: 'Benison Thomas',
  email: 'hello@benthomas.ai',
  instagram: 'https://instagram.com/benthomas.ai',
  instagramHandle: '@benthomas.ai',
  linkedin: 'https://linkedin.com/in/benisonthomas',
  linkedinHandle: 'in/benisonthomas',
}

export const navLinks = [
  { label: 'Learn', href: '#learn' },
  { label: 'Library', href: '#library' },
  { label: 'Watch', href: '#watch' },
  { label: 'About', href: '#about' },
]

export const learningPaths = [
  {
    step: 'Stage 1',
    title: 'AI Foundations',
    audience: 'For curious beginners',
    description:
      'How large language models actually work, what they can and cannot do, and how to write prompts that get reliable results.',
    lessons: 8,
    topics: ['LLM basics', 'Prompting', 'Tokens & context', 'Choosing a model'],
  },
  {
    step: 'Stage 2',
    title: 'Build Your First Agent',
    audience: 'For builders & makers',
    description:
      'Go from chatbot to agent. Give a model tools, memory and a goal, then ship a working agent end to end.',
    lessons: 12,
    topics: ['Tool calling', 'Memory', 'RAG', 'Evaluation'],
  },
  {
    step: 'Stage 3',
    title: 'AI Agents in Business',
    audience: 'For founders & operators',
    description:
      'Find the workflows worth automating, measure ROI, and roll out agents your team actually trusts and uses.',
    lessons: 10,
    topics: ['Use-case mapping', 'ROI', 'Governance', 'Change management'],
  },
]

export type ResourceType = 'Guide' | 'Prompt Pack' | 'Template' | 'Video' | 'Toolkit'

export const resourceTypes: ResourceType[] = [
  'Guide',
  'Prompt Pack',
  'Template',
  'Video',
  'Toolkit',
]

export const resources: {
  title: string
  type: ResourceType
  description: string
  meta: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
}[] = [
  {
    title: 'The AI Agent Field Guide',
    type: 'Guide',
    description: 'A 40-page plain-English guide to what agents are and how to design one.',
    meta: '40 pages · PDF',
    level: 'Beginner',
  },
  {
    title: '100 Prompts for Founders',
    type: 'Prompt Pack',
    description: 'Copy-ready prompts for strategy, hiring, sales, and investor updates.',
    meta: '100 prompts · Notion',
    level: 'Beginner',
  },
  {
    title: 'Agent Use-Case Canvas',
    type: 'Template',
    description: 'Map any business workflow and score it for automation potential.',
    meta: '1 canvas · Figma + PDF',
    level: 'Intermediate',
  },
  {
    title: 'Build a Support Agent in 30 Minutes',
    type: 'Video',
    description: 'Watch me build a customer support agent live, from blank file to deploy.',
    meta: '32 min · YouTube',
    level: 'Intermediate',
  },
  {
    title: 'The AI Stack Toolkit',
    type: 'Toolkit',
    description: 'My curated list of models, frameworks and tools — what I use and why.',
    meta: '60+ tools · Updated monthly',
    level: 'Beginner',
  },
  {
    title: 'RAG Done Right',
    type: 'Guide',
    description: 'How to connect agents to your company knowledge without hallucinations.',
    meta: '22 pages · PDF',
    level: 'Advanced',
  },
  {
    title: 'Agent ROI Calculator',
    type: 'Template',
    description: 'A spreadsheet to estimate hours saved and payback before you build.',
    meta: 'Google Sheets',
    level: 'Intermediate',
  },
  {
    title: 'Sales Agent Prompt System',
    type: 'Prompt Pack',
    description: 'System prompts and guardrails for outbound and lead qualification agents.',
    meta: '24 prompts · Notion',
    level: 'Advanced',
  },
]

export const videos = [
  {
    title: 'What is an AI agent, really?',
    duration: '0:58',
    platform: 'Instagram Reel',
  },
  {
    title: 'Three workflows every company should automate first',
    duration: '1:24',
    platform: 'Instagram Reel',
  },
  {
    title: 'Agents vs. automations — the honest difference',
    duration: '12:40',
    platform: 'YouTube',
  },
  {
    title: 'How I scope an AI agent project for a client',
    duration: '18:05',
    platform: 'YouTube',
  },
]

export const credentials = [
  { label: 'Role', value: 'CEO & AI Entrepreneur' },
  { label: 'Focus', value: 'AI agents for companies' },
  { label: 'Teaching', value: 'Free, always' },
]
