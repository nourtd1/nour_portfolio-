import React, { useEffect, useState } from 'react';
import { Link } from '../general';
import { useLocation, useNavigate } from 'react-router';
import { identity } from '../../data/info';

export interface VerticalNavbarProps {}

const VerticalNavbar: React.FC<VerticalNavbarProps> = () => {
    const location = useLocation();
    const [isHome, setIsHome] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsHome(location.pathname === '/');
    }, [location.pathname]);

    if (isHome) return <></>;

    return (
        <nav style={styles.navbar}>
            <div style={styles.brand}>
                <button style={styles.brandBtn} onMouseDown={() => navigate('/')}>
                    <span style={styles.brandName}>
                        Nour<span style={styles.brandAccent}>'dev</span>
                    </span>
                    <span style={styles.brandRole}>{identity.shortTitle}</span>
                </button>
                <div style={styles.availBadge}>
                    <span style={styles.availDot} />
                    <span style={styles.availText}>Available</span>
                </div>
            </div>

            <div style={styles.divider} />

            <div style={styles.links}>
                <Link containerStyle={styles.link} to="" text="Home" />
                <Link containerStyle={styles.link} to="about" text="About" />
                <Link containerStyle={styles.link} to="experience" text="Experience" />
                <Link containerStyle={styles.link} to="skills" text="Skills" />
                <Link containerStyle={styles.link} to="projects" text="Projects" />
                <Link containerStyle={styles.link} to="testimonials" text="Testimonials" />
                <Link containerStyle={styles.link} to="contact" text="Contact" />
            </div>

            <div style={styles.footer}>
                <span style={styles.footerText}>{identity.location}</span>
            </div>
        </nav>
    );
};

const styles: StyleSheetCSS = {
    navbar: {
        width: 220,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 24px 28px',
        boxSizing: 'border-box',
        position: 'fixed',
        overflow: 'hidden',
        borderRight: '0.5px solid rgba(255,255,255,0.07)',
        background: 'rgba(6,11,20,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 10,
    },
    brand: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        marginBottom: 4,
    },
    brandBtn: {
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 2,
        display: 'flex',
    },
    brandName: {
        fontFamily: "'Inter', sans-serif",
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'rgba(255,255,255,0.92)',
        lineHeight: 1,
    },
    brandAccent: {
        color: '#00C896',
    },
    brandRole: {
        display: 'block',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.06em',
        color: 'rgba(255,255,255,0.34)',
        marginTop: 5,
        lineHeight: 1,
    },
    availBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        marginTop: 8,
        padding: '3px 8px',
        borderRadius: 9999,
        background: 'rgba(0,200,150,0.12)',
        border: '0.5px solid rgba(0,200,150,0.30)',
        width: 'fit-content',
    },
    availDot: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: '#00C896',
        flexShrink: 0,
        boxShadow: '0 0 6px rgba(0,200,150,0.70)',
    },
    availText: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 9,
        letterSpacing: '0.08em',
        color: '#00C896',
        fontWeight: 500,
    },
    divider: {
        width: '100%',
        height: '0.5px',
        background: 'rgba(255,255,255,0.07)',
        margin: '16px 0',
        flexShrink: 0,
    },
    links: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    link: {
        marginBottom: 4,
    },
    footer: {
        paddingTop: 16,
        borderTop: '0.5px solid rgba(255,255,255,0.06)',
    },
    footerText: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 9,
        color: 'rgba(255,255,255,0.28)',
        letterSpacing: '0.06em',
    },
};

export default VerticalNavbar;
