import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

/**
 * Efeito "magnético": o elemento se desloca em direção ao cursor dentro
 * do seu próprio raio de ação, e volta ao centro com um leve overshoot
 * elástico ao sair. `strength` controla o quanto ele "gruda" no cursor
 * (0 a 1). Usamos xPercent/yPercent via gsap.quickTo pra não recalcular
 * o tween inteiro a cada movimento de mouse — isso é o que evita o efeito
 * "engasgado" que se vê em implementações ingênuas com setState.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Não aplica em telas de toque — efeito não faz sentido sem cursor
    if (window.matchMedia('(pointer: coarse)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      xTo(relX * strength)
      yTo(relY * strength)
    }

    function handleLeave() {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength])

  return ref
}
