import styled from 'styled-components'
import { Trophy, Sparkles } from 'lucide-react'
import { withOpacity } from '@/styles/theme'
import type { RewardData } from './types'

interface RewardCardProps {
  reward: RewardData
}

const Card = styled.div`
  padding: 20px;

  border-radius: 14px;

  border: 1px solid ${(p) =>
    withOpacity(p.theme.colors.signal, .25)};

  background: ${(p) =>
    withOpacity(p.theme.colors.signal, .06)};

  display: flex;
  flex-direction: column;
  gap: 18px;
`

const RewardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: ${(p) => p.theme.colors.signal};
  }
`

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;

  color: ${(p) =>
    p.theme.colors.signal};
`

const Description = styled.span`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  color: ${(p) =>
    withOpacity(p.theme.colors.paper, .85)};

  line-height: 1.6;

  svg {
    flex-shrink: 0;
    margin-top: 3px;

    color: ${(p) =>
      p.theme.colors.signal};
  }
`

export function RewardCard({
  reward,
}: RewardCardProps) {
  return (
    <Card>

      <RewardHeader>
        <Trophy size={26} />

        <Title>
          {reward.titulo}
        </Title>
      </RewardHeader>


      <Description>
        <Sparkles size={18} />

        <span>
          {reward.descricao}
        </span>
      </Description>

    </Card>
  )
}