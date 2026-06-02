const colors = {
    white: '#FFFFFF',
    black: '#000000',
    // Desktop background accent — emerald (tech / Africa).
    turquoise: '#00C896',
    lightGray: '#c3c6ca',
    darkGray: '#86898d',
    blue: '#0000a3',
    darkBlue: '#0000aa',
    red: '#ff0000',
    // Nour accent palette
    accentPrimary: '#00C896', // emerald green — tech, Africa
    accentSecondary: '#FF6B35', // warm orange — Chad, energy
    accentGlow: '#00C896', // WebGL shader glow
} as const;

export type ColorName = keyof typeof colors;
export type ThemeColor = typeof colors[ColorName];

export default colors;
