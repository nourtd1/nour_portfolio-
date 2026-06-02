import React, { useEffect, useRef, useState } from 'react';
import { IconName } from '../../assets/icons';
import Icon from '../general/Icon';
import DragIndicator from './DragIndicator';
import ResizeIndicator from './ResizeIndicator';

export interface WindowProps {
    closeWindow: () => void;
    minimizeWindow: () => void;
    onInteract: () => void;
    width: number;
    height: number;
    top: number;
    left: number;
    windowTitle?: string;
    bottomLeftText?: string;
    rainbow?: boolean;
    windowBarColor?: string;
    windowBarIcon?: IconName;
    onWidthChange?: (width: number) => void;
    onHeightChange?: (height: number) => void;
}

const Window: React.FC<WindowProps> = (props) => {
    const windowRef = useRef<any>(null);
    const dragRef = useRef<any>(null);
    const contentRef = useRef<any>(null);

    const dragProps = useRef<{
        dragStartX: any;
        dragStartY: any;
    }>();

    const resizeRef = useRef<any>(null);

    const [top, setTop] = useState(props.top);
    const [left, setLeft] = useState(props.left);

    const lastClickInside = useRef(false);

    const [width, setWidth] = useState(props.width);
    const [height, setHeight] = useState(props.height);

    const [contentWidth, setContentWidth] = useState(props.width);
    const [contentHeight, setContentHeight] = useState(props.height);

    const [windowActive, setWindowActive] = useState(true);

    const [isMaximized, setIsMaximized] = useState(false);
    const [preMaxSize, setPreMaxSize] = useState({
        width,
        height,
        top,
        left,
    });

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    const startResize = (event: any) => {
        event.preventDefault();
        setIsResizing(true);
        window.addEventListener('mousemove', onResize, false);
        window.addEventListener('mouseup', stopResize, false);
    };

    const onResize = ({ clientX, clientY }: any) => {
        const curWidth = clientX - left;
        const curHeight = clientY - top;
        if (curWidth > 520) resizeRef.current.style.width = `${curWidth}px`;
        if (curHeight > 220) resizeRef.current.style.height = `${curHeight}px`;
        resizeRef.current.style.opacity = 1;
    };

    const stopResize = () => {
        setIsResizing(false);
        setWidth(resizeRef.current.style.width);
        setHeight(resizeRef.current.style.height);
        resizeRef.current.style.opacity = 0;
        window.removeEventListener('mousemove', onResize, false);
        window.removeEventListener('mouseup', stopResize, false);
    };

    const startDrag = (event: any) => {
        const { clientX, clientY } = event;
        setIsDragging(true);
        event.preventDefault();
        dragProps.current = {
            dragStartX: clientX,
            dragStartY: clientY,
        };
        window.addEventListener('mousemove', onDrag, false);
        window.addEventListener('mouseup', stopDrag, false);
    };

    const onDrag = ({ clientX, clientY }: any) => {
        let { x, y } = getXYFromDragProps(clientX, clientY);
        dragRef.current.style.transform = `translate(${x}px, ${y}px)`;
        dragRef.current.style.opacity = 1;
    };

    const stopDrag = ({ clientX, clientY }: any) => {
        setIsDragging(false);
        // dragRef.current.style.opacity = 0;
        const { x, y } = getXYFromDragProps(clientX, clientY);
        setTop(y);
        setLeft(x);
        window.removeEventListener('mousemove', onDrag, false);
        window.removeEventListener('mouseup', stopDrag, false);
    };

    const getXYFromDragProps = (
        clientX: number,
        clientY: number
    ): { x: number; y: number } => {
        if (!dragProps.current) return { x: 0, y: 0 };
        const { dragStartX, dragStartY } = dragProps.current;

        const x = clientX - dragStartX + left;
        const y = clientY - dragStartY + top;

        return { x, y };
    };

    useEffect(() => {
        dragRef.current.style.transform = `translate(${left}px, ${top}px)`;
    });

    useEffect(() => {
        props.onWidthChange && props.onWidthChange(contentWidth);
    }, [props.onWidthChange, contentWidth]); // eslint-disable-line

    useEffect(() => {
        props.onHeightChange && props.onHeightChange(contentHeight);
    }, [props.onHeightChange, contentHeight]); // eslint-disable-line

    useEffect(() => {
        setContentWidth(contentRef.current.getBoundingClientRect().width);
    }, [width]);

    useEffect(() => {
        setContentHeight(contentRef.current.getBoundingClientRect().height);
    }, [height]);

    const maximize = () => {
        if (isMaximized) {
            setWidth(preMaxSize.width);
            setHeight(preMaxSize.height);
            setTop(preMaxSize.top);
            setLeft(preMaxSize.left);
            setIsMaximized(false);
        } else {
            setPreMaxSize({
                width,
                height,
                top,
                left,
            });
            setWidth(window.innerWidth);
            setHeight(window.innerHeight - 32);
            setTop(0);
            setLeft(0);
            setIsMaximized(true);
        }
    };

    const onCheckClick = () => {
        if (lastClickInside.current) {
            setWindowActive(true);
        } else {
            setWindowActive(false);
        }
        lastClickInside.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousedown', onCheckClick, false);
        return () => {
            window.removeEventListener('mousedown', onCheckClick, false);
        };
    }, []);

    const onWindowInteract = () => {
        props.onInteract();
        setWindowActive(true);
        lastClickInside.current = true;
    };

    return (
        <div onMouseDown={onWindowInteract} style={styles.container}>
            <div
                style={Object.assign({}, styles.window, {
                    width,
                    height,
                    top,
                    left,
                })}
                ref={windowRef}
            >
                <div
                    className={
                        windowActive ? 'window window--focused' : 'window'
                    }
                    style={styles.windowFill}
                >
                    <div
                        style={styles.dragHitbox}
                        onMouseDown={startDrag}
                    ></div>
                    <div
                        className={
                            props.rainbow
                                ? 'window__bar rainbow-wrapper'
                                : 'window__bar'
                        }
                        style={
                            props.windowBarColor
                                ? { backgroundColor: props.windowBarColor }
                                : undefined
                        }
                    >
                        <div style={styles.windowHeader}>
                            {props.windowBarIcon && (
                                <Icon
                                    icon={props.windowBarIcon}
                                    style={Object.assign(
                                        {},
                                        styles.windowBarIcon,
                                        !windowActive && { opacity: 0.5 }
                                    )}
                                    size={14}
                                />
                            )}
                            <p className="window__title">
                                {props.windowTitle}
                            </p>
                        </div>
                        <div style={styles.windowControls}>
                            <button
                                className="window__control"
                                onClick={props.minimizeWindow}
                                title="Minimize"
                            >
                                <span>−</span>
                            </button>
                            <button
                                className="window__control"
                                onClick={maximize}
                                title="Maximize"
                            >
                                <span>□</span>
                            </button>
                            <button
                                className="window__control window__control--close"
                                onClick={props.closeWindow}
                                title="Close"
                            >
                                <span>×</span>
                            </button>
                        </div>
                    </div>
                    <div className="window__body" style={styles.bodyReset}>
                        <div style={styles.content} ref={contentRef}>
                            {props.children}
                        </div>
                    </div>
                    <div
                        onMouseDown={startResize}
                        style={styles.resizeHitbox}
                    ></div>
                    <div className="window__footer">
                        <p className="window__footer-text">
                            {props.bottomLeftText}
                        </p>
                        <div style={styles.bottomResizeContainer}>
                            <Icon size={12} icon="windowResize" />
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={
                    !isResizing
                        ? {
                              zIndex: -10000,
                              pointerEvents: 'none',
                          }
                        : {
                              zIndex: 1000,
                              cursor: 'nwse-resize',
                              mixBlendMode: 'difference',
                          }
                }
            >
                <ResizeIndicator
                    top={top}
                    left={left}
                    width={width}
                    height={height}
                    resizeRef={resizeRef}
                />
            </div>
            <div
                style={
                    !isDragging
                        ? {
                              zIndex: -10000,
                              pointerEvents: 'none',
                          }
                        : {
                              zIndex: 1000,
                              cursor: 'move',
                              mixBlendMode: 'difference',
                          }
                }
            >
                <DragIndicator
                    width={width}
                    height={height}
                    dragRef={dragRef}
                />
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    window: {
        position: 'absolute',
    },
    windowFill: {
        flex: 1,
        flexDirection: 'column',
    },
    dragHitbox: {
        position: 'absolute',
        width: 'calc(100% - 230px)',
        height: 46,
        zIndex: 10000,
        top: 0,
        left: 120,
        cursor: 'move',
    },
    resizeHitbox: {
        position: 'absolute',
        width: 60,
        height: 60,
        bottom: -20,
        right: -20,
        cursor: 'nwse-resize',
        zIndex: 10001,
    },
    windowControls: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 2,
    },
    bodyReset: {
        padding: 0,
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'column',
    },
    content: {
        flex: 1,
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto',
    },
    bottomResizeContainer: {
        opacity: 0.4,
        alignItems: 'flex-end',
    },
    windowHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: 0,
    },
    windowBarIcon: {
        paddingRight: 6,
    },
};

export default Window;
