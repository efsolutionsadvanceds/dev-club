// src/components/modalFormacoes/styles.ts

import styled from 'styled-components'
import { withOpacity } from '@/styles/theme'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;

  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(10px);
`

export const Window = styled.div`
  position: relative;

  width: min(980px, 100%);
  max-height: 90vh;

  overflow: hidden;
  overflow-y: auto;

  border: 1px solid ${(p) => withOpacity(p.theme.colors.signal, 0.25)};
  border-radius: 18px;

  background: ${(p) => withOpacity(p.theme.colors.ink, 0.98)};

  box-shadow:
    0 0 0 1px ${(p) => withOpacity(p.theme.colors.signal, 0.08)},
    0 30px 80px rgba(0, 0, 0, 0.55);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(p) => withOpacity(p.theme.colors.signal, 0.35)};
    border-radius: 999px;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 22px 28px;

  border-bottom: 1px solid ${(p) => p.theme.colors.inkLine};
`

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Level = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;

  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};

  color: ${(p) => p.theme.colors.signal};
`

export const Title = styled.h2`
  margin: 0;

  font-family: ${(p) => p.theme.font.display};
  font-size: 28px;
  line-height: 1.2;

  color: ${(p) => p.theme.colors.paper};
`

export const Body = styled.div`
  padding: 32px;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 36px;

  @media (max-width: ${(p) => p.theme.breakpoint.md}) {
    grid-template-columns: 1fr;
  }
`

export const Left = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const SectionTitle = styled.h3`
  margin: 0;

  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;

  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};

  color: ${(p) => p.theme.colors.signal};
`

export const Description = styled.p`
  margin: 0;

  line-height: 1.8;

  color: ${(p) => withOpacity(p.theme.colors.paper, 0.75)};
`