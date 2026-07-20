const NOISE_CHARS = '!<>-_\\/[]{}—=+*^?#01アイウエオ'.split('')

interface ScrambleUnit {
  from: string
  to: string
  start: number
  end: number
  char?: string
}

/**
 * Efeito clássico de "decodificação" de terminal: recebe um elemento, e ao
 * chamar `.setText()`, cada caractere passa por alguns frames de ruído
 * aleatório antes de "resolver" pro caractere final — como se o texto
 * estivesse sendo processado em tempo real.
 *
 * É uma classe (não um hook, não um componente) de propósito: esse efeito
 * não pertence ao React, pertence ao DOM. Ele escreve direto em
 * `el.innerHTML` a cada frame — se isso fosse gerenciado via state do
 * React, seriam dezenas de re-renders por segundo só pra trocar texto.
 * Rodar fora do ciclo do React é o que mantém isso barato.
 */
export class TextScramble {
  private el: HTMLElement
  private frame = 0
  private frameRequest = 0
  private queue: ScrambleUnit[] = []
  private resolvePromise: (() => void) | null = null

  constructor(el: HTMLElement) {
    this.el = el
    this.update = this.update.bind(this)
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.textContent ?? ''
    const length = Math.max(oldText.length, newText.length)

    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 20)
      const end = start + Math.floor(Math.random() * 20)
      this.queue.push({ from, to, start, end })
    }

    cancelAnimationFrame(this.frameRequest)
    this.frame = 0

    return new Promise((resolve) => {
      this.resolvePromise = resolve
      this.update()
    })
  }

  private update() {
    let output = ''
    let completeCount = 0

    for (const unit of this.queue) {
      if (this.frame >= unit.end) {
        completeCount++
        output += unit.to
      } else if (this.frame >= unit.start) {
        if (!unit.char || Math.random() < 0.28) {
          unit.char = NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)]
        }
        output += `<span class="scramble-noise">${unit.char}</span>`
      } else {
        output += unit.from
      }
    }

    this.el.innerHTML = output

    if (completeCount === this.queue.length) {
      this.resolvePromise?.()
      this.resolvePromise = null
    } else {
      this.frame++
      this.frameRequest = requestAnimationFrame(this.update)
    }
  }

  /** Encerra o loop de animação — chamado no cleanup do componente React. */
  destroy() {
    cancelAnimationFrame(this.frameRequest)
  }
}