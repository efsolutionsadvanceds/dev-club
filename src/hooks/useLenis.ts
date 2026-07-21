import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from '@/lib/gsap'

/**
 * Por que Lenis + gsap.ticker (e não o RAF nativo do Lenis):
 * O scroll suave por si só é fácil de fazer. O problema é sincronizar
 * esse scroll com o ScrollTrigger do GSAP — se cada lib rodar seu próprio
 * loop de animação, as posições ficam um frame fora de sincronia e as
 * animações "tremem" no scroll rápido. Por isso a gente registra o update
 * do Lenis dentro do próprio ticker do GSAP: um único relógio pra tudo.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.2,
    })
    // Sem isso, o ScrollTrigger não sabe que o Lenis moveu a página —
    // ele fica esperando o evento nativo de scroll do navegador, que o
    // Lenis não necessariamente dispara na mesma cadência.
    // Resultado: reveals disparando de forma inconsistente, dependendo da
    // velocidade do scroll no momento. Essa linha é o "elo" que faltava.
    lenis.on('scroll', ScrollTrigger.update)

    function raf(time: number) {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}