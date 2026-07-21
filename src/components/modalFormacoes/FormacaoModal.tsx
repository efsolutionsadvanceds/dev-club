import { ModalWindow } from './ModalWindow'
import { CloseButton } from './CloseButton'
import { PixelCharacter } from './PixelCharacter'
import { ProgressXP } from './ProgressXP'
import { SkillList } from './SkillList'
import { TechStack } from './TechStack'
import { MissionList } from './MissionList'
import { Difficulty } from './Difficulty'
import { RewardCard } from './RewardCard'

import type { FormacaoModalProps } from './types'

import {
  Overlay,
  Header,
  HeaderLeft,
  Title,
  Level,
  Body,
  Grid,
  Left,
  Right,
  Section,
  SectionTitle,
  Description,
} from './styles'

export function FormacaoModal({
  open,
  formacao,
  onClose,
}: FormacaoModalProps) {
  if (!open || !formacao) return null

  return (
    <Overlay>
      <ModalWindow>
        <Header>
          <HeaderLeft>
            <Level>LVL {formacao.codigo}</Level>
            <Title>{formacao.titulo}</Title>
          </HeaderLeft>

          <CloseButton onClick={onClose} />
        </Header>

        <Body>
          <Grid>
            <Left>
              <PixelCharacter personagem={formacao.personagem} />

              <ProgressXP value={formacao.xp} />

              <Difficulty level={formacao.dificuldade} />

              <RewardCard reward={formacao.recompensa} />
            </Left>

            <Right>
              <Section>
                <SectionTitle>Descrição</SectionTitle>

                <Description>
                  {formacao.descricao}
                </Description>
              </Section>

              <SkillList skills={formacao.habilidades} />

              <TechStack stack={formacao.stack} />

              <MissionList missions={formacao.missoes} />
            </Right>
          </Grid>
        </Body>
      </ModalWindow>
    </Overlay>
  )
}