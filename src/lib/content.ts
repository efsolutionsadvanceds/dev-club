import type { Formacao, Depoimento, Empresa, Tutor, Metrica } from '@/types/content'
import type { FormacaoModalData } from '@/components/modalFormacoes'

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

export const formacoesModal: FormacaoModalData[] = [
  {
    id: 1,
    codigo: '01',
    titulo: 'Fundamentos & Lógica',
    subtitulo: 'Seu primeiro checkpoint na jornada.',
    descricao:
      'Você aprenderá a pensar como um desenvolvedor antes mesmo de escrever grandes quantidades de código. Neste módulo você desenvolve raciocínio lógico, aprende JavaScript do zero e entende como funciona a base de qualquer software moderno.',

    duracao: '6 semanas',
    dificuldade: 1,
    xp: 350,

    habilidades: [
      'Pensamento lógico',
      'Algoritmos',
      'Variáveis',
      'Funções',
      'Condicionais',
      'Loops'
    ],

    stack: [
      'JavaScript',
      'Git',
      'Lógica de Programação'
    ],

    missoes: [
      {
        titulo: 'Primeiro Programa',
        descricao: 'Criar seu primeiro algoritmo funcionando.'
      },
      {
        titulo: 'Desafio de Lógica',
        descricao: 'Resolver problemas reais utilizando programação.'
      },
      {
        titulo: 'Versionamento',
        descricao: 'Aprender Git e publicar seu primeiro repositório.'
      }
    ],

    recompensa: {
      titulo: 'Base Desbloqueada',
      descricao:
        'Agora você possui a base necessária para construir qualquer aplicação.'
    },

    personagem: {
      nome: 'Duck Rookie',
      sprite: '/animation/duck-hero.json'
    }
  },

  {
    id: 2,
    codigo: '02',
    titulo: 'Front-end Profissional',
    subtitulo: 'Construindo interfaces reais.',
    descricao:
      'Você aprende React, TypeScript e arquitetura de componentes criando interfaces modernas iguais às utilizadas pelas maiores empresas do mercado.',

    duracao: '8 semanas',
    dificuldade: 2,
    xp: 700,

    habilidades: [
      'React',
      'Componentização',
      'Hooks',
      'Estado',
      'Responsividade',
      'Boas práticas'
    ],

    stack: [
      'React',
      'TypeScript',
      'Tailwind CSS'
    ],

    missoes: [
      {
        titulo: 'Landing Page',
        descricao: 'Construir uma landing page profissional.'
      },
      {
        titulo: 'Dashboard',
        descricao: 'Criar um painel administrativo completo.'
      },
      {
        titulo: 'Projeto Responsivo',
        descricao: 'Adaptar aplicações para qualquer dispositivo.'
      }
    ],

    recompensa: {
      titulo: 'Front-end Master',
      descricao:
        'Você estará preparado para desenvolver interfaces profissionais.'
    },

    personagem: {
      nome: 'Earth Builder',
      sprite: '/animation/earth-hero.json'
    }
  },

  {
    id: 3,
    codigo: '03',
    titulo: 'Back-end & APIs',
    subtitulo: 'O cérebro da aplicação.',
    descricao:
      'Você aprenderá a criar APIs, conectar banco de dados, autenticar usuários e estruturar aplicações robustas utilizadas em produção.',

    duracao: '8 semanas',
    dificuldade: 3,
    xp: 900,

    habilidades: [
      'Node.js',
      'Express',
      'Banco de Dados',
      'Autenticação',
      'JWT',
      'APIs REST'
    ],

    stack: [
      'Node.js',
      'PostgreSQL',
      'REST APIs'
    ],

    missoes: [
      {
        titulo: 'API Completa',
        descricao: 'Construir uma API REST profissional.'
      },
      {
        titulo: 'Login Seguro',
        descricao: 'Implementar autenticação JWT.'
      },
      {
        titulo: 'Banco de Dados',
        descricao: 'Persistir dados utilizando PostgreSQL.'
      }
    ],

    recompensa: {
      titulo: 'Backend Engineer',
      descricao:
        'Você domina a construção do servidor e da lógica de negócio.'
    },

    personagem: {
      nome: 'Loading Server Guardian',
      sprite: '/animation/loading-hero.json'
    }
  },

  {
    id: 4,
    codigo: '04',
    titulo: 'Empregabilidade & Mercado',
    subtitulo: 'Hora de entrar no jogo.',
    descricao:
      'Você aprenderá como montar um portfólio forte, preparar currículo, GitHub, LinkedIn e enfrentar entrevistas técnicas exatamente como acontecem nas empresas.',

    duracao: '4 semanas',
    dificuldade: 2,
    xp: 600,

    habilidades: [
      'Portfólio',
      'LinkedIn',
      'GitHub',
      'Currículo',
      'Entrevistas',
      'Soft Skills'
    ],

    stack: [
      'Portfólio',
      'Entrevista Técnica',
      'LinkedIn'
    ],

    missoes: [
      {
        titulo: 'Portfólio',
        descricao: 'Publicar seus melhores projetos.'
      },
      {
        titulo: 'LinkedIn',
        descricao: 'Criar um perfil competitivo.'
      },
      {
        titulo: 'Mock Interview',
        descricao: 'Simular entrevistas técnicas.'
      }
    ],

    recompensa: {
      titulo: 'Ready for Hire',
      descricao:
        'Você estará preparado para disputar vagas reais.'
    },

    personagem: {
      nome: 'Career Hero',
      sprite: "/animation/career-hero.json"
    }
  }
]