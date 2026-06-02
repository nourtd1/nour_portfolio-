import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

export interface LinkProps {
    text: string;
    to: string;
    containerStyle?: React.CSSProperties;
    outsideTo?: string;
}

const Link: React.FC<LinkProps> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isHere, setIsHere] = useState(false);

    useEffect(() => {
        setIsHere(location.pathname === `/${props.to}`);
    }, [location, props.to]);

    const [active, setActive] = useState(false);

    const handleClick = (e: any) => {
        let isMounted = true;
        e.preventDefault();
        setActive(true);
        if (location.pathname !== `/${props.to}`) {
            setTimeout(() => {
                if (isMounted) navigate(`/${props.to}`);
            }, 100);
        }
        const t = setTimeout(() => {
            if (isMounted) setActive(false);
        }, 100);
        return () => {
            isMounted = false;
            clearTimeout(t);
        };
    };

    return (
        <RouterLink
            to={`/${props.to}`}
            onMouseDown={handleClick}
            style={Object.assign(
                {},
                styles.linkWrap,
                props.containerStyle
            )}
        >
            <span
                style={Object.assign(
                    {},
                    styles.link,
                    isHere && styles.linkActive,
                    active && styles.linkPress
                )}
            >
                {isHere && <span style={styles.dot} />}
                {props.text}
            </span>
        </RouterLink>
    );
};

const styles: StyleSheetCSS = {
    linkWrap: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        padding: '6px 8px',
        borderRadius: 7,
        transition: 'background 0.12s ease, color 0.12s ease',
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: '0',
        color: 'rgba(255,255,255,0.40)',
        textDecoration: 'none',
        transition: 'color 0.12s ease',
        width: '100%',
    },
    linkActive: {
        color: '#00C896',
        fontWeight: 600,
    },
    linkPress: {
        color: '#00a87e',
    },
    dot: {
        display: 'inline-block',
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: '#00C896',
        boxShadow: '0 0 6px rgba(0,200,150,0.70)',
        flexShrink: 0,
    },
};

export default Link;
