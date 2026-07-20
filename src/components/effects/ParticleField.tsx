import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { createParticleField } from '@/animations/particleField'

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
`

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const engine = createParticleField(canvas, {
      particleCount: 45,
      color: '#4CFF7A',
      linkDistance: 120,
      mouseRadius: 140,
      fps: 30,
    })

    engine.start()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) engine.start()
        else engine.stop()
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    const handleVisibility = () => {
      if (document.hidden) {
        engine.stop()
      } else if (canvas.getBoundingClientRect().top < window.innerHeight) {
        engine.start()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    let resizeTimeout: number
    const handleResize = () => {
      window.clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => engine.resize(), 200)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      engine.destroy()
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('resize', handleResize)
      window.clearTimeout(resizeTimeout)
    }
  }, [])

  return <Canvas ref={canvasRef} aria-hidden="true" />
}