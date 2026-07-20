import { useRef, useLayoutEffect, type RefObject } from 'react'
import { gsap } from '@/lib/gsap'

/**
 * Por que isso existe: toda animação GSAP dentro de um componente React
 * precisa ser limpa quando o componente desmonta, ou ela continua rodando
 * e vazando memória (e, em StrictMode, duplica). O gsap.context() faz esse
 * escopo automaticamente — a gente só declara as animações dentro do
 * callback e o cleanup é de graça no return.
 *
 * O callback pode opcionalmente devolver uma função de limpeza extra —
 * usada só quando o componente cria algum recurso que o GSAP não conhece
 * (ex: uma classe própria com seu próprio requestAnimationFrame, como o
 * TextScramble). Pra animação GSAP pura, não precisa devolver nada.
 */
export function useGsapContext<T extends HTMLElement>(
  callback: () => void | (() => void),
  deps: React.DependencyList = []
): RefObject<T> {
  const scope = useRef<T>(null)

  useLayoutEffect(() => {
    let extraCleanup: void | (() => void)

    const ctx = gsap.context(() => {
      extraCleanup = callback()
    }, scope)

    return () => {
      extraCleanup?.()
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scope as RefObject<T>
}