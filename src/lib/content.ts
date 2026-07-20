import type { Formacao, Depoimento, Empresa, Tutor, Metrica } from '@/types/content'

export const metricas: Metrica[] = [
  { id: 'm1', target: 12400, suffix: '+', label: 'alunos ativos' },
  { id: 'm2', target: 340, suffix: '+', label: 'empresas parceiras' },
  { id: 'm3', target: 89, suffix: '%', label: 'empregados em até 12 meses' },
  { id: 'm4', target: 4.8, decimals: 1, suffix: '/5', label: 'nota média da formação' },
]

export const formacoes: Formacao[] = [
  {
    id: 'f1',
    codigo: '01',
    titulo: 'Fundamentos & Lógica',
    descricao:
      'Do zero ao primeiro programa rodando. Lógica, JavaScript e a base que sustenta tudo o que vem depois.',
    stack: ['JavaScript', 'Git', 'Lógica de Programação'],
    duracao: '6 semanas',
  },
  {
    id: 'f2',
    codigo: '02',
    titulo: 'Front-end Profissional',
    descricao:
      'Interfaces reais, componentizadas e responsivas. React do jeito que o mercado usa, não do jeito de curso.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    duracao: '8 semanas',
  },
  {
    id: 'f3',
    codigo: '03',
    titulo: 'Back-end & APIs',
    descricao:
      'Servidor, banco de dados e autenticação. Você constrói a API que sustenta o front que já sabe fazer.',
    stack: ['Node.js', 'PostgreSQL', 'REST APIs'],
    duracao: '8 semanas',
  },
  {
    id: 'f4',
    codigo: '04',
    titulo: 'Empregabilidade & Mercado',
    descricao:
      'Portfólio, GitHub, entrevista técnica e posicionamento. A parte que os outros cursos esquecem de ensinar.',
    stack: ['Portfólio', 'Entrevista Técnica', 'LinkedIn'],
    duracao: '4 semanas',
  },
]

export const depoimentos: Depoimento[] = [
  {
    id: 'd1',
    nome: 'Camila Duarte',
    cidade: 'Recife, PE',
    antes: 'Auxiliar administrativa',
    empresaAtual: 'Nubank',
    cargoAtual: 'Dev Front-end Jr.',
    salarioAntes: 'R$ 1.900',
    salarioDepois: 'R$ 5.400',
    texto:
      'Eu não sabia o que era uma variável sete meses atrás. Hoje reviso PR de gente que tem faculdade em Ciência da Computação.',
  },
  {
    id: 'd2',
    nome: 'Thiago Almeida',
    cidade: 'Uberlândia, MG',
    antes: 'Motorista de aplicativo',
    empresaAtual: 'Stone',
    cargoAtual: 'Dev Full Stack',
    salarioAntes: 'R$ 2.200',
    salarioDepois: 'R$ 7.800',
    texto:
      'O que me pegou não foi o código. Foi ter alguém cobrando entrega toda semana. Isso me tirou da zona de conforto rápido.',
  },
  {
    id: 'd3',
    nome: 'Bianca Ferreira',
    cidade: 'Porto Alegre, RS',
    antes: 'Professora de inglês',
    empresaAtual: 'iFood',
    cargoAtual: 'Dev Back-end Jr.',
    salarioAntes: 'R$ 2.800',
    salarioDepois: 'R$ 6.200',
    texto:
      'Troquei de carreira aos 34. Achei que era tarde. Hoje sei que o único atraso real seria não ter começado.',
  },
]

export const empresas: Empresa[] = [
  { id: 'e1', nome: 'Nubank', cor: '#A855F7', alunosContratados: 340 },
  { id: 'e2', nome: 'Stone', cor: '#00B368', alunosContratados: 210 },
  { id: 'e3', nome: 'iFood', cor: '#EA1D2C', alunosContratados: 185 },
  { id: 'e4', nome: 'Mercado Livre', cor: '#FFD100', alunosContratados: 260 },
  { id: 'e5', nome: 'Santander', cor: '#EC7000', alunosContratados: 150 },
  { id: 'e6', nome: 'BTG Pactual', cor: '#3B5FE0', alunosContratados: 120 },
  { id: 'e7', nome: 'Totvs', cor: '#00C2D1', alunosContratados: 95 },
  { id: 'e8', nome: 'Loft', cor: '#6C63FF', alunosContratados: 80 },
  { id: 'e9', nome: 'QuintoAndar', cor: '#FF6B4A', alunosContratados: 130 },
  { id: 'e10', nome: 'Toro Investimentos', cor: '#00D4A0', alunosContratados: 70 },
]

export const tutores: Tutor[] = [
  {
    id: 't1',
    nome: 'Rafael Nogueira',
    cargo: 'Tech Lead',
    empresa: 'ex-Nubank',
    especialidade: 'Front-end & Arquitetura React',
  },
  {
    id: 't2',
    nome: 'Juliana Prado',
    cargo: 'Engenheira de Software',
    empresa: 'ex-Mercado Livre',
    especialidade: 'Back-end & Banco de Dados',
  },
  {
    id: 't3',
    nome: 'Diego Salles',
    cargo: 'Staff Engineer',
    empresa: 'ex-Stone',
    especialidade: 'APIs & Escalabilidade',
  },
  {
    id: 't4',
    nome: 'Marina Costa',
    cargo: 'Head de Carreira',
    empresa: 'ex-Gupy',
    especialidade: 'Empregabilidade & RH Tech',
  },
]