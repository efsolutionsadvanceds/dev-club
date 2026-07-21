import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// Registro único e centralizado: evitar registrar o plugin em cada componente
gsap.registerPlugin(ScrollTrigger)
export { gsap, ScrollTrigger }
