import styled from 'styled-components'
import { Section, SectionTitle } from './styles'
import { withOpacity } from '@/styles/theme'

const Stack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

const Tech = styled.div`
  padding: 8px 14px;

  border-radius: 999px;

  border: 1px solid ${(p) =>
    withOpacity(p.theme.colors.signal, 0.25)};

  background: ${(p) =>
    withOpacity(p.theme.colors.signal, 0.08)};

  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;

  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};

  color: ${(p) => p.theme.colors.signal};

  transition:
    background .25s,
    border-color .25s,
    transform .25s;

  &:hover {
    transform: translateY(-2px);

    background: ${(p) =>
      withOpacity(p.theme.colors.signal, .14)};

    border-color: ${(p) =>
      p.theme.colors.signal};
  }
`

interface TechStackProps {
  stack: string[]
}

export function TechStack({
  stack,
}: TechStackProps) {

  return (
    <Section>

      <SectionTitle>
        Tecnologias
      </SectionTitle>

      <Stack>

        {stack.map((tech) => (
          <Tech key={tech}>
            {tech}
          </Tech>
        ))}

      </Stack>

    </Section>
  )
}