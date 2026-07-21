export interface Formacao {
  id: string
  codigo: string // ex: "01" — usado como número do módulo, faz sentido pq é trilha sequencial
  titulo: string
  descricao: string
  stack: string[]
  duracao: string
}

export interface Depoimento {
  id: string
  nome: string
  cidade: string
  antes: string // profissão anterior — reforça a transformação de carreira
  empresaAtual: string
  cargoAtual: string
  texto: string
  salarioAntes: string
  salarioDepois: string
}

export interface Empresa {
  id: string
  nome: string
  cor: string
  alunosContratados: number
}

export interface Tutor {
  id: string
  nome: string
  cargo: string
  empresa: string
  especialidade: string
}

export interface Metrica {
  id: string
  /** Valor numérico puro, usado pra animar a contagem (ex: 12400) */
  target: number
  /** Quantas casas decimais mostrar ao formatar (ex: 1 pra "4.8") */
  decimals?: number
  /** Texto fixo antes/depois do número (ex: prefix "R$ ", suffix "+") */
  prefix?: string
  suffix?: string
  label: string
}