import styled, { keyframes } from 'styled-components'
import { useGsapContext } from '@/hooks/useGsapContext'
import { gsap } from '@/lib/gsap'
import { tutores } from '@/lib/content'
import { getInitials } from '@/lib/initials'
import { Container, SystemTag } from '@/components/ui/Shared'
import { withOpacity } from '@/styles/theme'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const pulseDot = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.7; }
  70% { transform: scale(2.2); opacity: 0; }
`

const Section = styled.section`
  border-top: 1px solid ${(p) => p.theme.colors.inkLine};
  background: ${(p) => p.theme.colors.ink};
  padding: 112px 0;

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    padding: 144px 0;
  }
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
  gap: 1px;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid ${(p) => p.theme.colors.inkLine};
  background: ${(p) => p.theme.colors.inkLine};
  grid-template-columns: 1fr;

  @media (min-width: ${(p) => p.theme.breakpoint.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${(p) => p.theme.breakpoint.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Card = styled.div`
  position: relative;
  background: ${(p) => p.theme.colors.ink};
  padding: 32px;
  transition: background 300ms, box-shadow 300ms;

  /* Borda interna que "acende" no hover — não mexe no gap da grid (que
     já simula as linhas divisórias), só sobrepõe um contorno colorido. */
  &:hover {
    background: ${(p) => withOpacity(p.theme.colors.inkSoft, 0.5)};
    box-shadow: inset 0 0 0 1px ${(p) => withOpacity(p.theme.colors.signal, 0.35)};
  }
`

const AvatarWrap = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  margin-bottom: 24px;
`

/* Anel de energia: um conic-gradient girando ao redor do avatar. Fica
   invisível até o hover — não é decoração de fundo contínua, é resposta
   à interação, o que é mais barato (só roda enquanto alguém está de
   fato olhando pra esse card específico) e mais elegante. */
const AvatarRing = styled.div`
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    ${(p) => p.theme.colors.signal} 15%,
    transparent 35%
  );
  opacity: 0;
  transition: opacity 300ms;

  ${Card}:hover & {
    opacity: 1;
    animation: ${spin} 2.2s linear infinite;
  }
`

const Avatar = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: ${(p) => p.theme.colors.inkSoft};
  border: 1px solid ${(p) => p.theme.colors.inkLine};
  font-family: ${(p) => p.theme.font.display};
  font-size: 18px;
  color: ${(p) => p.theme.colors.signal};
`

/* Indicador "disponível" — ponto verde com ripple pulsante, mesmo
   padrão visual de presença online que apps como Slack usam. Reforça
   que são mentores reais e ativos, não uma lista estática. */
const StatusDot = styled.span`
  position: absolute;
  bottom: 2px;
  right: 2px;
  z-index: 2;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(p) => p.theme.colors.signal};
  border: 2px solid ${(p) => p.theme.colors.ink};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: ${(p) => p.theme.colors.signal};
    animation: ${pulseDot} 2s ease-out infinite;
  }
`

const Nome = styled.h3`
  font-family: ${(p) => p.theme.font.display};
  font-size: 20px;
  color: ${(p) => p.theme.colors.paper};
`

const Cargo = styled.p`
  margin-top: 4px;
  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};
  color: ${(p) => withOpacity(p.theme.colors.signal, 0.7)};
`

const Especialidade = styled.p`
  margin-top: 16px;
  font-size: 14px;
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.6)};
`

export function Tutores() {
  const scope = useGsapContext<HTMLDivElement>(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      gsap.from('.tutor-card', {
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.08,
        scrollTrigger: { trigger: '.tutor-card', start: 'top 85%' },
      })
      return
    }

    // Entrada em "flip 3D": o card gira no eixo Y a partir da borda
    // esquerda (transformOrigin), como se estivesse abrindo — diferente
    // do blur-to-focus do Depoimentos.tsx, pra dar variedade de verdade
    // entre seções, não repetir a mesma assinatura em todo lugar.
    gsap.from('.tutor-card', {
      rotationY: -75,
      transformPerspective: 800,
      transformOrigin: '0% 50%',
      autoAlpha: 0,
      y: 16,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.tutor-card', start: 'top 85%' },
    })
  }, [])

  return (
    <Section id="tutores" ref={scope}>
      <Container>
        <SystemTag>// quem ensina</SystemTag>
        <Title>Gente que trabalha no mercado, não só fala sobre ele.</Title>

        <Grid>
          {tutores.map((t) => (
            <Card key={t.id} className="tutor-card">
              <AvatarWrap>
                <AvatarRing aria-hidden="true" />
                <Avatar>{getInitials(t.nome)}</Avatar>
                <StatusDot aria-hidden="true" />
              </AvatarWrap>
              <Nome>{t.nome}</Nome>
              <Cargo>
                {t.cargo} · {t.empresa}
              </Cargo>
              <Especialidade>{t.especialidade}</Especialidade>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}