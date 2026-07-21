export interface MatrixRainOptions {
  fontSize?: number
  color?: string
  opacity?: number
  fps?: number
}

export interface MatrixRainController {
  start: () => void
  stop: () => void
  resize: () => void
  destroy: () => void
}

const CHARS = 'アイウエオカキクケコサシスセソ0123456789</>{}'.split('')

export function createMatrixRain(
  canvas: HTMLCanvasElement,
  options: MatrixRainOptions = {}
): MatrixRainController {
  const { fontSize = 16, color = '#4CFF7A', opacity = 0.45, fps = 20 } = options
  const ctx = canvas.getContext('2d')

  // Se o navegador não der o contexto 2D (raríssimo, mas existe), devolve
  // um controller "morto" em vez de deixar o resto do app quebrar.
  if (!ctx) {
    return { start: () => {}, stop: () => {}, resize: () => {}, destroy: () => {} }
  }

  let columns: number[] = []
  let width = 0
  let height = 0
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

    const columnCount = Math.max(1, Math.floor(width / fontSize))
    columns = new Array(columnCount)
      .fill(0)
      .map(() => Math.floor((Math.random() * height) / fontSize))
  }

  function draw() {

    ctx!.fillStyle = 'rgba(10, 11, 10, 0.15)'
    ctx!.fillRect(0, 0, width, height)

    ctx!.font = `${fontSize}px monospace`
    ctx!.fillStyle = color
    ctx!.globalAlpha = opacity

    columns.forEach((y, i) => {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)]
      const x = i * fontSize
      ctx!.fillText(char, x, y * fontSize)

      if (y * fontSize > height && Math.random() > 0.975) {
        columns[i] = 0
      } else {
        columns[i] = y + 1
      }
    })

    ctx!.globalAlpha = 1
  }

  function loop(time: number) {
    rafId = requestAnimationFrame(loop) 
    if (time - lastFrameTime < frameInterval) return
    lastFrameTime = time
    draw()
  }

  function start() {
    if (rafId !== null) return // já rodando, não duplica o loop
    if (columns.length === 0) resize()
    rafId = requestAnimationFrame(loop)
  }

  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  return { start, stop, resize, destroy: stop }
}