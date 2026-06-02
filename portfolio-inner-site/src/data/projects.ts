// Centralized, strongly-typed project data for Nour's portfolio.
// Source of truth for the Projects.exe window.

export type ProjectStatus =
    | 'Live'
    | 'Live on both stores'
    | 'In development'
    | 'Hackathon submission';

export interface ProjectLink {
    label: string;
    url: string;
}

export interface Project {
    id: string;
    name: string;
    featured: boolean;
    role: string;
    description: string;
    stack: string[];
    status: ProjectStatus;
    statusEmoji: string;
    links: ProjectLink[];
}

const projects: Project[] = [
    {
        id: 'pro-rently',
        name: 'Pro Rently',
        featured: true,
        role: 'Lead Developer',
        description:
            'Real estate rental app for the Kigali market. Property listings, search filters, booking requests, and in-app messaging. Guest mode plus a full account flow, with MTN MoMo payment integration.',
        stack: [
            'React Native',
            'Expo',
            'Supabase',
            'TypeScript',
            'PostgreSQL + RLS',
        ],
        status: 'Live on both stores',
        statusEmoji: '✅',
        links: [
            {
                label: 'App Store',
                url: 'https://apps.apple.com/rw/app/pro-rently/id6760939926',
            },
        ],
    },
    {
        id: 'chadito',
        name: 'Chadito',
        featured: false,
        role: 'Founder & Lead Developer',
        description:
            'Chadian marketplace app to buy and sell goods locally in Chad. Arabic RTL support, category browsing, and seller profiles.',
        stack: ['React Native', 'Expo', 'Supabase', 'TypeScript'],
        status: 'Live on both stores',
        statusEmoji: '✅',
        links: [
            {
                label: 'App Store',
                url: 'https://apps.apple.com/rw/app/chadito/id6757854742',
            },
            {
                label: 'Play Store',
                url: 'https://play.google.com/store/apps/details?id=com.chadito.app',
            },
        ],
    },
    {
        id: 'griot',
        name: 'Griot',
        featured: false,
        role: 'Founder & Lead Developer',
        description:
            'AI-powered developer portfolio platform built for African developers. Showcase projects and generate a beautiful portfolio from GitHub data with an Africa-First approach.',
        stack: [
            'Next.js 14',
            'Supabase',
            'TypeScript',
            'Tailwind CSS',
            'Gemini AI',
        ],
        status: 'In development',
        statusEmoji: '🚧',
        links: [],
    },
    {
        id: 'quickbill',
        name: 'QuickBill',
        featured: false,
        role: 'Lead Developer',
        description:
            'Offline-first invoicing app for African SMEs. OCR scanning, PDF generation, SQLite local storage with Supabase sync, and AI-powered receipt parsing.',
        stack: [
            'React Native',
            'Expo',
            'SQLite',
            'Supabase',
            'Gemini AI',
            'TypeScript',
        ],
        status: 'In development',
        statusEmoji: '🚧',
        links: [],
    },
    {
        id: 'cheikh-ahmad-al-nour',
        name: 'Cheikh Ahmad Al-Nour',
        featured: false,
        role: 'Lead Developer',
        description:
            'Islamic educational app featuring Quran, Hadiths, prayer times, and Duas. Rated 4.8★ on Google Play.',
        stack: ['React Native', 'Expo', 'Firebase'],
        status: 'Live',
        statusEmoji: '✅',
        links: [],
    },
    {
        id: 'kaminuza-hub',
        name: 'Kaminuza Hub',
        featured: false,
        role: 'Lead Developer',
        description:
            'Student-focused app for Rwanda universities. Resources, timetables, and campus info in one place.',
        stack: ['React Native', 'Expo', 'Supabase'],
        status: 'Live',
        statusEmoji: '✅',
        links: [],
    },
    {
        id: 'proofhire',
        name: 'ProofHire',
        featured: false,
        role: 'Lead Developer · Team NovaTalent',
        description:
            'AI-powered talent screening tool with a "Proof of Skill" verification system and an Africa-First fairness angle. Built and deployed in 48h during the Umurava AI Hackathon.',
        stack: [
            'Next.js 14',
            'TypeScript',
            'Redux Toolkit',
            'Node.js',
            'Express',
            'MongoDB',
            'Gemini 1.5 Flash',
        ],
        status: 'Hackathon submission',
        statusEmoji: '✅',
        links: [],
    },
    {
        id: 'steeven-institute',
        name: 'Steeven Institute Training Center',
        featured: false,
        role: 'Lead Developer (Client Project)',
        description:
            'Institutional website for a training center. Bilingual (FR/EN), course catalog, and registration flow.',
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        status: 'Live',
        statusEmoji: '✅',
        links: [
            {
                label: 'Live Site',
                url: 'https://steeven-institute-five.vercel.app/en',
            },
        ],
    },
];

export default projects;
