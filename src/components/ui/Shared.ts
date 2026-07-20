import styled from 'styled-components'

export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: ${(p) => p.theme.maxWidth};
  padding: 0 24px;

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    padding: 0 40px;
  }
`

export const SystemTag = styled.p`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};
  color: ${(p) => p.theme.colors.signal};
`
