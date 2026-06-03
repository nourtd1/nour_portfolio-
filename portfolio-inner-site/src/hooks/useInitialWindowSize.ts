export default function useInitialWindowSize({ margin }: { margin?: number }) {
    const m = margin || 0;
    return {
        initWidth:  window.innerWidth  - m,
        initHeight: window.innerHeight - m,
    };
}
