import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { FormacaoModal } from '@/components/modalFormacoes'
import type { FormacaoModalData } from '@/components/modalFormacoes'
import { useGsapContext } from '@/hooks/useGsapContext'
import { gsap } from '@/lib/gsap'
import { formacoesModal } from '@/lib/content'
import { Container, SystemTag } from '@/components/ui/Shared'
import { withOpacity } from '@/styles/theme'

// --- Animações CSS para a atmosfera Retro ---
const scanlines = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 100vh; }
`

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

// Nova animação: Correntes elétricas correndo pelo grid
const electricalBeams = keyframes`
  0% {
    background-position: 
      -100% 96px,   /* Feixe Horizontal 1 (esquerda pra direita) */
      320px -100%,  /* Feixe Vertical 1 (cima pra baixo) */
      200% 256px,   /* Feixe Horizontal 2 (direita pra esquerda) */
      672px 200%;   /* Feixe Vertical 2 (baixo pra cima) */
  }
  100% {
    background-position: 
      200% 96px, 
      320px 200%, 
      -100% 256px, 
      672px -100%;
  }
`

// --- Styled Components ---

const Section = styled.section`
  position: relative;
  background-color: ${(p) => p.theme.colors.inkSoft};
  /* Fundo estilo Grid de jogo 2D */
  background-image: 
    linear-gradient(${(p) => withOpacity(p.theme.colors.signal, 0.05)} 1px, transparent 1px),
    linear-gradient(90deg, ${(p) => withOpacity(p.theme.colors.signal, 0.05)} 1px, transparent 1px);
  background-size: 32px 32px;
  padding: 112px 0;
  overflow: hidden;

  /* Efeito de TV CRT (Scanlines) */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(255,255,255,0),
      rgba(255,255,255,0) 50%,
      rgba(0,0,0,0.1) 50%,
      rgba(0,0,0,0.1)
    );
    background-size: 100% 4px;
    animation: ${scanlines} 10s linear infinite;
    pointer-events: none;
    z-index: 1;
  }

  /* Efeito de Feixes de Luz (Eletricidade no Grid) */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(90deg, transparent, ${(p) => p.theme.colors.signal}, transparent),
      linear-gradient(180deg, transparent, ${(p) => p.theme.colors.signal}, transparent),
      linear-gradient(270deg, transparent, ${(p) => p.theme.colors.signal}, transparent),
      linear-gradient(360deg, transparent, ${(p) => p.theme.colors.signal}, transparent);
    /* Tamanho dos feixes: 40% de comprimento e 1px de espessura (ou vice-versa) */
    background-size: 40% 1px, 1px 40%, 40% 1px, 1px 40%;
    background-repeat: no-repeat;
    animation: ${electricalBeams} 6s linear infinite;
    opacity: 0.6;
    z-index: 1;
    pointer-events: none;
    mix-blend-mode: screen; /* Deixa o aspecto mais luminoso */
  }

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    padding: 144px 0;
  }
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2; /* Fica acima das scanlines e feixes */
`

const Title = styled.h2`
  margin-top: 16px;
  max-width: 640px;
  font-family: ${(p) => p.theme.font.display};
  font-size: 36px;
  line-height: 1.15;
  color: ${(p) => p.theme.colors.paper};
  text-transform: uppercase;
  /* Sombra sólida estilo pixel art */
  text-shadow: 3px 3px 0px ${(p) => withOpacity(p.theme.colors.signal, 0.3)};

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    font-size: 48px;
  }
`

const List = styled.div`
  margin-top: 64px;
  border-top: 2px solid ${(p) => p.theme.colors.signal};
  border-bottom: 2px solid ${(p) => p.theme.colors.signal};
  background: ${(p) => withOpacity(p.theme.colors.inkSoft, 0.8)};
`

const Row = styled.div`
  display: grid;
  gap: 16px;
  padding: 40px 24px; /* Padding extra nas laterais para o hover */
  border-bottom: 1px dashed ${(p) => withOpacity(p.theme.colors.signal, 0.3)};
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: crosshair; /* Cursor retrô */

  &:last-child {
    border-bottom: none;
  }

  /* Efeito de "Seleção de Fase" */
  &:hover {
    background: ${(p) => withOpacity(p.theme.colors.signal, 0.1)};
    transform: translateX(8px);
    border-left: 4px solid ${(p) => p.theme.colors.signal};
  }

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    grid-template-columns: 80px 1fr auto;
    align-items: center;
    gap: 32px;
  }
