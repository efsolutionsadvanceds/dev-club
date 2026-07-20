import styled from 'styled-components'
import { useGsapContext } from '@/hooks/useGsapContext'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { TextScramble } from '@/animations/textScramble'
import { metricas } from '@/lib/content'
import { Container, SystemTag } from '@/components/ui/Shared'
import { withOpacity } from '@/styles/theme'

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

/**
 * Camada "aurora": dois blobs de luz borrada que derivam devagar pela
 * seção. Só anima `transform` (translate) — a única propriedade que o
 * navegador compõe direto na GPU sem recalcular layout ou repintar o blur.
 */
const AuroraLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`

const Blob = styled.div<{ $color: string }>`
  position: absolute;
  width: 60vw;
  height: 60vw;
  max-width: 900px;
  max-height: 900px;
  border-radius: 50%;
  background: radial-gradient(circle, ${(p) => p.$color} 0%, transparent 70%);
  filter: blur(90px);
  opacity: 0.18;
  will-change: transform;
`

const BlobA = styled(Blob)`
  top: -15%;
  left: -10%;
`

const BlobB = styled(Blob)`
  bottom: -20%;
  right: -12%;
`

/**
 * Camada "ticker": faixas de texto técnico deslizando sem parar, tipo
 * painel de LED — a mesma técnica de duas trilhas idênticas em loop que
 * já existe no marquee de `Empresas.tsx`, só que aqui em opacidade muito
 * baixa e atrás do conteúdo, pra dar o clima "telão passando" sem brigar
 * com a leitura do texto principal.
 */
const TickerLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`

const TickerRow = styled.div`
  position: absolute;
  display: flex;
  width: max-content;
  white-space: nowrap;
  gap: 48px;
  font-family: ${(p) => p.theme.font.mono};
`

const TickerRowA = styled(TickerRow)`
  top: 12%;
  font-size: 14px;
  color: ${(p) => withOpacity(p.theme.colors.signal, 0.1)};
`

const TickerRowB = styled(TickerRow)`
  top: 48%;
  font-size: 26px;
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.06)};
`

const TickerRowC = styled(TickerRow)`
  top: 82%;
  font-size: 14px;
  color: ${(p) => withOpacity(p.theme.colors.signal, 0.08)};
`

const TICKER_LINES = [
  'const carreira = await devclub.iniciar()',
  'git commit -m "feat: primeira vaga"',
  'SELECT * FROM alunos WHERE ativo = true;',
  'npm run deploy --prod',
  'status: 200 OK',
  'return <CarreiraTransformada />',
]

const Content = styled(Container)`
  position: relative;
  z-index: 1;
`

const Grid = styled.div`
  display: grid;
  gap: 64px;

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    grid-template-columns: 1fr 1.2fr;
  }
`

const Title = styled.h2`
  margin-top: 16px;
  font-family: ${(p) => p.theme.font.display};
  font-size: 36px;
  line-height: 1.15;
  color: ${(p) => p.theme.colors.paper};

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    font-size: 48px;
  }
`

const Accent = styled.span`
  color: ${(p) => p.theme.colors.signal};
`

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: 18px;
  line-height: 1.7;
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.7)};
`

const MetricsRow = styled.div`
  margin-top: 96px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  border-top: 1px solid ${(p) => p.theme.colors.inkLine};
  padding-top: 64px;

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const MetricValue = styled.div`
  font-family: ${(p) => p.theme.font.display};
  font-size: 36px;
  color: ${(p) => p.theme.colors.signal};

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    font-size: 48px;
  }
`

const MetricLabel = styled.p`
  margin-top: 8px;
  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.5)};
`

