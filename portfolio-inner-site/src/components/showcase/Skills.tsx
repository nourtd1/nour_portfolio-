import React, { useState } from 'react';

export interface SkillsProps {}

interface SkillItem {
    name: string;
    level: number; // 0–100
}

interface SkillGroup {
    category: string;
    icon: string;
    color: 'green' | 'purple' | 'orange';
    skills: SkillItem[];
}

const SKILL_GROUPS: SkillGroup[] = [
    {
        category: 'Mobile',
        icon: '📱',
        color: 'green',
        skills: [
            { name: 'React Native', level: 95 },
            { name: 'Expo', level: 92 },
            { name: 'React Navigation', level: 88 },
            { name: 'Framer Motion', level: 78 },
        ],
    },
    {
        category: 'Web',
        icon: '🌐',
        color: 'purple',
        skills: [
            { name: 'Next.js', level: 90 },
            { name: 'React', level: 93 },
            { name: 'TypeScript', level: 88 },
            { name: 'Tailwind CSS', level: 85 },
            { name: 'HTML / CSS', level: 95 },
        ],
    },
    {
        category: 'Backend',
        icon: '⚙️',
        color: 'orange',
        skills: [
            { name: 'Supabase', level: 90 },
            { name: 'Node.js', level: 82 },
            { name: 'Express.js', level: 80 },
            { name: 'PostgreSQL', level: 78 },
            { name: 'Firebase', level: 75 },
            { name: 'MongoDB', level: 70 },
        ],
    },
    {
        category: 'AI & Tools',
        icon: '🤖',
        color: 'green',
        skills: [
            { name: 'Gemini API', level: 82 },
            { name: 'Google Vision OCR', level: 75 },
            { name: 'Redux Toolkit', level: 80 },
        ],
    },
    {
        category: 'DevOps',
        icon: '🚀',
        color: 'purple',
        skills: [
            { name: 'Git / GitHub', level: 90 },
            { name: 'Vercel', level: 88 },
            { name: 'Railway', level: 80 },
            { name: 'AWS', level: 65 },
        ],
    },
];

const COLOR_MAP = {
    green:  { bar: '#00C896', glow: 'rgba(0,200,150,0.25)', badge: 'rgba(0,200,150,0.10)', border: 'rgba(0,200,150,0.28)', text: '#00C896' },
    purple: { bar: '#A78BFA', glow: 'rgba(167,139,250,0.25)', badge: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.28)', text: '#A78BFA' },
    orange: { bar: '#FF6B35', glow: 'rgba(255,107,53,0.25)', badge: 'rgba(255,107,53,0.10)', border: 'rgba(255,107,53,0.28)', text: '#FF6B35' },
};

const levelLabel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 65) return 'Proficient';
    return 'Familiar';
};

