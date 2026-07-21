import { gsap } from '@/lib/gsap'

export function openModal(element: HTMLElement) {
  const tl = gsap.timeline()

  tl.set(element, {
    autoAlpha: 0,
  })

  tl.fromTo(
    element,
    {
      autoAlpha: 0,
    },
    {
      autoAlpha: 1,
      duration: 0.25,
      ease: 'power2.out',
    },
  )

  tl.fromTo(
    element.querySelector('.modal-window'),
    {
      y: 40,
      scale: 0.96,
      autoAlpha: 0,
    },
    {
      y: 0,
      scale: 1,
      autoAlpha: 1,
      duration: 0.45,
      ease: 'power3.out',
    },
    '-=0.12',
  )

  tl.from(
    element.querySelectorAll('.animate-item'),
    {
      y: 16,
      autoAlpha: 0,
      stagger: 0.05,
      duration: 0.35,
      ease: 'power2.out',
    },
    '-=0.2',
  )

  return tl
}

export function closeModal(element: HTMLElement) {
  return gsap.to(element, {
    autoAlpha: 0,
    duration: 0.2,
    ease: 'power2.in',
  })
}