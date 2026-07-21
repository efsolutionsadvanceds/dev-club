import type { ReactNode } from 'react'
import { Window } from './styles'

interface ModalWindowProps {
  children: ReactNode
}

export function ModalWindow({ children }: ModalWindowProps) {
  return <Window>{children}</Window>
}
