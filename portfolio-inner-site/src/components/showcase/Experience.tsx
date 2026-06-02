import React from 'react';

export interface ExperienceProps {}

interface Role {
    org: string;
    location: string;
    title: string;
    period: string;
    summary: string;
    bullets: string[];
    type: 'work' | 'edu';
}

const ROLES: Role[] = [
    {
        org: 'ChadNova',
        location: 'Remote',
        title: 'Software Developer · ID: CN-DEV-006',
        period: 'Present',
        type: 'work',
        summary:
            'Remote developer building mobile and web products with a React Native, Expo, and Supabase stack.',
        bullets: [
            'Cross-platform mobile apps with React Native and Expo, backed by Supabase and PostgreSQL with row-level security.',
            'Local payment rail integration (MTN MoMo) and offline-first flows for African market conditions.',
            'End-to-end release ownership on the App Store and Google Play.',
        ],
    },
    {
        org: 'Independent · Founder',
        location: 'Gisenyi, Rwanda',
        title: 'Lead Developer — Mobile & Web',
        period: '3+ Years',
        type: 'work',
        summary:
            'Founder and lead developer behind multiple shipped products including Pro Rently, Chadito, and apps serving users across Rwanda and Chad.',
        bullets: [
            '8 live products and 4 published apps across the App Store and Google Play, using 23+ technologies.',
            'Steeven Institute Training Center website: bilingual FR/EN, Next.js, full course catalog.',
            'ProofHire — AI talent-screening tool with Africa-First fairness angle, built in 48h at the Umurava AI Hackathon.',
        ],
    },
    {
        org: 'Kigali Independent University',
        location: 'Rwanda',
        title: 'BSc Software Engineering · Final Year',
        period: 'In progress',
        type: 'edu',
        summary:
            'Final-year Software Engineering student. Harvard CS50 Python certified. PBEEE scholarship candidate for 2027–2028.',
        bullets: [],
    },
];

const RoleCard: React.FC<{ role: Role }> = ({ role }) => (
    <div style={styles.card}>
        <div style={styles.cardLeft}>
            <span style={styles.cardType}>{role.type === 'edu' ? 'Education' : 'Work'}</span>
        </div>
        <div style={styles.cardBody}>
            <div style={styles.cardHeader}>
                <div style={styles.cardHeaderMain}>
                    <h2 style={styles.cardOrg}>{role.org}</h2>
                    <span style={styles.cardMeta}>{role.location} · {role.period}</span>
                </div>
                <p style={styles.cardTitle}>{role.title}</p>
            </div>
            <p style={styles.cardSummary}>{role.summary}</p>
            {role.bullets.length > 0 && (
                <ul style={styles.bullets}>
                    {role.bullets.map((b) => (
                        <li key={b} style={styles.bullet}>{b}</li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);

const Experience: React.FC<ExperienceProps> = () => {
    return (
        <div className="site-page-content">
            <div style={styles.pageHeader}>
                <p style={styles.eyebrow}>Career &amp; Education</p>
                <h1 style={styles.pageTitle}>Experience</h1>
            </div>

            <div style={styles.timeline}>
                {ROLES.map((role) => (
                    <RoleCard key={role.org} role={role} />
                ))}
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    pageHeader: {
        flexDirection: 'column',
        gap: 6,
        marginBottom: 32,
        paddingBottom: 24,
        borderBottom: '0.5px solid rgba(255,255,255,0.07)',
    },
    eyebrow: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
        letterSpacing: '0.09em',
        color: '#00C896',
    },
    pageTitle: {
        fontSize: 34,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'rgba(255,255,255,0.92)',
        lineHeight: 1.1,
    },
    timeline: {
        flexDirection: 'column',
        gap: 16,
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        padding: '20px',
        background: 'rgba(255,255,255,0.05)',
        border: '0.5px solid rgba(255,255,255,0.09)',
        borderRadius: 12,
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    },
    cardLeft: {
        flexDirection: 'column',
        flexShrink: 0,
        paddingTop: 2,
        width: 64,
    },
    cardType: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 9,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.28)',
        writingMode: 'vertical-lr',
        transform: 'rotate(180deg)',
        height: 'fit-content',
    },
    cardBody: {
        flexDirection: 'column',
        gap: 8,
        flex: 1,
        minWidth: 0,
    },
    cardHeader: {
        flexDirection: 'column',
        gap: 3,
    },
    cardHeaderMain: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 8,
        flexWrap: 'wrap',
    },
    cardOrg: {
        fontSize: 16,
        fontWeight: 700,
        letterSpacing: '-0.01em',
        color: 'rgba(255,255,255,0.90)',
        lineHeight: 1.2,
    },
    cardMeta: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
        color: 'rgba(255,255,255,0.32)',
        letterSpacing: '0.04em',
        flexShrink: 0,
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: 500,
        color: '#00C896',
        fontFamily: "'IBM Plex Mono', monospace",
        letterSpacing: '0.02em',
    },
    cardSummary: {
        fontSize: 13,
        lineHeight: 1.65,
        color: 'rgba(255,255,255,0.55)',
        marginTop: 4,
    },
    bullets: {
        flexDirection: 'column',
        paddingLeft: 0,
        listStyle: 'none',
        gap: 6,
        marginTop: 4,
    },
    bullet: {
        fontSize: 13,
        lineHeight: 1.6,
        color: 'rgba(255,255,255,0.50)',
        paddingLeft: 14,
        position: 'relative',
        marginBottom: 0,
    },
};

export default Experience;
