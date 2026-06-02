import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../general';
// import { } from '../general';
// import Home from '../site/Home';
// import Window from './Window';

export interface ToolbarProps {
    windows: DesktopWindows;
    toggleMinimize: (key: string) => void;
    shutdown: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
    windows,
    toggleMinimize,
    shutdown,
}) => {
    const getTime = () => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        let mins = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + mins + ' ' + amPm;
        return strTime;
    };

    const [startWindowOpen, setStartWindowOpen] = useState(false);
    const lastClickInside = useRef(false);

    const [lastActive, setLastActive] = useState('');

    useEffect(() => {
        let max = 0;
        let k = '';
        Object.keys(windows).forEach((key) => {
            if (windows[key].zIndex >= max) {
                max = windows[key].zIndex;
                k = key;
            }
        });
        setLastActive(k);
    }, [windows]);

    const [time, setTime] = useState(getTime());

    useEffect(() => {
        const updateTime = () => {
            setTime(getTime());
        };

        updateTime();
        const interval = setInterval(updateTime, 5000);
        return () => clearInterval(interval);
    }, []);

    const onCheckClick = () => {
        if (lastClickInside.current) {
            setStartWindowOpen(true);
        } else {
            setStartWindowOpen(false);
        }
        lastClickInside.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousedown', onCheckClick, false);
        return () => {
            window.removeEventListener('mousedown', onCheckClick, false);
        };
    }, []);

    const onStartWindowClicked = () => {
        setStartWindowOpen(true);
        lastClickInside.current = true;
    };

    const toggleStartWindow = () => {
        if (!startWindowOpen) {
            lastClickInside.current = true;
        } else {
            lastClickInside.current = false;
        }
    };

    return (
        <div className="taskbar">
            {startWindowOpen && (
                <div
                    onMouseDown={onStartWindowClicked}
                    className="taskbar__startmenu"
                >
                    <div
                        className="start-menu-option taskbar__startmenu-option"
                        onMouseDown={shutdown}
                    >
                        <Icon style={styles.startMenuIcon} icon="computerBig" />
                        <span className="taskbar__startmenu-text">
                            Power off
                        </span>
                    </div>
                </div>
            )}
            <div
                className={
                    startWindowOpen
                        ? 'taskbar__start taskbar__start--active'
                        : 'taskbar__start'
                }
                onMouseDown={toggleStartWindow}
            >
                <span className="taskbar__logo">N</span>
                <span className="taskbar__brand">Nour OS</span>
            </div>

            <span className="taskbar__sep" />

            <div className="taskbar__tabs">
                {Object.keys(windows).length === 0 ? (
                    <span className="taskbar__status">online</span>
                ) : (
                    Object.keys(windows).map((key) => {
                        const isActive =
                            lastActive === key && !windows[key].minimized;
                        return (
                            <div
                                key={key}
                                className={
                                    isActive
                                        ? 'taskbar__tab taskbar__tab--active'
                                        : 'taskbar__tab'
                                }
                                onMouseDown={() => toggleMinimize(key)}
                            >
                                <Icon
                                    size={16}
                                    icon={windows[key].icon}
                                    style={styles.tabIcon}
                                />
                                <span className="taskbar__tab-text">
                                    {windows[key].name}
                                </span>
                            </div>
                        );
                    })
                )}
            </div>

            <span className="taskbar__sep" />

            <div className="taskbar__time">
                <span className="taskbar__meta">{time}</span>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    startMenuIcon: {
        width: 22,
        height: 22,
    },
    tabIcon: {
        marginRight: 8,
    },
};

export default Toolbar;
