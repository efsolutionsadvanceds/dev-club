# DevClub — Página Institucional

Projeto pro desafio da vaga de Programador(a) Full Stack do DevClub.

## Stack

- **React 18 + TypeScript** — tipagem em todo o conteúdo (`src/types/content.ts`), zero `any`.
- **Vite** — build tool.
- **Styled-Components** — estilos co-localizados por componente, tema tipado (`src/styles/theme.ts`).
- **GSAP + ScrollTrigger** — todas as animações orquestradas (timing, stagger, scroll reveal).
- **Lenis** — smooth scroll, sincronizado com o ticker do GSAP pra não dessincronizar as animações no scroll.
- **Yarn** — gerenciador de pacotes.

## Rodando localmente

```bash
yarn install
yarn dev
```

Abre em `http://localhost:5173`.

Build de produção:

```bash
yarn build
yarn preview
```

## Estrutura

```
src/
  components/
    layout/     -> Header, Footer
    sections/   -> Hero, Sobre, Formacoes, Depoimentos, Empresas, Tutores, CtaFinal
    ui/         -> Button, Shared (Container, SystemTag)
  hooks/
    useLenis.ts        -> inicializa o smooth scroll
    useGsapContext.ts  -> escopa e limpa animações GSAP por componente
    useMagnetic.ts      -> efeito magnético do CTA principal
  lib/
    gsap.ts      -> registro único do plugin ScrollTrigger
    content.ts   -> dados fictícios (alunos, empresas, tutores, métricas)
  styles/
    theme.ts       -> design tokens (cor, tipografia, breakpoints)
    GlobalStyle.ts  -> reset e estilos globais
    styled.d.ts     -> tipagem do tema pro styled-components
  types/
    content.ts  -> interfaces do conteúdo
```

## Decisões (pra defender na entrevista)

- **Terminal digitando no hero**: elemento de assinatura da página. Conecta forma
  e conteúdo — o produto ensina a programar, então a primeira coisa que a pessoa
  vê é código "rodando" na tela, revelando o headline como se fosse output real
  de um comando. Feito animando `width` de um `<span>` com `overflow: hidden`,
  não `setState` em loop (mais barato, sem re-render a cada caractere).
- **Numeração 01–04 nas formações**: só existe porque é uma trilha real e
  sequencial (módulo 2 depende do 1). Não é enfeite.
- **Contagem de métricas**: lê valores numéricos tipados via `data-*`, não faz
  parsing de string formatada — evita bug de separador decimal vs. milhar.
- **`gsap.context()` em vez de animação solta em `useEffect`**: escopa todas as
  animações de um componente e garante cleanup automático no unmount (evita
  leak e duplicação em `StrictMode`).
- **Efeito magnético só no CTA principal**: é o elemento de maior valor de
  conversão da página. Não replicamos em todo botão pra não virar ruído visual.

## Não fiz (e por quê)

- Google Analytics: fácil de plugar (`gtag.js` no `index.html`), mas não é o
  que o desafio avalia (peso 0% no critério oficial). Fica pronto pra ligar
  quando o domínio final existir.
- Testes automatizados: fora do escopo de 7 dias pra uma página institucional
  sem lógica de negócio complexa. Se fosse pra produção real, entraria
  Vitest + Testing Library nos hooks (`useMagnetic`, `useGsapContext`).
