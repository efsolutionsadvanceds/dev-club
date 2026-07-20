import { useEffect } from 'react'
import { useLenis } from '@/hooks/useLenis'
import { ScrollTrigger } from '@/lib/gsap'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Sobre } from '@/components/sections/Sobre'
import { Formacoes } from '@/components/sections/Formacoes'
import { Depoimentos } from '@/components/sections/Depoimentos'
import { Empresas } from '@/components/sections/Empresas'
import { Tutores } from '@/components/sections/Tutores'
import { CtaFinal } from '@/components/sections/CtaFinal'

function App() {
  // Smooth scroll global, sincronizado com o ticker do GSAP (ver useLenis.ts)
  useLenis()

  /**
   * Todo ScrollTrigger da página calcula sua posição de disparo com base
   * na altura do layout NO MOMENTO em que é criado. Fontes web (Fraunces,
   * Inter, JetBrains Mono) carregam de forma assíncrona e trocam a fonte
   * de fallback pela fonte real depois desse cálculo — isso muda a altura
   * de qualquer texto multi-linha, o que desalinha as posições calculadas.
   * Resultado visível: seções com reveal (autoAlpha: 0 → 1) que ficam
   * presas invisíveis, de forma inconsistente (depende de quão rápido a
   * fonte carrega naquela sessão específica).
   *
   * `ScrollTrigger.refresh()` recalcula tudo do zero. Chamamos depois que
   * as fontes terminam (`document.fonts.ready`) e depois do `load` da
   * janela (cobre imagens e qualquer outro recurso que também deslocaria
   * o layout) — uma vez cada, não é um loop nem afeta performance.
   */
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()

    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Formacoes />
        <Depoimentos />
        <Empresas />
        <Tutores />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}

export default App