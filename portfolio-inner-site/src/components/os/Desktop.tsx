import React, { useCallback, useEffect, useState } from 'react';
import ShowcaseExplorer from '../applications/ShowcaseExplorer';
import ShutdownSequence from './ShutdownSequence';
import Terminal from '../applications/Terminal';
import HenordleApp from '../applications/Henordle';
import Toolbar from './Toolbar';
import DesktopShortcut, { DesktopShortcutProps } from './DesktopShortcut';
import { IconName } from '../../assets/icons';
import Credits from '../applications/Credits';
import { identity, stats } from '../../data/info';

export interface DesktopProps {}

type ExtendedWindowAppProps<T> = T & WindowAppProps;

const APPLICATIONS: {
    [key in string]: {
        key: string;
        name: string;
        description: string;
        initials: string;
        accent: DesktopShortcutProps['accent'];
        shortcutIcon: IconName;
        component: React.FC<ExtendedWindowAppProps<any>>;
    };
} = {
    // computer: {
    //     key: 'computer',
    //     name: 'This Computer',
    //     shortcutIcon: 'computerBig',
    //     component: ThisComputer,
    // },
    showcase: {
        key: 'showcase',
        name: 'Portfolio Hub',
        description: 'Projects, skills, proof of work',
        initials: 'PH',
        accent: 'green',
        shortcutIcon: 'showcaseIcon',
        component: ShowcaseExplorer,
    },
    terminal: {
        key: 'terminal',
        name: 'Command Center',
        description: 'Fast commands and system profile',
        initials: 'CC',
        accent: 'purple',
        shortcutIcon: 'windowExplorerIcon',
        component: Terminal,
    },
    credits: {
        key: 'credits',
        name: 'Build Credits',
        description: 'Assets, models, acknowledgements',
        initials: 'BC',
        accent: 'orange',
        shortcutIcon: 'credits',
        component: Credits,
    },
    nourdle: {
        key: 'nourdle',
        name: 'Nourdle',
        description: 'Guess the 5-letter word',
        initials: 'NW',
        accent: 'green',
        shortcutIcon: 'windowGameIcon',
        component: HenordleApp,
    },
};

// Routes that live inside ShowcaseExplorer — auto-open it on direct URL access.
const SHOWCASE_ROUTES = ['/about', '/experience', '/skills', '/projects', '/testimonials', '/contact'];

