import styled from 'styled-components'
import { Section, SectionTitle } from './styles'
import { withOpacity } from '@/styles/theme'

const Stars = styled.div`
  display: flex;
  gap: 8px;
`

const Star = styled.div<{ $active: boolean }>`
  width: 18px;
  height: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;

  color: ${(p) =>
    p.$active
      ? p.theme.colors.signal
      : withOpacity(p.theme.colors.paper, 0.18)};

  transition: .25s;

  text-shadow: ${(p) =>
    p.$active
      ? `0 0 10px ${withOpacity(p.theme.colors.signal, 0.55)}`
      : 'none'};
`

const Label = styled.span`
  margin-top: 10px;

  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;

  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};

  color: ${(p) => withOpacity(p.theme.colors.paper, .72)};
`

interface Props {
  level: 1 | 2 | 3 | 4 | 5
}

const labels = {
  1: 'Iniciante',
  2: 'Básico',
  3: 'Intermediário',
  4: 'Avançado',
  5: 'Especialista',
}

export function Difficulty({ level }: Props) {
  return (
    <Section>
      <SectionTitle>Dificuldade</SectionTitle>

      <Stars>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} $active={star <= level}>
            ★
          </Star>
        ))}
      </Stars>

      <Label>{labels[level]}</Label>
    </Section>
  )
}