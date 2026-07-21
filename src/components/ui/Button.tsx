import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { useMagnetic } from '@/hooks/useMagnetic'
import { withOpacity } from '@/styles/theme'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  magnetic?: boolean
}

const StyledButton = styled.button<{ $variant: 'primary' | 'ghost' }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  padding: 16px 32px;
  font-family: ${(p) => p.theme.font.mono};
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: ${(p) => p.theme.letterSpacingTag};
  transition: background-color 300ms, color 300ms, border-color 300ms;

  ${(p) =>
    p.$variant === 'primary'
      ? css`
          background: ${p.theme.colors.signal};
          color: ${p.theme.colors.ink};

          &:hover {
            background: ${p.theme.colors.signalGlow};
          }
        `
      : css`
          background: transparent;
          color: ${p.theme.colors.paper};
          border: 1px solid ${withOpacity(p.theme.colors.paper, 0.3)};

          &:hover {
            border-color: ${p.theme.colors.signal};
            color: ${p.theme.colors.signal};
          }
        `}
`

export function Button({ children, variant = 'primary', magnetic = false, ...props }: ButtonProps) {
  const ref = useMagnetic<HTMLButtonElement>(magnetic ? 0.4 : 0)

  return (
    <StyledButton
      ref={ref}
      $variant={variant}
      {...props}
    >
      {children}
    </StyledButton>
  )
}