const SkillBar: React.FC<{ skill: SkillItem; color: SkillGroup['color']; delay: number }> = ({ skill, color, delay }) => {
    const c = COLOR_MAP[color];
    return (
        <div style={styles.skillRow}>
            <div style={styles.skillMeta}>
                <span style={styles.skillName}>{skill.name}</span>
                <span style={{ ...styles.skillBadge, background: c.badge, border: `0.5px solid ${c.border}`, color: c.text }}>
                    {levelLabel(skill.level)}
                </span>
            </div>
            <div style={styles.barTrack}>
                <div
                    style={{
                        ...styles.barFill,
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, ${c.bar}, ${c.bar}cc)`,
                        boxShadow: `0 0 8px ${c.glow}`,
                        animationDelay: `${delay}ms`,
                    }}
                    className="skill-bar-fill"
                />
            </div>
        </div>
    );
};

const Skills: React.FC<SkillsProps> = () => {
    const [activeGroup, setActiveGroup] = useState<string | null>(null);

    const displayed = activeGroup
        ? SKILL_GROUPS.filter((g) => g.category === activeGroup)
        : SKILL_GROUPS;

    return (
        <div className="site-page-content">
            {/* Header */}
            <div style={styles.pageHeader}>
                <p style={styles.eyebrow}>Stack &amp; Tools</p>
                <h1 style={styles.pageTitle}>Skills</h1>
                <p style={styles.pageSubtitle}>
                    React Native · Expo · Supabase for mobile &nbsp;·&nbsp; Next.js for web &nbsp;·&nbsp; AI tooling throughout.
                </p>
            </div>

            {/* Filter tabs */}
            <div style={styles.filters}>
                <button
                    style={{ ...styles.filterBtn, ...(activeGroup === null ? styles.filterBtnActive : {}) }}
                    onMouseDown={() => setActiveGroup(null)}
                >
                    All
                </button>
                {SKILL_GROUPS.map((g) => (
                    <button
                        key={g.category}
                        style={{ ...styles.filterBtn, ...(activeGroup === g.category ? styles.filterBtnActive : {}) }}
                        onMouseDown={() => setActiveGroup(g.category === activeGroup ? null : g.category)}
                    >
                        {g.icon} {g.category}
                    </button>
                ))}
            </div>

            {/* Skill groups */}
            <div style={styles.groups}>
                {displayed.map((group) => {
                    const c = COLOR_MAP[group.color];
                    return (
                        <div key={group.category} style={styles.groupCard}>
                            <div style={styles.groupHeader}>
                                <span style={styles.groupIcon}>{group.icon}</span>
                                <span style={{ ...styles.groupTitle, color: c.text }}>
                                    {group.category}
                                </span>
                                <span style={{ ...styles.groupCount, color: c.text }}>
                                    {group.skills.length} skills
                                </span>
                            </div>
                            <div style={styles.skillList}>
                                {group.skills.map((skill, i) => (
                                    <SkillBar
                                        key={skill.name}
                                        skill={skill}
                                        color={group.color}
                                        delay={i * 60}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Certifications */}
            <div style={styles.certSection}>
                <p style={styles.certLabel}>Certifications</p>
                <div style={styles.certRow}>
                    <div style={styles.certCard}>
                        <div style={styles.certIcon}>🎓</div>
                        <div style={styles.certBody}>
                            <p style={styles.certName}>Harvard CS50 Python</p>
                            <p style={styles.certOrg}>Harvard University · Verified</p>
                        </div>
                        <span style={styles.certBadge}>Certified</span>
                    </div>
                    <div style={styles.certCard}>
                        <div style={styles.certIcon}>🏆</div>
                        <div style={styles.certBody}>
                            <p style={styles.certName}>PBEEE Scholarship Candidate</p>
                            <p style={styles.certOrg}>2027–2028 · In progress</p>
                        </div>
                        <span style={{ ...styles.certBadge, background: 'rgba(167,139,250,0.10)', border: '0.5px solid rgba(167,139,250,0.28)', color: '#A78BFA' }}>
                            Candidate
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    pageHeader: {
        flexDirection: 'column',
        gap: 6,
        marginBottom: 20,
        paddingBottom: 20,
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
    pageSubtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.44)',
        lineHeight: 1.5,
    },
    // Filter tabs
    filters: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 20,
    },
    filterBtn: {
        padding: '5px 12px',
        borderRadius: 20,
        border: '0.5px solid rgba(255,255,255,0.10)',
        background: 'rgba(255,255,255,0.05)',
        color: 'rgba(255,255,255,0.50)',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        letterSpacing: '0.03em',
    },
    filterBtnActive: {
        background: 'rgba(0,200,150,0.12)',
        border: '0.5px solid rgba(0,200,150,0.35)',
        color: '#00C896',
    },
    // Groups
    groups: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 14,
        marginBottom: 28,
    },
    groupCard: {
        flexDirection: 'column',
        gap: 12,
        padding: '16px 18px',
        background: 'rgba(255,255,255,0.04)',
        border: '0.5px solid rgba(255,255,255,0.08)',
        borderRadius: 14,
    },
    groupHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 2,
    },
    groupIcon: {
        fontSize: 16,
        lineHeight: 1,
    },
    groupTitle: {
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        flex: 1,
    },
    groupCount: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 9,
        letterSpacing: '0.06em',
        opacity: 0.6,
    },
    skillList: {
        flexDirection: 'column',
        gap: 10,
    },
    skillRow: {
        flexDirection: 'column',
        gap: 5,
    },
    skillMeta: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    skillName: {
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        color: 'rgba(255,255,255,0.75)',
        fontWeight: 500,
    },
    skillBadge: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 8,
        letterSpacing: '0.06em',
        padding: '2px 6px',
        borderRadius: 4,
    },
    barTrack: {
        width: '100%',
        height: 4,
        background: 'rgba(255,255,255,0.07)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: 2,
        transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
    },
    // Certifications
    certSection: {
        flexDirection: 'column',
        gap: 10,
        paddingTop: 20,
        borderTop: '0.5px solid rgba(255,255,255,0.07)',
    },
    certLabel: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.30)',
        marginBottom: 4,
    },
    certRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
    },
    certCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: '14px 16px',
        background: 'rgba(255,255,255,0.04)',
        border: '0.5px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
    },
    certIcon: {
        fontSize: 22,
        lineHeight: 1,
        flexShrink: 0,
    },
    certBody: {
        flexDirection: 'column',
        gap: 2,
        flex: 1,
        minWidth: 0,
    },
    certName: {
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 1.3,
    },
    certOrg: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 9,
        color: 'rgba(255,255,255,0.35)',
        letterSpacing: '0.04em',
    },
    certBadge: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 8,
        letterSpacing: '0.06em',
        padding: '3px 7px',
        borderRadius: 4,
        background: 'rgba(0,200,150,0.10)',
        border: '0.5px solid rgba(0,200,150,0.28)',
        color: '#00C896',
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
};

export default Skills;
