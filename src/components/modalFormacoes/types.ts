// src/components/modalFormacoes/types.ts

export interface MissionData {
  titulo: string
  descricao: string
}

export interface RewardData {
  titulo: string
  descricao: string
}

export interface CharacterData {
  nome: string
  sprite: string
}

export interface FormacaoModalData {
  id: number

  // Cabeçalho
  codigo: string
  titulo: string
  subtitulo: string
  descricao: string

  // Informações gerais
  duracao: string
  dificuldade: 1 | 2 | 3 | 4 | 5
  xp: number

  // Conteúdo
  habilidades: string[]
  stack: string[]
  missoes: MissionData[]

  // Recompensa
  recompensa: RewardData

  // Personagem
  personagem: CharacterData
}

export interface FormacaoModalProps {
  open: boolean
  formacao: FormacaoModalData | null
  onClose: () => void
}