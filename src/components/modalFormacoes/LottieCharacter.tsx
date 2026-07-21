import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

interface Props {
  animation: string
}

export function LottieCharacter({
  animation,
}: Props) {

  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {

    if (!container.current) return

    const instance = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: animation,
    })

    return () => {
      instance.destroy()
    }

  }, [animation])


  return (
    <div
      ref={container}
      style={{
        width: 120,
        height: 120,
      }}
    />
  )
}