const Desktop: React.FC<DesktopProps> = (props) => {
    const isMonitorMode = new URLSearchParams(window.location.search).has(
        'monitor'
    );

    // If the user lands on a deep route (e.g. /contact), auto-open Portfolio Hub.
    const initialShowcase = SHOWCASE_ROUTES.some((r) =>
        window.location.pathname.startsWith(r)
    );

    const [windows, setWindows] = useState<DesktopWindows>({});
    const [shortcuts, setShortcuts] = useState<DesktopShortcutProps[]>([]);
    const [shutdown, setShutdown] = useState(false);
    const [numShutdowns, setNumShutdowns] = useState(1);
    const [showcaseAutoOpened, setShowcaseAutoOpened] = useState(false);

    useEffect(() => {
        if (shutdown === true) {
            rebootDesktop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shutdown]);

    useEffect(() => {
        const newShortcuts: DesktopShortcutProps[] = [];
        Object.keys(APPLICATIONS).forEach((key) => {
            const app = APPLICATIONS[key];
            newShortcuts.push({
                shortcutName: app.name,
                shortcutDescription: app.description,
                shortcutInitials: app.initials,
                accent: app.accent,
                icon: app.shortcutIcon,
                onOpen: () => {
                    addWindow(
                        app.key,
                        <app.component
                            onInteract={() => onWindowInteract(app.key)}
                            onMinimize={() => minimizeWindow(app.key)}
                            onClose={() => removeWindow(app.key)}
                            key={app.key}
                        />
                    );
                },
            });
        });

        setShortcuts(newShortcuts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const rebootDesktop = useCallback(() => {
        setWindows({});
    }, []);

    const removeWindow = useCallback((key: string) => {
        // Absolute hack and a half
        setTimeout(() => {
            setWindows((prevWindows) => {
                const newWindows = { ...prevWindows };
                delete newWindows[key];
                return newWindows;
            });
        }, 100);
    }, []);

    const minimizeWindow = useCallback((key: string) => {
        setWindows((prevWindows) => {
            const newWindows = { ...prevWindows };
            newWindows[key].minimized = true;
            return newWindows;
        });
    }, []);

    const getHighestZIndex = useCallback((): number => {
        let highestZIndex = 0;
        Object.keys(windows).forEach((key) => {
            const window = windows[key];
            if (window) {
                if (window.zIndex > highestZIndex)
                    highestZIndex = window.zIndex;
            }
        });
        return highestZIndex;
    }, [windows]);

    const toggleMinimize = useCallback(
        (key: string) => {
            const newWindows = { ...windows };
            const highestIndex = getHighestZIndex();
            if (
                newWindows[key].minimized ||
                newWindows[key].zIndex === highestIndex
            ) {
                newWindows[key].minimized = !newWindows[key].minimized;
            }
            newWindows[key].zIndex = getHighestZIndex() + 1;
            setWindows(newWindows);
        },
        [windows, getHighestZIndex]
    );

    const onWindowInteract = useCallback(
        (key: string) => {
            setWindows((prevWindows) => ({
                ...prevWindows,
                [key]: {
                    ...prevWindows[key],
                    zIndex: Math.max(getHighestZIndex() + 1, 20),
                },
            }));
        },
        [setWindows, getHighestZIndex]
    );

    const startShutdown = useCallback(() => {
        setTimeout(() => {
            setShutdown(true);
            setNumShutdowns(numShutdowns + 1);
        }, 600);
    }, [numShutdowns]);

    const addWindow = useCallback(
        (key: string, element: JSX.Element) => {
            setWindows((prevState) => ({
                ...prevState,
                [key]: {
                    zIndex: Math.max(getHighestZIndex() + 1, 20),
                    minimized: false,
                    component: element,
                    name: APPLICATIONS[key].name,
                    icon: APPLICATIONS[key].shortcutIcon,
                },
            }));
        },
        [getHighestZIndex]
    );

    // Auto-open Portfolio Hub when landing on a deep showcase route (/contact, /projects…).
    useEffect(() => {
        if (!initialShowcase || showcaseAutoOpened) return;
        setShowcaseAutoOpened(true);
        const app = APPLICATIONS['showcase'];
        addWindow(
            'showcase',
            <app.component
                onInteract={() => onWindowInteract('showcase')}
                onMinimize={() => minimizeWindow('showcase')}
                onClose={() => removeWindow('showcase')}
                key="showcase"
            />
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addWindow, initialShowcase, showcaseAutoOpened]);

    return !shutdown ? (
        <div
            className={isMonitorMode ? 'desktop-shell monitor-calibrated' : 'desktop-shell'}
            style={Object.assign(
                {},
                styles.desktop,
                isMonitorMode && styles.monitorDesktop
            )}
        >
            <div className="desktop-wallpaper" />
            <div className="desktop-layout">
                <section className="desktop-home">
                    <div className="desktop-home__eyebrow">NOUR OS 2026</div>
                    <h1 className="desktop-home__title">{identity.brand}</h1>
                    <p className="desktop-home__subtitle">
                        {identity.shortTitle} — {identity.location}
                    </p>
                    <p className="desktop-home__bio">{identity.availability}</p>
                    <div className="desktop-home__stats">
                        {stats.map((stat) => (
                            <div className="desktop-home__stat" key={stat.label}>
                                <span>{stat.value}</span>
                                <small>{stat.label}</small>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="desktop-launchpad">
                    {shortcuts.map((shortcut) => (
                        <div
                            style={styles.shortcutContainer}
                            key={shortcut.shortcutName}
                        >
                            <DesktopShortcut
                                icon={shortcut.icon}
                                shortcutName={shortcut.shortcutName}
                                shortcutDescription={shortcut.shortcutDescription}
                                shortcutInitials={shortcut.shortcutInitials}
                                accent={shortcut.accent}
                                onOpen={shortcut.onOpen}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Windows — each wrapper is a 0×0 absolute anchor so it never
                affects the desktop layout; the Window itself floats freely. */}
            {Object.keys(windows).map((key) => {
                const element = windows[key].component;
                if (!element) return null;
                return (
                    <div
                        key={`win-${key}`}
                        style={Object.assign(
                            {},
                            styles.windowAnchor,
                            { zIndex: windows[key].zIndex },
                            windows[key].minimized && styles.minimized
                        )}
                    >
                        {React.cloneElement(element, {
                            key,
                            onInteract: () => onWindowInteract(key),
                            onClose: () => removeWindow(key),
                        })}
                    </div>
                );
            })}
            <Toolbar
                windows={windows}
                toggleMinimize={toggleMinimize}
                shutdown={startShutdown}
            />
        </div>
    ) : (
        <ShutdownSequence
            setShutdown={setShutdown}
            numShutdowns={numShutdowns}
        />
    );
};

const styles: StyleSheetCSS = {
    desktop: {
        minHeight: '100%',
        flex: 1,
        position: 'relative',
        overflow: 'visible',
    },
    monitorDesktop: {},
    shutdown: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: '#060b14',
    },
    shortcutContainer: {
        position: 'relative',
    },
    windowAnchor: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        overflow: 'visible',
    },
    minimized: {
        pointerEvents: 'none',
        opacity: 0,
    },
};

export default Desktop;
