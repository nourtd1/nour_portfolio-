import React from 'react';
import skills from '../../data/skills';

export interface SkillsProps {}

type TagColor = 'green' | 'purple' | 'orange';
const TAG_COLORS: TagColor[] = ['green', 'purple', 'orange'];

const Skills: React.FC<SkillsProps> = () => {
    return (
        <div className="site-page-content">
            <div style={styles.pageHeader}>
                <p style={styles.eyebrow}>Stack &amp; Tools</p>
                <h1 style={styles.pageTitle}>Skills</h1>
                <p style={styles.pageSubtitle}>
                    React Native / Expo / Supabase for mobile, Next.js for web,
                    AI tooling throughout.
                </p>
            </div>

            <div style={styles.categories}>
                {skills.map((group, groupIndex) => (
                    <div key={group.category} style={styles.category}>
                        <p style={styles.categoryLabel}>{group.category}</p>
                        <div className="tags">
                            {group.items.map((item, i) => {
                                const color = TAG_COLORS[(groupIndex + i) % 3];
                                return (
                                    <span key={item} className={`tag tag--${color}`}>
                                        {item}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    pageHeader: {
        flexDirection: 'column',
        gap: 6,
        marginBottom: 28,
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
    pageSubtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.44)',
        lineHeight: 1.5,
    },
    categories: {
        flexDirection: 'column',
        gap: 22,
        width: '100%',
    },
    category: {
        flexDirection: 'column',
        gap: 8,
    },
    categoryLabel: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.32)',
    },
};

export default Skills;
