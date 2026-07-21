import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { createMatrixRain } from '@/animations/matrixRain'

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return // fica só o grid estático que já existe atrás disso

    const engine = createMatrixRain(canvas, {
      fontSize: 16,
      color: '#4CFF7A',
      opacity: 0.45,
      fps: 20,
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

    // Debounce simples no resize — recalcular colunas a cada pixel de
    // redimensionamento seria desperdício; espera 200ms de silêncio.
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