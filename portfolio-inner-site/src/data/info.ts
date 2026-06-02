// Single source of truth for Nour's identity, contact, stats and bio.

export interface SocialLink {
    label: string;
    url: string;
}

export interface Stat {
    value: string;
    label: string;
}

export const identity = {
    fullName: 'ANNOUR MAHAMAT ABDOULAYE',
    brand: "Nour'dev",
    aliases: ['Nour', "Nour'dev", 'NourDevTD'],
    title: 'Software Engineer - Mobile & Web Developer',
    shortTitle: 'Software Engineer',
    location: 'Gisenyi, Rwanda',
    origin: 'Chad',
    availability: 'Available for product and app work',
} as const;

export const contact = {
    email: 'nourdevtd@gmail.com',
    phone: '+250 798 977 292',
    github: 'https://github.com/nourtd1',
    linkedin:
        'https://www.linkedin.com/in/annour-mahamat-abdoulaye-a799ba310',
    youtube: 'https://youtube.com/@callme_nour',
    appStore:
        'https://apps.apple.com/developer/mahamat-abdoulaye-annour/id1867114715',
    googlePlay: 'Nourdevtd',
} as const;

export const socials: SocialLink[] = [
    { label: 'GitHub', url: contact.github },
    { label: 'LinkedIn', url: contact.linkedin },
    { label: 'YouTube', url: contact.youtube },
];

export const bio =
    "I'm Nour, a Software Engineer based in Gisenyi, Rwanda, originally from Chad. I build mobile apps and web platforms that ship cleanly and stay usable once real users arrive. 3+ years of experience, 8 live products, 4 published apps on App Store & Google Play. Currently a final-year Software Engineering student at Kigali Independent University and remote developer at ChadNova (ID: CN-DEV-006). Harvard CS50 Python certified.";

export const stats: Stat[] = [
    { value: '8', label: 'Live Products' },
    { value: '3+', label: 'Years of Experience' },
    { value: '4', label: 'Client Projects' },
    { value: '23', label: 'Technologies Used' },
    { value: '4', label: 'Published Apps' },
    { value: '3', label: 'Web Projects' },
];
