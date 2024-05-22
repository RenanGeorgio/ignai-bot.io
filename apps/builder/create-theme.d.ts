import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"] | string
    }
  }

  interface Palette {
    neutral?: Palette["primary"]
    gradient?: PaletteColor
    transparent?: PaletteColor
    secondary?: {
      transparent?: string
    }
    mode?: string
  }
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"]
  }

  interface PaletteColor {
    darker?: string
    transparent?: string
    gradient?: PaletteColor
  }
  interface SimplePaletteColorOptions {
    darker?: string
  }
  interface PaletteColorOptions {
    main?: string
    dark?: string
    light?: string
    transparent?: string
    gradient?: string
    test?: string
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: React.CSSProperties["color"] | string
    }
  }

  interface Components {
    [key: string]: any
  }
}