import styled from 'styled-components'
import { withOpacity } from '@/styles/theme'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Label = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.7)};
`

const XP = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
  font-weight: 700;
  color: ${(p) => p.theme.colors.signal};
`

const Track = styled.div`
  height: 10px;
  border-radius: 999px;
  overflow: hidden;

  background: ${(p) => withOpacity(p.theme.colors.paper, 0.08)};
  border: 1px solid ${(p) => withOpacity(p.theme.colors.signal, 0.18)};
`

const Fill = styled.div<{ $value: number }>`
  width: ${(p) => p.$value}%;
  height: 100%;

  border-radius: inherit;

  background: linear-gradient(
    90deg,
    ${(p) => p.theme.colors.signal},
    ${(p) => p.theme.colors.signalGlow}
  );
`

interface ProgressXPProps {
  value: number
}

export function ProgressXP({
  value,
}: ProgressXPProps) {
  return (
    <Wrapper>
      <LabelRow>
        <Label>Experiência</Label>
        <XP>+{value} XP</XP>
      </LabelRow>

      <Track>
        <Fill $value={Math.min(value / 10, 100)} />
      </Track>
    </Wrapper>
  )
}