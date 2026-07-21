import styled, { keyframes } from 'styled-components'
import { useGsapContext } from '@/hooks/useGsapContext'
import { useCardTilt } from '@/hooks/useCardTilt'
import { gsap } from '@/lib/gsap'
import { depoimentos } from '@/lib/content'
import type { Depoimento } from '@/types/content'
import { Container, SystemTag } from '@/components/ui/Shared'
import { withOpacity } from '@/styles/theme'

const ambientGlow = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
  50% { transform: translate(-45%, -55%) scale(1.2); opacity: 0.25; }
`

const pulseArrow = keyframes`
  0%, 100% { transform: translateX(0); opacity: 0.6; }
  50% { transform: translateX(4px); opacity: 1; }
`

const Section = styled.section`
  position: relative;
  overflow: hidden;
  border-top: 1px solid ${(p) => p.theme.colors.inkLine};
  background: ${(p) => p.theme.colors.ink};
  padding: 112px 0;

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    padding: 144px 0;
  }
`

const AmbientBackgroundGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, ${(p) => p.theme.colors.signal} 0%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
  z-index: 1;
  animation: ${ambientGlow} 12s ease-in-out infinite;
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`

const Title = styled.h2`
  margin-top: 16px;
  max-width: 640px;
  font-family: ${(p) => p.theme.font.display};
  font-size: 36px;
  line-height: 1.15;
  color: ${(p) => p.theme.colors.paper};

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    font-size: 48px;
  }
`

const Grid = styled.div`
  margin-top: 64px;
  display: grid;
  gap: 24px;

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  &:has(.depoimento-card:hover) .depoimento-card:not(:hover) {
    opacity: 0.45;
    filter: blur(2px) saturate(0.6);
  }
`

const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid ${(p) => p.theme.colors.inkLine};
  background: radial-gradient(
      500px circle at var(--mx, 50%) var(--my, 50%),
      ${(p) => withOpacity(p.theme.colors.signal, 0.1)},
      transparent 60%
    ),
    ${(p) => withOpacity(p.theme.colors.inkSoft, 0.7)};
  backdrop-filter: blur(12px);
  padding: 32px;
  will-change: transform;
  transition: opacity 400ms, filter 400ms, border-color 400ms, box-shadow 400ms;

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.03);

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    right: 16px;
    width: 24px;
    height: 2px;
    background: transparent;
    transition: background 300ms;
  }

  &:hover {
    border-color: ${(p) => withOpacity(p.theme.colors.signal, 0.4)};
    background: radial-gradient(
        500px circle at var(--mx, 50%) var(--my, 50%),
        ${(p) => withOpacity(p.theme.colors.signal, 0.14)},
        transparent 60%
      ),
      ${(p) => withOpacity(p.theme.colors.inkSoft, 0.9)};
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      inset 0 0 0 1px rgba(255, 255, 255, 0.03),
      0 24px 60px -20px ${(p) => withOpacity(p.theme.colors.signal, 0.25)};

    &::before {
      background: ${(p) => p.theme.colors.signal};
    }
  }
`

const QuoteMark = styled.span`
  position: absolute;
  top: 8px;
  left: 20px;
  font-family: ${(p) => p.theme.font.display};
  font-size: 96px;
  line-height: 1;
  color: ${(p) => withOpacity(p.theme.colors.signal, 0.08)};
  pointer-events: none;
  user-select: none;
`

const Quote = styled.p`
  position: relative;
  font-size: 17px;
  line-height: 1.7;
  font-style: italic;
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.85)};
`

const Footer = styled.div`
  margin-top: 32px;
  border-top: 1px solid ${(p) => p.theme.colors.inkLine};
  padding-top: 24px;
`

const Nome = styled.p`
  font-family: ${(p) => p.theme.font.display};
  font-size: 18px;
  color: ${(p) => p.theme.colors.paper};
`

const Cidade = styled.p`
  margin-top: 2px;
  font-family: ${(p) => p.theme.font.mono};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.3)};
