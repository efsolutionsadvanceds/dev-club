import 'styled-components'
import type { Theme } from './theme'
// Isso é o que dá autocomplete e checagem de tipo quando você escreve
// `${(p) => p.theme.colors.signal}` dentro de um styled component.
// Sem isso, `p.theme` seria `any` e erro de digitação em "colors.singal"
// só apareceria em runtime, no navegador.
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
