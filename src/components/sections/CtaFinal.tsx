import styled, { keyframes } from 'styled-components'
import { useGsapContext } from '@/hooks/useGsapContext'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { Container, SystemTag } from '@/components/ui/Shared'
import { withOpacity } from '@/styles/theme'
import { ParticleField } from '@/components/effects/ParticleField'

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`

const Section = styled.section`
  position: relative;
  overflow: hidden;
  border-top: 1px solid ${(p) => p.theme.colors.inkLine};
  background: ${(p) => p.theme.colors.inkSoft};
  padding: 128px 0;
`

const Grid = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.06;
  background-image: linear-gradient(${(p) => p.theme.colors.signal} 1px, transparent 1px),
    linear-gradient(90deg, ${(p) => p.theme.colors.signal} 1px, transparent 1px);
  background-size: 48px 48px;
`

const ParticleLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
`

const Inner = styled(Container)`
  position: relative;
  z-index: 2;
  text-align: center;
`

const Tag = styled(SystemTag)`
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
`

const Title = styled.h2`
  margin: 0 auto;
  max-width: 720px;
  font-family: ${(p) => p.theme.font.display};
  font-size: 36px;
  line-height: 1.15;
  color: ${(p) => p.theme.colors.paper};

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    font-size: 60px;
  }
`

const Sub = styled.p`
  margin: 24px auto 0;
  max-width: 520px;
  font-size: 18px;
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.6)};
`

/* Reprisa o visual do terminal do Hero (mesma linguagem), mas o conteúdo
   é outro: aqui é o "deploy" da carreira terminando em sucesso — fecha o
   loop narrativo que o Hero abriu. */
const Terminal = styled.div`
  margin: 48px auto 0;
  max-width: 520px;
  text-align: left;
  border-radius: 12px;
  border: 1px solid ${(p) => p.theme.colors.inkLine};
  background: ${(p) => withOpacity(p.theme.colors.ink, 0.7)};
  backdrop-filter: blur(6px);
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.6);
  overflow: hidden;
`

const TerminalBar = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 16px;
  border-bottom: 1px solid ${(p) => p.theme.colors.inkLine};
  background: ${(p) => withOpacity(p.theme.colors.ink, 0.4)};
`

const Dots = styled.div`
  display: flex;
  gap: 6px;
`

const Dot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(p) => p.$color};
`

const TerminalPath = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.35)};
`

const TerminalBody = styled.div`
  padding: 20px 24px;
  font-family: ${(p) => p.theme.font.mono};
  font-size: 13px;
  line-height: 1.9;
`

const LogPrompt = styled.p`
  color: ${(p) => withOpacity(p.theme.colors.signal, 0.9)};
`

const LogLine = styled.p<{ $muted?: boolean }>`
  color: ${(p) => withOpacity(p.theme.colors.paper, p.$muted ? 0.45 : 0.75)};
`

const LogSuccess = styled.p`
  margin-top: 8px;
  color: ${(p) => p.theme.colors.signal};
  font-weight: 600;
`

const LogUrl = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(p) => p.theme.colors.signal};

  &::after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 14px;
    background: ${(p) => p.theme.colors.signal};
    animation: ${blink} 1s step-end infinite;
  }
`

const ButtonRow = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`

export function CtaFinal() {
  const scope = useGsapContext<HTMLDivElement>(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      gsap.set(['.cta-reveal', '.cta-log-line', '.cta-button-pop'], { autoAlpha: 1 })
      return
    }

    // Coreografia em timeline única: título/tag entram, depois o log do
    // terminal "digita" linha por linha, e só então o botão aparece com
    // um leve "pop" elástico — o botão é literalmente a última coisa a
    // se revelar, reforçando que ele é a consequência do deploy acima.
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.cta-reveal', start: 'top 85%' },
    })

    tl.from('.cta-reveal', {
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    })
      .from(
        '.cta-log-line',
        {
          autoAlpha: 0,
          x: -12,
          duration: 0.35,
          stagger: 0.22,
          ease: 'power2.out',
        },
        '-=0.2'
      )
      .from(
        '.cta-button-pop',
        {
          scale: 0.7,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'back.out(2.2)',
        },
        '-=0.1'
      )
  }, [])

  return (
    <Section id="cta" ref={scope}>
      <Grid />
      <ParticleLayer>
        <ParticleField />
      </ParticleLayer>

      <Inner>
        <Tag className="cta-reveal">// próximo passo</Tag>
        <Title className="cta-reveal">Sua carreira em tech não vai começar sozinha.</Title>
        <Sub className="cta-reveal">
          Fala com a gente e entenda se o DevClub é o próximo passo certo pra você.
        </Sub>

        <Terminal className="cta-reveal">
          <TerminalBar>
            <Dots>
              <Dot $color="#FF5F56" />
              <Dot $color="#FFBD2E" />
              <Dot $color="#27C93F" />
            </Dots>
            <TerminalPath>zsh — ~/sua-carreira</TerminalPath>
          </TerminalBar>

          <TerminalBody>
            <LogPrompt className="cta-log-line">$ devclub deploy --carreira</LogPrompt>
            <LogLine className="cta-log-line" $muted>
              ▸ compilando seu potencial... ok
            </LogLine>
            <LogLine className="cta-log-line" $muted>
              ▸ rodando testes de mercado... 24/24 aprovados
            </LogLine>
            <LogLine className="cta-log-line" $muted>
              ▸ publicando seu currículo... ok
            </LogLine>
            <LogSuccess className="cta-log-line">✓ deploy concluído em 0.4s</LogSuccess>
            <LogUrl className="cta-log-line">→ status: pronto para contratação</LogUrl>
          </TerminalBody>
        </Terminal>

        <ButtonRow className="cta-button-pop">
          <Button>Quero começar agora</Button>
        </ButtonRow>
      </Inner>
    </Section>
  )
}