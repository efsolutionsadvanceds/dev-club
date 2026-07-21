export const theme = {
  colors: {
    ink: '#0A0B0A',
    inkSoft: '#111311',
    inkLine: '#1F231F',
    paper: '#EDEEE9',
    signal: '#4CFF7A',
    signalDim: '#2C9E4E',
    signalGlow: '#B8FFC8',
    amber: '#FFB454',
  },
  font: {
    display: `'Fraunces', serif`,
    body: `'Inter', sans-serif`,
    mono: `'JetBrains Mono', monospace`,
  },
  letterSpacingTag: '0.18em',
  maxWidth: '1240px',
  breakpoint: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
  },
} as const

export type Theme = typeof theme
export function withOpacity(hex: string, opacity: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
