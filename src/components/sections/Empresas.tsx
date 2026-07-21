import styled from 'styled-components'
import { useGsapContext } from '@/hooks/useGsapContext'
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
  transition: background 320ms ease, border-color 320ms ease, box-shadow 320ms ease, transform 320ms ease;

  &:hover {
    transform: translateY(-2px);
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

const Stat = styled.span<{ $color: string }>`
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(4px);

  font-family: ${(p) => p.theme.font.mono};
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};
  color: ${(p) => p.$color};

  transition:
    max-height .3s ease,
    opacity .3s ease,
    transform .3s ease;

  ${Chip}:hover & {
    max-height: 16px;
    opacity: 1;
    transform: translateY(0);
  }
`

function EmpresaChip({ empresa }: { empresa: Empresa }) {

  return (
    <Chip className="empresa-chip" $color={empresa.cor}>
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

    if (reduce) return 

    gsap.utils.toArray<HTMLElement>('.empresa-chip').forEach((chip) => {
      gsap.to(chip, {
        y: gsap.utils.random(-3, 3),
        duration: gsap.utils.random(4, 6),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(0, 2),
      })
    })

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