`

const Code = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 16px;
  font-weight: bold;
  color: ${(p) => withOpacity(p.theme.colors.signal, 0.6)};
  transition: color 300ms;

  ${Row}:hover & {
    color: ${(p) => p.theme.colors.signal};
    animation: ${blink} 1s steps(2, start) infinite;
  }
  
  &::before {
    content: 'LVL ';
    font-size: 12px;
    opacity: 0.7;
  }
`

const Titulo = styled.h3`
  font-family: ${(p) => p.theme.font.display};
  font-size: 24px;
  color: ${(p) => p.theme.colors.paper};
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    font-size: 30px;
  }
`

const Descricao = styled.p`
  margin-top: 8px;
  max-width: 620px;
  color: ${(p) => withOpacity(p.theme.colors.paper, 0.7)};
  line-height: 1.6;
`

const StackRow = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

const StackTag = styled.span`
  /* Estilo bloco (sem border-radius) simulando botões de 8-bit */
  border-radius: 0px; 
  background: ${(p) => withOpacity(p.theme.colors.signal, 0.1)};
  border: 1px solid ${(p) => p.theme.colors.signal};
  border-bottom-width: 3px; /* Cria profundidade pseudo-3D */
  padding: 4px 12px;
  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  color: ${(p) => p.theme.colors.signal};
  transition: transform 0.1s;

  ${Row}:hover & {
    transform: translateY(2px);
    border-bottom-width: 1px;
    margin-bottom: 2px; /* Compensa a perda da borda para não mover o layout */
  }
`

const Duracao = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};
  color: ${(p) => p.theme.colors.signal};
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: 'TIME'; /* Estilo de relógio de jogo */
    font-size: 10px;
    opacity: 0.6;
  }

  @media (min-width: ${(p) => p.theme.breakpoint.md}) {
    text-align: right;
    justify-content: flex-end;
  }
`


export function Formacoes() {

  const [selectedModule, setSelectedModule] =
    useState<FormacaoModalData | null>(null)

  const [modalOpen, setModalOpen] = useState(false)

  function openModule(module: FormacaoModalData) {
    setSelectedModule(module)
    setModalOpen(true)
  }

  function closeModule() {
    setModalOpen(false)
    setSelectedModule(null)
  }

  const scope = useGsapContext<HTMLDivElement>(() => {
    // Animação GSAP mais "dura" (steps) para emular o loading de telas antigas
    gsap.utils.toArray<HTMLElement>('.formacao-card').forEach((card, i) => {
      gsap.from(card, {
        x: -40, // Desliza da esquerda
        autoAlpha: 0,
        duration: 0.4,
        ease: 'steps(5)', // Ease em degraus imita o framerate baixo
        delay: i * 0.15,
        scrollTrigger: {
          trigger: card,
          start: 'top 90%'
        },
      })
    })
  }, [])

  return (
    <Section id="formacoes" ref={scope}>
      <Container>
        <ContentWrapper>
          <SystemTag>// SELECT_STAGE</SystemTag>
          <Title>Quatro módulos. Uma ordem que faz sentido.</Title>

          <List>
            {formacoesModal.map((f) => (
              <Row
                key={f.id}
                className="formacao-card"
                onClick={() => openModule(f)}
              >
                <Code>{f.codigo}</Code>
                <div>
                  <Titulo>{f.titulo}</Titulo>
                  <Descricao>{f.descricao}</Descricao>
                  <StackRow>
                    {f.stack.map((s) => (
                      <StackTag key={s}>{s}</StackTag>
                    ))}
                  </StackRow>
                </div>
                <Duracao>{f.duracao}</Duracao>
              </Row>
            ))}
          </List>
        </ContentWrapper>
      </Container>
      <FormacaoModal
        open={modalOpen}
        formacao={selectedModule}
        onClose={closeModule}
      />
    </Section>
  )
}