`

const CargoRow = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;

  @media (min-width: ${(p) => p.theme.breakpoint.sm}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const Antes = styled.span`
  position: relative;
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.4)};

  &::before {
    content: 'FROM: ';
    font-size: 9px;
    opacity: 0.5;
  }
`

const CargoAtual = styled.span`
  color: ${(p) => p.theme.colors.paper};
  font-weight: 500;

  &::before {
    content: 'TO: ';
    font-size: 9px;
    color: ${(p) => p.theme.colors.signal};
  }
`

const SalarioRow = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  width: max-content;
  border-radius: 4px;
  border: 1px solid ${(p) => p.theme.colors.inkLine};
  background: ${(p) => withOpacity(p.theme.colors.ink, 0.5)};
  padding: 8px 12px;
  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
`

const SalarioAntes = styled.span`
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.3)};
  text-decoration: line-through;
`

const Seta = styled.span`
  display: inline-block;
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.3)};
  transition: color 300ms;

  ${Card}:hover & {
    color: ${(p) => p.theme.colors.signal};
    animation: ${pulseArrow} 0.8s ease-in-out infinite;
  }
`

const SalarioDepois = styled.span`
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.6)};
  font-weight: bold;
  transition: all 300ms;

  ${Card}:hover & {
    color: ${(p) => p.theme.colors.signal};
    text-shadow: 0 0 8px ${(p) => withOpacity(p.theme.colors.signal, 0.5)};
  }
`


function DepoimentoCard({ depoimento }: { depoimento: Depoimento }) {
  const tiltRef = useCardTilt<HTMLDivElement>(8)

  return (
    <Card ref={tiltRef} className="depoimento-card">
      <QuoteMark aria-hidden="true">"</QuoteMark>
      <Quote>{depoimento.texto}</Quote>

      <Footer>
        <Nome>{depoimento.nome}</Nome>
        <Cidade>{depoimento.cidade}</Cidade>

        <CargoRow>
          <Antes>{depoimento.antes}</Antes>
          <CargoAtual>
            {depoimento.cargoAtual} · {depoimento.empresaAtual}
          </CargoAtual>
        </CargoRow>

        <SalarioRow>
          <SalarioAntes>{depoimento.salarioAntes}</SalarioAntes>
          <Seta>→</Seta>
          <SalarioDepois>{depoimento.salarioDepois}</SalarioDepois>
        </SalarioRow>
      </Footer>
    </Card>
  )
}

export function Depoimentos() {
  const scope = useGsapContext<HTMLDivElement>(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = gsap.utils.toArray<HTMLElement>('.depoimento-card')
    const grid = document.querySelector<HTMLElement>('.depoimento-grid')

    if (reduce) {
      gsap.set(cards, { autoAlpha: 1 })
      return
    }

    if (!grid || cards.length === 0) return

    gsap.set(cards, {
      y: 70,
      scale: 0.92,
      rotationX: -12,
      transformPerspective: 800,
      filter: 'blur(14px)',
      autoAlpha: 0,
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        gsap.to(cards, {
          y: 0,
          scale: 1,
          rotationX: 0,
          filter: 'blur(0px)',
          autoAlpha: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power4.out',
        })

        // Só precisa dessa decisão uma vez — depois de revelado, não tem
        // motivo pra continuar observando.
        observer.disconnect()
      },
      { threshold: 0, rootMargin: '0px 0px -20% 0px' }
    )

    observer.observe(grid)

    return () => observer.disconnect()
  }, [])

  return (
    <Section ref={scope} id="depoimentos">
      <AmbientBackgroundGlow />

      <Container id="resultados">
        <ContentWrapper>
          <SystemTag>// prod_output_validation</SystemTag>
          <Title>Gente que trocou de vida em produção, não em teoria.</Title>

          <Grid className="depoimento-grid">
            {depoimentos.map((d) => (
              <DepoimentoCard key={d.id} depoimento={d} />
            ))}
          </Grid>
        </ContentWrapper>
      </Container>
    </Section>
  )
}