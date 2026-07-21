// src/components/modalFormacoes/PixelCharacter.tsx

import styled from 'styled-components'
import { withOpacity } from '@/styles/theme'
import type { CharacterData } from './types'
import { LottieCharacter } from './LottieCharacter'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Frame = styled.div`
  position: relative;

  width: 180px;
  height: 180px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 16px;
  border: 1px solid ${(p) => withOpacity(p.theme.colors.signal, 0.2)};

  background:
    linear-gradient(
      180deg,
      ${p => withOpacity(p.theme.colors.signal, 0.08)},
      transparent
    ),
    ${p => withOpacity(p.theme.colors.ink, 0.8)};

  overflow: hidden;
`

const Grid = styled.div`
  position: absolute;
  inset: 0;

  background-image:
    linear-gradient(
      ${p => withOpacity(p.theme.colors.signal, .05)} 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      ${p => withOpacity(p.theme.colors.signal, .05)} 1px,
      transparent 1px
    );

  background-size: 16px 16px;
`

const Sprite = styled.img`
  position: relative;
  z-index: 2;

  width: 96px;
  height: 96px;

  image-rendering: pixelated;
  object-fit: contain;
`

const Name = styled.p`
  margin-top: 14px;

  text-align: center;

  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};
  text-transform: uppercase;

  color: ${(p) => p.theme.colors.signal};
`



interface PixelCharacterProps {
  personagem: CharacterData
}

export function PixelCharacter({
  personagem,
}: PixelCharacterProps) {
  const isLottie = personagem.sprite.endsWith('.json')
  return (
    <div>
      <Wrapper>
        <Frame>
          <Grid />

          {
            isLottie ? (
              <LottieCharacter
                animation={personagem.sprite}
              />
            ) : (
              <Sprite
                src={personagem.sprite}
                alt={personagem.nome}
              />
            )
          }
        </Frame>
      </Wrapper>

      <Name>{personagem.nome}</Name>
    </div>
  )
}