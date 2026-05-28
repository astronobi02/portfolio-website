// ── PERSONAL INFO ────────────────────────────────────────────────────────────
export const personalInfo = {
  name: 'Alex Chen',
  roles: [
    'Full Stack Developer',
    'UI/UX Designer',
    'Open Source Contributor',
    'React Enthusiast',
    'Problem Solver',
  ],
  bio: `I'm a full-stack developer with 5+ years of experience building scalable web applications
        and beautiful user interfaces. I thrive at the intersection of engineering and design,
        turning complex problems into elegant solutions.`,
  bioExtended: `When I'm not coding, you'll find me contributing to open source projects, writing
        technical articles, or exploring the latest in AI/ML. I believe great software is built
        with empathy for the user and attention to detail.`,
  location: 'San Francisco, CA',
  email: 'hello@alexchen.dev',
  resumeUrl: '/resume.pdf',
  github: 'https://github.com/alexchendev',
  linkedin: 'https://linkedin.com/in/alexchendev',
  twitter: 'https://twitter.com/alexchendev',
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME || 'alexchendev',
}

// ── SKILLS ───────────────────────────────────────────────────────────────────
export const skillCategories = [
  {
    label: 'Frontend',
    color: '#00d4ff',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'GraphQL'],
  },
  {
    label: 'Backend',
    color: '#7c3aed',
    skills: ['Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    label: 'DevOps',
    color: '#ec4899',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Vercel', 'CI/CD', 'Nginx', 'Linux'],
  },
  {
    label: 'Design',
    color: '#10b981',
    skills: ['Figma', 'Adobe XD', 'UI/UX', 'Design Systems', 'Prototyping', 'Accessibility'],
  },
]

export const techStack = [
  { name: 'React', icon: 'SiReact', color: '#61dafb' },
  { name: 'TypeScript', icon: 'SiTypescript', color: '#3178c6' },
  { name: 'Next.js', icon: 'SiNextdotjs', color: '#ffffff' },
  { name: 'Node.js', icon: 'SiNodedotjs', color: '#339933' },
  { name: 'Python', icon: 'SiPython', color: '#3776ab' },
  { name: 'PostgreSQL', icon: 'SiPostgresql', color: '#4169e1' },
  { name: 'Docker', icon: 'SiDocker', color: '#2496ed' },
  { name: 'AWS', icon: 'SiAmazon', color: '#ff9900' },
  { name: 'Figma', icon: 'SiFigma', color: '#f24e1e' },
  { name: 'GraphQL', icon: 'SiGraphql', color: '#e10098' },
]

