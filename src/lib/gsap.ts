import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registro único e centralizado: evitar registrar o plugin em cada componente
// (comum em projeto com IA gerando componente por componente sem revisar).
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
