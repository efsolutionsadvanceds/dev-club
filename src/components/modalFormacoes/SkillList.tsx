import styled from 'styled-components'
import { withOpacity } from '@/styles/theme'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const Title = styled.h3`
  margin: 0;

  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};

  color: ${(p) => p.theme.colors.signal};
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  margin: 0;
  padding: 0;

  list-style: none;
`

const Item = styled.li`
  padding: 8px 12px;

  border: 1px solid ${(p) =>
    withOpacity(p.theme.colors.signal, 0.25)};

  background: ${(p) =>
    withOpacity(p.theme.colors.signal, 0.08)};

  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
  color: ${(p) => p.theme.colors.paper};

  text-transform: uppercase;
`

interface SkillListProps {
  skills: string[]
}

export function SkillList({
  skills,
}: SkillListProps) {
  return (
    <Wrapper>
      <Title>Habilidades desbloqueadas</Title>

      <List>
        {skills.map((skill) => (
          <Item key={skill}>
            {skill}
          </Item>
        ))}
      </List>
    </Wrapper>
  )
}