export function Sobre() {
  const scope = useGsapContext<HTMLDivElement>(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.from('.sobre-reveal', {
      y: 40,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.sobre-reveal',
        start: 'top 80%',
      },
    })

    // Métricas contam de 0 até o valor quando entram na tela. Lemos o
    // alvo numérico real de um atributo (não fazemos parsing de texto
    // formatado — evita bug de separador de milhar vs. decimal).
    document.querySelectorAll<HTMLElement>('.metric-value').forEach((el) => {
      const target = Number(el.dataset.target ?? 0)
      const decimals = Number(el.dataset.decimals ?? 0)
      const prefix = el.dataset.prefix ?? ''
      const suffix = el.dataset.suffix ?? ''

      const counter = { val: 0 }
      gsap.to(counter, {
        val: target,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
        onUpdate: () => {
          el.textContent = `${prefix}${counter.val.toFixed(decimals)}${suffix}`
        },
      })
    })

    // A partir daqui, só efeitos decorativos: pulam inteiro sob
    // reduced-motion. O reveal e a contagem de métricas acima continuam
    // rodando de qualquer forma, só sem o "tempero" visual.
    let scramble: TextScramble | null = null
    let rescrambleTimeout: number | undefined

    if (!reduce) {
      // Aurora: dois blobs derivando devagar, em loop infinito de ida e
      // volta — nunca param, nunca "batem" numa borda de forma abrupta.
      gsap.to('.aurora-blob-a', {
        x: 60,
        y: 40,
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.aurora-blob-b', {
        x: -50,
        y: -30,
        duration: 26,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Ticker: 3 faixas de texto técnico, duas indo pra um lado e uma
      // pro outro, em velocidades diferentes — é isso que cria a sensação
      // de profundidade/"telão" em vez de tudo deslizando junto e parecendo
      // uma única faixa repetida.
      gsap.to('.ticker-row-a', { xPercent: -50, duration: 40, repeat: -1, ease: 'none' })
      gsap.fromTo(
        '.ticker-row-b',
        { xPercent: -50 },
        { xPercent: 0, duration: 55, repeat: -1, ease: 'none' }
      )
      gsap.to('.ticker-row-c', { xPercent: -50, duration: 70, repeat: -1, ease: 'none' })

      // Parallax de profundidade: título e texto corrido se deslocam em
      // velocidades levemente diferentes conforme a seção passa pela tela.
      gsap.to('.sobre-title-block', {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
      gsap.to('.sobre-copy-block', {
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Scramble decode contínuo: mesma lógica do glitch do Hero — dispara
      // uma vez quando entra na tela, e depois se repete pra sempre com
      // uma pausa entre uma rajada e outra (não é ruído constante frame-a-
      // frame, que tornaria o texto ilegível).
      const scrambleEl = document.querySelector<HTMLElement>('.sobre-scramble')
      if (scrambleEl) {
        const originalText = scrambleEl.textContent ?? ''
        scramble = new TextScramble(scrambleEl)

        const loopScramble = () => {
          scramble?.setText(originalText).then(() => {
            rescrambleTimeout = window.setTimeout(loopScramble, 3500)
          })
        }

        ScrollTrigger.create({
          trigger: scrambleEl,
          start: 'top 85%',
          once: true,
          onEnter: loopScramble,
        })
      }
    }

    // Cleanup extra: mata o requestAnimationFrame do TextScramble e o
    // setTimeout do loop — recursos que o gsap.context não conhece
    // (ver useGsapContext.ts).
    return () => {
      scramble?.destroy()
      window.clearTimeout(rescrambleTimeout)
    }
  }, [])

  return (
    <Section ref={scope}>
      <AuroraLayer>
        <BlobA className="aurora-blob-a" $color="#4CFF7A" />
        <BlobB className="aurora-blob-b" $color="#FFB454" />
      </AuroraLayer>

      <TickerLayer>
        <TickerRowA className="ticker-row-a">
          {[...TICKER_LINES, ...TICKER_LINES].map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </TickerRowA>
        <TickerRowB className="ticker-row-b">
          {[...TICKER_LINES, ...TICKER_LINES].map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </TickerRowB>
        <TickerRowC className="ticker-row-c">
          {[...TICKER_LINES, ...TICKER_LINES].map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </TickerRowC>
      </TickerLayer>

      <Content>
        <Grid>
          <div className="sobre-title-block">
            <SystemTag className="sobre-reveal">// sobre o devclub</SystemTag>
            <Title className="sobre-reveal">
              Ensinamos código.
              <br />
              <Accent className="sobre-scramble">Formamos carreira.</Accent>
            </Title>
          </div>

          <Copy className="sobre-reveal sobre-copy-block">
            <p>
              O DevClub nasceu de uma pergunta simples: por que ainda se exige quatro anos de
              faculdade pra alguém entrar em tech, se o mercado contrata por código no GitHub,
              não por diploma na parede?
            </p>
            <p>
              Fundado por Rodolfo Mori — que trocou uma bancada de eletricista por uma cadeira
              de Dev Sênior — o DevClub existe pra encurtar esse caminho sem encurtar a
              qualidade. Trilha prática, projetos reais, e gente do mercado te acompanhando de
              perto até a primeira contratação.
            </p>
          </Copy>
        </Grid>

        <MetricsRow id="resultados">
          {metricas.map((m) => (
            <div key={m.id} className="sobre-reveal">
              <MetricValue
                className="metric-value"
                data-target={m.target}
                data-decimals={m.decimals ?? 0}
                data-prefix={m.prefix ?? ''}
                data-suffix={m.suffix ?? ''}
              >
                {m.prefix ?? ''}0{m.suffix ?? ''}
              </MetricValue>
              <MetricLabel>{m.label}</MetricLabel>
            </div>
          ))}
        </MetricsRow>
      </Content>
    </Section>
  )
}