// ── PROJECTS ─────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: 'NebulaDB',
    description: 'A high-performance distributed database with real-time sync, built with Rust and WebAssembly. Handles 100k+ concurrent connections.',
    longDesc: 'Real-time distributed database with CRDT-based conflict resolution, WebSocket subscriptions, and a React dashboard for monitoring.',
    tags: ['Rust', 'WebAssembly', 'React', 'WebSockets'],
    category: ['Rust', 'React'],
    liveUrl: 'https://nebuladb.io',
    repoUrl: 'https://github.com/alexchendev/nebuladb',
    stars: 2400,
    forks: 187,
    gradient: 'from-cyan-500 to-blue-600',
    featured: true,
  },
  {
    id: 2,
    title: 'Luminary UI',
    description: 'An open-source React component library with 80+ accessible, animated components. Used by 500+ projects.',
    longDesc: 'Component library built on Radix UI primitives with Framer Motion animations and a comprehensive Storybook documentation site.',
    tags: ['React', 'TypeScript', 'Storybook', 'Framer Motion'],
    category: ['React', 'TypeScript'],
    liveUrl: 'https://luminary-ui.dev',
    repoUrl: 'https://github.com/alexchendev/luminary-ui',
    stars: 1850,
    forks: 142,
    gradient: 'from-purple-500 to-pink-600',
    featured: true,
  },
  {
    id: 3,
    title: 'FlowAI',
    description: 'AI-powered workflow automation platform. Build complex automations with a visual drag-and-drop editor.',
    longDesc: 'No-code automation platform with 200+ integrations, custom AI agents, and a visual flow builder powered by React Flow.',
    tags: ['Next.js', 'Python', 'OpenAI', 'PostgreSQL'],
    category: ['Next.js', 'Python'],
    liveUrl: 'https://flowai.app',
    repoUrl: 'https://github.com/alexchendev/flowai',
    stars: 3100,
    forks: 290,
    gradient: 'from-emerald-500 to-teal-600',
    featured: true,
  },
  {
    id: 4,
    title: 'Cryptodash',
    description: 'Real-time crypto analytics dashboard with portfolio tracking, price alerts, and DeFi protocol integration.',
    tags: ['React', 'Node.js', 'WebSockets', 'MongoDB'],
    category: ['React', 'Node.js'],
    liveUrl: 'https://cryptodash.app',
    repoUrl: 'https://github.com/alexchendev/cryptodash',
    stars: 760,
    forks: 88,
    gradient: 'from-orange-500 to-yellow-500',
    featured: false,
  },
  {
    id: 5,
    title: 'DevSpace CLI',
    description: 'A powerful CLI tool for scaffolding modern web projects with pre-configured templates and best practices.',
    tags: ['TypeScript', 'Node.js', 'CLI'],
    category: ['TypeScript', 'Node.js'],
    liveUrl: 'https://npmjs.com/package/devspace-cli',
    repoUrl: 'https://github.com/alexchendev/devspace-cli',
    stars: 1230,
    forks: 95,
    gradient: 'from-blue-500 to-indigo-600',
    featured: false,
  },
  {
    id: 6,
    title: 'Palette AI',
    description: 'Generate beautiful color palettes using AI. Extract palettes from images, get accessibility scores, and export to Figma.',
    tags: ['Next.js', 'Python', 'OpenAI', 'Figma API'],
    category: ['Next.js', 'Python'],
    liveUrl: 'https://palette-ai.design',
    repoUrl: 'https://github.com/alexchendev/palette-ai',
    stars: 920,
    forks: 74,
    gradient: 'from-pink-500 to-rose-600',
    featured: false,
  },
]

export const projectFilters = ['All', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Rust']

// ── EXPERIENCE ───────────────────────────────────────────────────────────────
export const experiences = [
  {
    id: 1,
    type: 'work',
    title: 'Senior Full Stack Engineer',
    company: 'Vercel',
    location: 'San Francisco, CA (Hybrid)',
    period: '2022 — Present',
    description: 'Leading the development of new infrastructure features for the Vercel platform, serving 500k+ developers globally.',
    bullets: [
      'Architected and shipped the new Edge Config product used by 50k+ projects',
      'Reduced cold start times by 40% through runtime optimization',
      'Mentored 4 junior engineers and led weekly architecture reviews',
    ],
    color: '#00d4ff',
    logo: '▲',
  },
  {
    id: 2,
    type: 'work',
    title: 'Full Stack Developer',
    company: 'Linear',
    location: 'Remote',
    period: '2020 — 2022',
    description: 'Built and maintained core features of the Linear issue tracking platform, focusing on performance and real-time collaboration.',
    bullets: [
      'Implemented real-time collaboration features using CRDTs and WebSockets',
      'Built the keyboard shortcut system used across the entire product',
      'Improved app bundle size by 35% through code splitting and lazy loading',
    ],
    color: '#7c3aed',
    logo: '◆',
  },
  {
    id: 3,
    type: 'work',
    title: 'Frontend Engineer',
    company: 'Stripe',
    location: 'San Francisco, CA',
    period: '2019 — 2020',
    description: 'Developed components and features for the Stripe Dashboard, used by millions of businesses worldwide.',
    bullets: [
      'Built the new revenue analytics dashboard with D3.js visualizations',
      'Contributed to the internal design system used across all Stripe products',
    ],
    color: '#ec4899',
    logo: '◈',
  },
]

export const education = [
  {
    id: 4,
    type: 'education',
    title: 'B.S. Computer Science',
    company: 'UC Berkeley',
    location: 'Berkeley, CA',
    period: '2015 — 2019',
    description: 'Focus on Human-Computer Interaction and Distributed Systems. GPA: 3.9/4.0',
    bullets: [
      'Teaching Assistant for CS61A (Structure and Interpretation of Computer Programs)',
      'Led the Berkeley Web Development Club with 200+ members',
    ],
    color: '#10b981',
    logo: '◉',
  },
]
