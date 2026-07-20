import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Shared'
import { withOpacity } from '@/styles/theme'

const NAV_ITEMS = [
  { label: 'formações', href: '#formacoes' },
  { label: 'resultados', href: '#resultados' },
  { label: 'empresas', href: '#empresas' },
  { label: 'tutores', href: '#tutores' },
]

const Bar = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  inset-inline: 0;
  top: 0;
  z-index: 50;
  transition: background-color 500ms, border-color 500ms;
  backdrop-filter: ${(p) => (p.$scrolled ? 'blur(12px)' : 'none')};

  ${(p) =>
    p.$scrolled
      ? css`
          background: ${withOpacity(p.theme.colors.ink, 0.9)};
          border-bottom: 1px solid ${p.theme.colors.inkLine};
        `
      : css`
          background: transparent;
        `}
`

const Row = styled(Container)`
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.a`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 18px;
  font-weight: 600;
  color: ${(p) => p.theme.colors.paper};

  span {
    color: ${(p) => p.theme.colors.signal};
  }
`

const Nav = styled.nav`
  display: none;
  align-items: center;
  gap: 32px;

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    display: flex;
  }
`

const NavLink = styled.a`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.7)};
  transition: color 300ms;

  &:hover {
    color: ${(p) => p.theme.colors.signal};
  }
`

const NavButton = styled(Button)`
  padding: 10px 20px;
  font-size: 12px;
`

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  // Header ganha fundo sólido só depois que o usuário sai do hero —
  // no topo ele fica transparente pra não competir com a animação do terminal.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Bar $scrolled={scrolled}>
      <Row>
        <Logo href="#top">
          devclub<span>/&gt;</span>
        </Logo>

        <Nav>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </Nav>

        <NavButton
          variant="ghost"
          onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Quero minha vaga
        </NavButton>
      </Row>
    </Bar>
  )
}
