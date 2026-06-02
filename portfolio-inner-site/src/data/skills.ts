// Strongly-typed skills/tech-stack data for the Skills.exe window.

export interface SkillCategory {
    category: string;
    items: string[];
}

const skills: SkillCategory[] = [
    {
        category: 'Mobile',
        items: ['React Native', 'Expo', 'React Navigation', 'Framer Motion'],
    },
    {
        category: 'Web',
        items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
    },
    {
        category: 'Backend',
        items: [
            'Node.js',
            'Express.js',
            'Supabase',
            'PostgreSQL',
            'Firebase',
            'MongoDB',
            'ASP.NET',
        ],
    },
    {
        category: 'AI & Tools',
        items: ['Gemini API', 'Google Vision OCR', 'Redux Toolkit'],
    },
    {
        category: 'DevOps',
        items: ['Vercel', 'Railway', 'AWS', 'Git', 'GitHub'],
    },
    {
        category: 'Other',
        items: ['SQLite', 'RLS (Supabase)', 'REST APIs', 'Webpack', 'Vite'],
    },
    {
        category: 'Certifications',
        items: ['Harvard CS50 Python', 'PBEEE candidate 2027-2028'],
    },
];

export default skills;
