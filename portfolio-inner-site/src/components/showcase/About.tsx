import React from 'react';
import { Link } from 'react-router-dom';
import { contact, identity, stats } from '../../data/info';

export interface AboutProps {}

const About: React.FC<AboutProps> = () => {
    return (
        <div className="site-page-content">
            <div style={styles.pageHeader}>
                <p style={styles.eyebrow}>Software Engineer · Mobile &amp; Web</p>
                <h1 style={styles.pageTitle}>{identity.fullName}</h1>
                <p style={styles.pageSubtitle}>
                    {identity.location}&nbsp;·&nbsp;originally from {identity.origin}
                </p>
            </div>

            <div className="text-block">
                <p>
                    I build mobile apps and web platforms that ship cleanly and
                    stay usable once real users arrive. 3+ years of experience, 8
                    live products, 4 published apps on the App Store and Google
                    Play. Remote developer at ChadNova, final-year Software
                    Engineering student at Kigali Independent University, and
                    Harvard CS50 Python certified.
                </p>
                <p>
                    Have a project in mind?{' '}
                    <Link to="/contact">Contact me here</Link> or email{' '}
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>.
                </p>
            </div>

            <div style={styles.statsSection}>
                <p style={styles.sectionLabel}>By the numbers</p>
                <div className="stat-grid">
                    {stats.map((stat, i) => {
                        const color =
                            i % 3 === 0 ? '' :
                            i % 3 === 1 ? ' stat-card__number--purple' :
                            ' stat-card__number--orange';
                        return (
                            <div key={stat.label} className="stat-card">
                                <div className={`stat-card__number${color}`}>{stat.value}</div>
                                <div className="stat-card__label">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={styles.threeCol}>
                <div style={styles.pillar}>
                    <p style={styles.pillarLabel}>Background</p>
                    <p style={styles.pillarText}>
                        From Chad, building in Rwanda. I design for real
                        conditions: offline-first flows, MTN MoMo payment
                        rails, Arabic RTL support, and bilingual interfaces.
                    </p>
                </div>
                <div style={styles.pillar}>
                    <p style={styles.pillarLabel}>Approach</p>
                    <p style={styles.pillarText}>
                        Africa-First. Every product I ship is meant to hold
                        up when real users arrive with real network conditions
                        and real payment friction.
                    </p>
                </div>
                <div style={styles.pillar}>
                    <p style={styles.pillarLabel}>Beyond work</p>
                    <p style={styles.pillarText}>
                        I mentor, build in public on{' '}
                        <a rel="noreferrer" target="_blank" href={contact.youtube}>YouTube</a>,
                        and explore how AI can make tools fairer for African
                        developers and businesses.
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    pageHeader: {
        flexDirection: 'column',
        gap: 6,
        marginBottom: 28,
        paddingBottom: 28,
        borderBottom: '0.5px solid rgba(0,0,0,0.07)',
    },
    eyebrow: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
        letterSpacing: '0.09em',
        color: '#0078D4',
    },
    pageTitle: {
        fontSize: 34,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'rgba(17,24,39,0.94)',
        lineHeight: 1.1,
    },
    pageSubtitle: {
        fontSize: 12,
        color: 'rgba(32,32,32,0.46)',
        fontFamily: "'IBM Plex Mono', monospace",
        letterSpacing: '0.04em',
    },
    statsSection: {
        flexDirection: 'column',
        marginBottom: 28,
    },
    sectionLabel: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
        color: 'rgba(32,32,32,0.40)',
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        marginBottom: 10,
    },
    threeCol: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        marginTop: 4,
    },
    pillar: {
        flexDirection: 'column',
        gap: 6,
        padding: '14px 16px',
        background: 'rgba(255,255,255,0.62)',
        border: '0.5px solid rgba(0,0,0,0.07)',
        borderRadius: 10,
    },
    pillarLabel: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.08em',
        color: '#0078D4',
        textTransform: 'uppercase',
    },
    pillarText: {
        fontSize: 12,
        lineHeight: 1.6,
        color: 'rgba(32,32,32,0.64)',
    },
};

export default About;
