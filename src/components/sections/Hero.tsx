import { useState } from 'react'
import styled from 'styled-components'
import { useGsapContext } from '@/hooks/useGsapContext'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Shared'
import { withOpacity } from '@/styles/theme'
import { MatrixBackground } from '@/components/effects/MatrixBackground'

const COMMAND = 'devclub iniciar --carreira'

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: ${(p) => p.theme.colors.ink};
  padding: 128px 0 96px;
`

const Grid = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.07;
  background-image: linear-gradient(${(p) => p.theme.colors.signal} 1px, transparent 1px),
    linear-gradient(90deg, ${(p) => p.theme.colors.signal} 1px, transparent 1px);
  background-size: 48px 48px;
`

const Inner = styled(Container)`
  position: relative;
`

const Max = styled.div`
  max-width: 900px;
`

const CommandLine = styled.div`
  display: flex;
  align-items: center;
  font-family: ${(p) => p.theme.font.mono};
  font-size: 15px;
  color: ${(p) => withOpacity(p.theme.colors.signal, 0.8)};

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    font-size: 16px;
  }
`

const Prompt = styled.span`
  margin-right: 8px;
  user-select: none;
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.4)};
`

const Tilde = styled.span`
  margin-right: 8px;
  user-select: none;
  color: ${(p) => p.theme.colors.signal};
`

const TerminalCard = styled.div`
  border-radius: 12px;
  border: 1px solid ${(p) => p.theme.colors.inkLine};
  background: ${(p) => withOpacity(p.theme.colors.inkSoft, 0.6)};
  backdrop-filter: blur(6px);
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  margin-bottom: 40px;
`

const TitleBar = styled.div`
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

const Path = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.35)};
`

const Body = styled.div`
  padding: 20px 24px;
`

const CommandText = styled.span`
  display: inline-block;
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: bottom;
`


const Cursor = styled.span<{ $blinking: boolean }>`
  display: inline-block;
  margin-left: 4px;
  height: 20px;
  width: 10px;
  transform: translateY(2px);
  background: ${(p) => p.theme.colors.signal};
  animation: ${(p) => (p.$blinking ? 'blink 1s step-end infinite' : 'none')};

  @keyframes blink {
    0%,
    49% {
      opacity: 1;
    }
    50%,
    100% {
      opacity: 0;
    }
  }
`

const OutputWrap = styled.div`
  visibility: hidden;
  opacity: 0;
  transform: translateY(16px);
`

const Headline = styled.h1`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 300;
  line-height: 0.95;
  color: ${(p) => p.theme.colors.paper};
  font-size: 13vw;

  @media (min-width: ${(p) => p.theme.breakpoint.sm}) {
    font-size: 9vw;
  }
  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    font-size: 6.5vw;
  }
`

const Line = styled.span`
  display: block;
  visibility: hidden;
  opacity: 0;
  transform: translateY(24px);

  &.accent {
    color: ${(p) => p.theme.colors.signal};
    font-style: italic;
  }
`

const Sub = styled.p`
  visibility: hidden;
  opacity: 0;
  transform: translateY(24px);
  margin-top: 32px;
  max-width: 620px;
  font-size: 18px;
  line-height: 1.6;
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.7)};

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    font-size: 20px;
  }
`

const CtaRow = styled.div`
  visibility: hidden;
  opacity: 0;
  transform: translateY(16px);
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
`

const Meta = styled.div`
  visibility: hidden;
  opacity: 0;
  margin-top: 96px;
  display: flex;
  flex-wrap: wrap;
  gap: 40px 16px;
  border-top: 1px solid ${(p) => p.theme.colors.inkLine};
  padding-top: 32px;
  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.4)};
`

export function Hero() {
  const [typingDone, setTypingDone] = useState(false)

  const scope = useGsapContext<HTMLDivElement>(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      gsap.set(
        ['.hero-command', '.hero-output', '.hero-output-line', '.hero-cta', '.hero-meta'],
        { autoAlpha: 1, y: 0, width: '100%' }
      )
      setTypingDone(true)
      return
    }

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      onComplete: () => setTypingDone(true),
    })

    tl.to('.hero-command', {
      width: '100%',
      duration: COMMAND.length * 0.045,
    })
      .to('.hero-output', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.1')
      .to(
        '.hero-output-line',
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out' },
        '-=0.3'
      )
      .to('.hero-cta', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
      .to('.hero-meta', { autoAlpha: 1, duration: 0.6 }, '-=0.3')

    gsap.timeline({ repeat: -1, repeatDelay: 4, delay: 2 }).to('.accent', {
      keyframes: {
        textShadow: [
          '2px 0 #FF5F56, -2px 0 #4CFF7A',
          '-2px 0 #FF5F56, 2px 0 #4CFF7A',
          '0 0 transparent',
        ],
        x: [-2, 2, 0],
      },
      duration: 0.25,
      ease: 'none',
    })

    gsap.to('.hero-grid', {
      backgroundPosition: '+=48px +=96px',
      ease: 'none',
      scrollTrigger: {
        trigger: '#top',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  return (
    <Section id="top" ref={scope}>
      <Grid className="hero-grid" />
      <MatrixBackground />

      <Inner>
        <Max>
          <TerminalCard>
            <TitleBar>
              <Dots>
                <Dot $color="#FF5F56" />
                <Dot $color="#FFBD2E" />
                <Dot $color="#27C93F" />
              </Dots>
              <Path>zsh — ~/devclub</Path>
            </TitleBar>
            <Body>
              <CommandLine>
                <Prompt>➜</Prompt>
                <Tilde>~</Tilde>
                <CommandText className="hero-command">{COMMAND}</CommandText>
                <Cursor className="hero-cursor" $blinking={typingDone} />
              </CommandLine>
            </Body>
          </TerminalCard>

          <OutputWrap className="hero-output">
            <Headline>
              <Line className="hero-output-line">Você não precisa</Line>
              <Line className="hero-output-line accent">de faculdade.</Line>
              <Line className="hero-output-line">Precisa de um deploy.</Line>
            </Headline>
          </OutputWrap>

          <Sub className="hero-output-line">
            O DevClub forma programadores full stack prontos pro mercado — com trilha prática,
            mentoria de verdade e uma comunidade que te puxa até a primeira vaga.
          </Sub>

          <CtaRow className="hero-cta">
            <Button
              onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Quero minha vaga em tech
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                document.querySelector('#formacoes')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Ver formações
            </Button>
          </CtaRow>
        </Max>

        <Meta className="hero-meta">
          <span>exit_code: 0</span>
          <span>status: pronto_para_produção</span>
          <span aria-hidden={!typingDone}>build: sucesso</span>
        </Meta>
      </Inner>
    </Section>
  )
}