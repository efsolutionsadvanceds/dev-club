import styled from 'styled-components'
import { useGsapContext } from '@/hooks/useGsapContext'
import { useMagnetic } from '@/hooks/useMagnetic'
import { gsap } from '@/lib/gsap'
import { empresas } from '@/lib/content'
import type { Empresa } from '@/types/content'
import { getInitials } from '@/lib/initials'
import { Container, SystemTag } from '@/components/ui/Shared'
import { withOpacity } from '@/styles/theme'

const Section = styled.section`
  position: relative;
  overflow: hidden;
  border-top: 1px solid ${(p) => p.theme.colors.inkLine};
  background: ${(p) => p.theme.colors.inkSoft};
  padding: 96px 0;
`

/* Spotlight autônomo: um brilho suave que percorre um caminho elíptico
   sozinho, sem depender do cursor — dá uma "respiração" contínua pro
   fundo da nuvem de empresas. Reaproveita a mesma técnica de variável CSS
   do spotlight de Depoimentos.tsx, só que aqui quem move é o GSAP, não
   o mouse. */
const SpotlightLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
    420px circle at var(--sx, 30%) var(--sy, 50%),
    ${(p) => withOpacity(p.theme.colors.signal, 0.08)},
    transparent 70%
  );
`

const Header = styled(Container)`
  position: relative;
  z-index: 1;
  margin-bottom: 48px;
`

const Cloud = styled(Container)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`

const Chip = styled.div<{ $color: string }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: 999px;
  border: 1px solid ${(p) => p.theme.colors.inkLine};
  background: ${(p) => withOpacity(p.theme.colors.ink, 0.4)};
  will-change: transform;
  transition: border-color 300ms, box-shadow 300ms, background 300ms;

  &:hover {
    border-color: ${(p) => withOpacity(p.$color, 0.6)};
    background: ${(p) => withOpacity(p.theme.colors.ink, 0.7)};
    box-shadow: 0 12px 30px -10px ${(p) => withOpacity(p.$color, 0.35)};
  }
`

const Avatar = styled.div<{ $color: string }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${(p) => withOpacity(p.$color, 0.5)};
  background: ${(p) => withOpacity(p.$color, 0.15)};
  font-family: ${(p) => p.theme.font.mono};
  font-size: 11px;
  font-weight: 600;
  color: ${(p) => p.$color};
`

const TextCol = styled.div`
  display: flex;
  flex-direction: column;
`

const Nome = styled.span`
  font-family: ${(p) => p.theme.font.display};
  font-size: 16px;
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.85)};
`

/* A estatística fica "recolhida" (max-height: 0) e só aparece no hover —
   é o "algo mais aprofundado" pedido: cada chip guarda uma informação
   extra que só se revela quando você presta atenção nele. */
const Stat = styled.span<{ $color: string }>`
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  font-family: ${(p) => p.theme.font.mono};
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};
  color: ${(p) => p.$color};
  transition: max-height 300ms ease, opacity 300ms ease;

  ${Chip}:hover & {
    max-height: 16px;
    opacity: 1;
  }
`

/**
 * Cada chip é seu próprio componente pelo mesmo motivo do DepoimentoCard
 * (ver Depoimentos.tsx): `useMagnetic` é um hook, e chamá-lo dentro do
 * `.map()` do pai quebraria as Rules of Hooks.
 */
function EmpresaChip({ empresa }: { empresa: Empresa }) {
  const ref = useMagnetic<HTMLDivElement>(0.25)

  return (
    <Chip ref={ref} className="empresa-chip" $color={empresa.cor}>
      <Avatar $color={empresa.cor}>{getInitials(empresa.nome)}</Avatar>
      <TextCol>
        <Nome>{empresa.nome}</Nome>
        <Stat $color={empresa.cor}>{empresa.alunosContratados} alunos contratados</Stat>
      </TextCol>
    </Chip>
  )
}

export function Empresas() {
  const scope = useGsapContext<HTMLDivElement>(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Entrada: sempre roda, mesmo sob reduced-motion (é conteúdo aparecendo,
    // não decoração contínua — mesmo critério usado nas outras seções).
    gsap.from('.empresa-chip', {
      y: 30,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.empresa-chip', start: 'top 90%' },
    })

    if (reduce) return // sem flutuação nem spotlight autônomo

    // Flutuação contínua e independente por chip — cada um com sua
    // própria amplitude/duração/atraso aleatórios, pra não parecer uma
    // onda sincronizada (que voltaria a parecer "uma linha se repetindo",
    // exatamente o que você pediu pra evitar).
    gsap.utils.toArray<HTMLElement>('.empresa-chip').forEach((chip) => {
      gsap.to(chip, {
        y: gsap.utils.random(-6, 6),
        duration: gsap.utils.random(2.5, 4.5),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(0, 2),
      })
    })

    // Spotlight autônomo: percorre um caminho elíptico contínuo, sozinho —
    // não depende do cursor. É a "profundidade" constante que substitui
    // a ideia de linha repetindo.
    const spotlightEl = document.querySelector<HTMLElement>('.empresas-spotlight')
    if (spotlightEl) {
      const spotlight = { angle: 0 }
      gsap.to(spotlight, {
        angle: Math.PI * 2,
        duration: 18,
        repeat: -1,
        ease: 'none',
        onUpdate: () => {
          const x = 50 + Math.cos(spotlight.angle) * 35
          const y = 50 + Math.sin(spotlight.angle) * 30
          spotlightEl.style.setProperty('--sx', `${x}%`)
          spotlightEl.style.setProperty('--sy', `${y}%`)
        },
      })
    }
  }, [])

  return (
    <Section id="empresas" ref={scope}>
      <SpotlightLayer className="empresas-spotlight" />

      <Header>
        <SystemTag>// onde nossos alunos trabalham hoje</SystemTag>
      </Header>

      <Cloud>
        {empresas.map((e) => (
          <EmpresaChip key={e.id} empresa={e} />
        ))}
      </Cloud>
    </Section>
  )
}