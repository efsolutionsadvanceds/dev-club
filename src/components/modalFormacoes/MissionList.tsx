import styled from 'styled-components'
import { Section, SectionTitle } from './styles'
import { withOpacity } from '@/styles/theme'

const List = styled.ul`
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 14px;

  list-style: none;
`

const Mission = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 14px;

  padding: 14px 16px;

  border-radius: 12px;

  border: 1px solid ${(p) => withOpacity(p.theme.colors.signal, 0.12)};

  background: ${(p) => withOpacity(p.theme.colors.signal, 0.04)};

  transition: .25s;

  &:hover {
    transform: translateX(6px);

    border-color: ${(p) => withOpacity(p.theme.colors.signal, .4)};

    background: ${(p) => withOpacity(p.theme.colors.signal, .08)};
  }
`

const Icon = styled.span`
  flex-shrink: 0;

  font-size: 18px;
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Title = styled.span`
  font-weight: 600;

  color: ${(p) => p.theme.colors.paper};
`

const Description = styled.span`
  font-size: 14px;
  line-height: 1.6;

  color: ${(p) => withOpacity(p.theme.colors.paper, .72)};
`

interface MissionItem {
  titulo: string
  descricao: string
}

interface MissionListProps {
  missions: MissionItem[]
}

export function MissionList({
  missions,
}: MissionListProps) {
  return (
    <Section>
      <SectionTitle>
        Missões do módulo
      </SectionTitle>

      <List>
        {missions.map((mission) => (
          <Mission key={mission.titulo}>
            <Icon>🎯</Icon>

            <Text>
              <Title>
                {mission.titulo}
              </Title>

              <Description>
                {mission.descricao}
              </Description>
            </Text>
          </Mission>
        ))}
      </List>
    </Section>
  )
}