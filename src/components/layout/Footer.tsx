import styled from 'styled-components'
import { Container } from '@/components/ui/Shared'
import { withOpacity } from '@/styles/theme'

const StyledFooter = styled.footer`
  border-top: 1px solid ${(p) => p.theme.colors.inkLine};
  background: ${(p) => p.theme.colors.ink};
  padding: 48px 0;
`

const Row = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    flex-direction: row;
  }
`

const Brand = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 14px;
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.5)};

  span {
    color: ${(p) => p.theme.colors.signal};
  }
`

const Credit = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.3)};
`

export function Footer() {
  return (
    <StyledFooter>
      <Row>
        <Brand>
          devclub<span>/&gt;</span> © {new Date().getFullYear()}
        </Brand>
        <Credit>feito com react, typescript e styled-components</Credit>
      </Row>
    </StyledFooter>
  )
}
