const listeners: {
    [event: string]: Map<(...args: any[]) => any, EventListener>;
} = {};

const UIEventBus = {
    on(event: string, callback: (...args: any[]) => any) {
        const listener = ((e: CustomEvent) =>
            callback(e.detail)) as EventListener;
        if (!listeners[event]) listeners[event] = new Map();
        listeners[event].set(callback, listener);
        document.addEventListener(event, listener);
    },
    dispatch(event: string, data: any) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event: string, callback: (...args: any[]) => any) {
        const listener = listeners[event]?.get(callback);
        if (!listener) return;
        document.removeEventListener(event, listener);
        listeners[event].delete(callback);
    },
};

export default UIEventBus;
