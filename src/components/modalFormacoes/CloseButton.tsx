import styled from 'styled-components'
import { X } from 'lucide-react'
import { withOpacity } from '@/styles/theme'

const Button = styled.button`
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  border: 1px solid ${(p) => withOpacity(p.theme.colors.paper, .12)};
  background: transparent;

  color: ${(p) => p.theme.colors.paper};

  transition:
    background .25s,
    border-color .25s,
    transform .25s;

  &:hover {
    background: ${(p) => withOpacity(p.theme.colors.signal, .08)};
    border-color: ${(p) => p.theme.colors.signal};
    transform: rotate(90deg);
  }
`

interface Props {
  onClick(): void
}

export function CloseButton({ onClick }: Props) {
  return (
    <Button onClick={onClick}>
      <X size={18} />
    </Button>
  )
}