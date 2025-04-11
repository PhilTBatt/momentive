import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colours: {
      primary: string
      secondary: string
      background: string
      text: string
    }
    borderRadius: string
  }
}
