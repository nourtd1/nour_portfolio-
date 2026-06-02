import React from 'react';
import testimonials from '../../data/testimonials';

export interface TestimonialsProps {}

const Testimonials: React.FC<TestimonialsProps> = () => {
    return (
        <div className="site-page-content">
            <div style={styles.pageHeader}>
                <p style={styles.eyebrow}>What collaborators say</p>
                <h1 style={styles.pageTitle}>Testimonials</h1>
            </div>

            <div style={styles.list}>
                {testimonials.map((t) => (
                    <div key={t.name} style={styles.card}>
                        <p style={styles.quote}>"{t.quote}"</p>
                        <div style={styles.attribution}>
                            <span style={styles.name}>{t.name}</span>
                            <span style={styles.role}>{t.role}</span>
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
        marginBottom: 32,
        paddingBottom: 24,
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
    list: {
        flexDirection: 'column',
        gap: 16,
    },
    card: {
        flexDirection: 'column',
        gap: 14,
        padding: '20px 24px',
        background: 'rgba(255,255,255,0.72)',
        border: '0.5px solid rgba(0,0,0,0.08)',
        borderRadius: 12,
    },
    quote: {
        fontSize: 14,
        lineHeight: 1.7,
        color: 'rgba(32,32,32,0.78)',
        fontStyle: 'italic',
    },
    attribution: {
        flexDirection: 'column',
        gap: 2,
        paddingTop: 12,
        borderTop: '0.5px solid rgba(0,0,0,0.06)',
    },
    name: {
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        color: '#0078D4',
    },
    role: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.04em',
        color: 'rgba(32,32,32,0.46)',
    },
};

export default Testimonials;
