import React, { useCallback, useEffect, useState } from 'react';
import { IconName } from '../../assets/icons';
import { Icon } from '../general';

export interface DesktopShortcutProps {
    icon: IconName;
    shortcutName: string;
    shortcutDescription?: string;
    shortcutInitials?: string;
    accent?: 'green' | 'purple' | 'orange';
    invertText?: boolean;
    onOpen: () => void;
}

const DesktopShortcut: React.FC<DesktopShortcutProps> = ({
    icon,
    shortcutName,
    shortcutDescription,
    shortcutInitials,
    accent = 'green',
    invertText,
    onOpen,
}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [shortcutId, setShortcutId] = useState('');

    const getShortcutId = useCallback(() => {
        const shortcutId = shortcutName.replace(/\s/g, '');
        return `desktop-shortcut-${shortcutId}`;
    }, [shortcutName]);

    useEffect(() => {
        setShortcutId(getShortcutId());
    }, [shortcutName, getShortcutId]);

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            // @ts-ignore
            const targetId = event.target.id;
            if (targetId !== shortcutId) {
                setIsSelected(false);
            }
        },
        [setIsSelected, shortcutId]
    );

    const handleClickShortcut = useCallback(() => {
        setIsSelected(true);
        onOpen && onOpen();
    }, [setIsSelected, onOpen]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSelected, handleClickOutside]);

    return (
        <div
            className={
                isSelected
                    ? 'desktop-shortcut desktop-shortcut--selected'
                    : 'desktop-shortcut'
            }
            id={`${shortcutId}`}
            style={styles.appShortcut}
            onMouseDown={handleClickShortcut}
        >
            <div
                id={`${shortcutId}`}
                className={`desktop-shortcut__glyph desktop-shortcut__glyph--${accent}`}
                style={styles.iconContainer}
            >
                {shortcutInitials ? (
                    <span id={`${shortcutId}`} style={styles.initials}>
                        {shortcutInitials}
                    </span>
                ) : (
                    <Icon icon={icon} style={styles.icon} />
                )}
            </div>
            <div id={`${shortcutId}`} style={styles.content}>
                <p
                    id={`${shortcutId}`}
                    style={Object.assign(
                        {},
                        styles.shortcutText,
                        invertText && !isSelected && { color: 'black' }
                    )}
                >
                    {shortcutName}
                </p>
                {shortcutDescription && (
                    <span
                        id={`${shortcutId}`}
                        className="desktop-shortcut__description"
                    >
                        {shortcutDescription}
                    </span>
                )}
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    appShortcut: {
        position: 'relative',
        width: '100%',
        height: 'auto',
        minHeight: 90,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        textAlign: 'left',
    },
    shortcutText: {
        cursor: 'pointer',
        fontFamily: "'Inter', sans-serif",
        color: 'rgba(17, 24, 39, 0.92)',
        fontSize: 13,
        fontWeight: 650,
        paddingRight: 0,
        paddingLeft: 0,
    },
    iconContainer: {
        cursor: 'pointer',
        width: 44,
        height: 44,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    icon: {
        width: 26,
        height: 26,
    },
    initials: {
        fontFamily: "'Inter', sans-serif",
        fontSize: 14,
        fontWeight: 750,
        color: 'rgba(255, 255, 255, 0.96)',
    },
    content: {
        width: '100%',
    },
};

export default DesktopShortcut;
