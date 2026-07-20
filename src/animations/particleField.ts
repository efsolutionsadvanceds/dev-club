export interface ParticleFieldOptions {
  particleCount?: number
  color?: string
  linkDistance?: number
  mouseRadius?: number
  fps?: number
}

export interface ParticleFieldController {
  start: () => void
  stop: () => void
  resize: () => void
  destroy: () => void
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

/**
 * Campo de partículas em Canvas 2D que reage ao cursor: partículas se
 * afastam do mouse dentro de um raio, e linhas se desenham entre pares
 * próximos (efeito "constelação/rede"). Diferente do matrixRain.ts (que
 * roda sozinho, sem interação nenhuma), esse motor lê a posição real do
 * mouse — é o primeiro efeito de fundo do site que responde à presença
 * do usuário em vez de só decorar.
 *
 * O cálculo de links é O(n²) (compara cada partícula com todas as
 * outras), mas com ~45 partículas isso é ~1000 comparações por frame —
 * trivial pra qualquer CPU. Não vale a pena complicar com uma estrutura
 * espacial (quadtree etc.) numa quantidade tão pequena de pontos.
 */
export function createParticleField(
  canvas: HTMLCanvasElement,
  options: ParticleFieldOptions = {}
): ParticleFieldController {
  const {
    particleCount = 45,
    color = '#4CFF7A',
    linkDistance = 120,
    mouseRadius = 140,
    fps = 30,
  } = options

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return { start: () => {}, stop: () => {}, resize: () => {}, destroy: () => {} }
  }

  let width = 0
  let height = 0
  let particles: Particle[] = []
  const mouse = { x: -9999, y: -9999 }
  let rafId: number | null = null
  let lastFrameTime = 0
  const frameInterval = 1000 / fps

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    width = canvas.clientWidth
    height = canvas.clientHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx!.setTransform(1, 0, 0, 1, 0, 0)
    ctx!.scale(dpr, dpr)

    particles = new Array(particleCount).fill(0).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }))
  }

  // Os listeners de mouse ficam de fora do start/stop de propósito: eles
  // só leem a posição do cursor (custo zero), quem liga/desliga o custo
  // de verdade (o desenho) é o rAF, controlado por start/stop.
  function handleMouseMove(e: MouseEvent) {
    const rect = canvas.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
  }

  function handleMouseLeave() {
    mouse.x = -9999
    mouse.y = -9999
  }

  canvas.addEventListener('mousemove', handleMouseMove)
  canvas.addEventListener('mouseleave', handleMouseLeave)

  function draw() {
    ctx!.clearRect(0, 0, width, height)

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > width) p.vx *= -1
      if (p.y < 0 || p.y > height) p.vy *= -1

      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < mouseRadius && dist > 0) {
        const force = (mouseRadius - dist) / mouseRadius
        p.x += (dx / dist) * force * 1.6
        p.y += (dy / dist) * force * 1.6
      }

      ctx!.beginPath()
      ctx!.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
      ctx!.fillStyle = color
      ctx!.globalAlpha = 0.6
      ctx!.fill()
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i]
        const b = particles[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < linkDistance) {
          ctx!.beginPath()
          ctx!.moveTo(a.x, a.y)
          ctx!.lineTo(b.x, b.y)
          ctx!.strokeStyle = color
          ctx!.globalAlpha = (1 - dist / linkDistance) * 0.15
          ctx!.lineWidth = 1
          ctx!.stroke()
        }
      }
    }

    ctx!.globalAlpha = 1
  }

  function loop(time: number) {
    rafId = requestAnimationFrame(loop)
    if (time - lastFrameTime < frameInterval) return
    lastFrameTime = time
    draw()
  }

  function start() {
    if (rafId !== null) return
    if (particles.length === 0) resize()
    rafId = requestAnimationFrame(loop)
  }

  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  function destroy() {
    stop()
    canvas.removeEventListener('mousemove', handleMouseMove)
    canvas.removeEventListener('mouseleave', handleMouseLeave)
  }

  return { start, stop, resize, destroy }
}