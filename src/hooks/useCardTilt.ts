import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function useCardTilt<T extends HTMLElement>(strength = 8) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Sem tilt em touch — não existe "hover" real em celular, e um toque
    // acidental deixaria o card girado até o próximo toque em outro lugar.
    if (window.matchMedia('(pointer: coarse)').matches) return

    gsap.set(el, { transformPerspective: 700, transformStyle: 'preserve-3d' })

    const rotateX = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' })
    const rotateY = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' })

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height

      rotateY((px - 0.5) * strength)
      rotateX((0.5 - py) * strength)

      el!.style.setProperty('--mx', `${px * 100}%`)
      el!.style.setProperty('--my', `${py * 100}%`)
    }

    function handleLeave() {
      rotateX(0)
      rotateY(0)
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