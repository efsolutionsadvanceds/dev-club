import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: auto; // Lenis assume o controle do scroll suave 
  }

  body {
    margin: 0;
    background: ${(p) => p.theme.colors.ink};
    color: ${(p) => p.theme.colors.paper};
    font-family: ${(p) => p.theme.font.body};
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, p {
    margin: 0;
  }

  ::selection {
    background: ${(p) => p.theme.colors.signal};
    color: ${(p) => p.theme.colors.ink};
  }

  /* Foco visível sempre */
  :focus-visible {
    outline: 2px solid ${(p) => p.theme.colors.signal};
    outline-offset: 4px;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /*
   Estilo dos caracteres de ruído do efeito TextScramble 
   (veja src/animations/textScramble.ts). Precisa ser global, não local a um
   styled-component, porque esses <span> são escritos direto via
   innerHTML, fora do controle do styled-components.
   */
  .scramble-noise {
    font-family: ${(p) => p.theme.font.mono};
    opacity: 0.5;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`