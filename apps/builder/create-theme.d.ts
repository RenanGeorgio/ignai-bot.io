import '@mui/material/styles'

type CustomProps = {
  [key: string]: any
}

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
    MUIDataTable?: {
      styleOverrides?: ComponentsOverrides['MUIDataTable']
    }
    
    MUIDataTableBody?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableBody']
    }

    MUIDataTableBodyCell?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableBodyCell']
    }

    MUIDataTableBodyRow?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableBodyRow']
    }

    MUIDataTableFilter?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableFilter']
    }

    MUIDataTableFilterList?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableFilterList']
    }

    MUIDataTableFooter?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableFooter']
    }

    MUIDataTableHead?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableHead']
    }

    MUIDataTableHeadCell?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableHeadCell']
    }

    MUIDataTableHeadRow?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableHeadRow']
    }

    MUIDataTableJumpToPage?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableJumpToPage']
    }

    MUIDataTablePagination?: {
      styleOverrides?: ComponentsOverrides['MUIDataTablePagination']
    }

    MUIDataTableResize?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableResize']
    }

    MUIDataTableSearch?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableSearch']
    }

    MUIDataTableSelectCell?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableSelectCell']
    }

    MUIDataTableToolbar?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableToolbar']
    }

    MUIDataTableToolbarSelect?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableToolbarSelect']
    }

    MUIDataTableViewCol?: {
      styleOverrides?: ComponentsOverrides['MUIDataTableViewCol']
    }
  }
}

declare module '@mui/material/styles/overrides' {
  interface ComponentNameToClassKey {
    MUIDataTable?: string | CustomProps
    MUIDataTableBody?: string | CustomProps
    MUIDataTableBodyCell?: string | CustomProps
    MUIDataTableBodyRow?: string | CustomProps
    MUIDataTableFilter?: string | CustomProps
    MUIDataTableFilterList?: string | CustomProps
    MUIDataTableFooter?: string | CustomProps
    MUIDataTableHead?: string | CustomProps
    MUIDataTableHeadCell?: string | CustomProps
    MUIDataTableHeadRow?: string | CustomProps
    MUIDataTableJumpToPage?: string | CustomProps
    MUIDataTablePagination?: string | CustomProps
    MUIDataTableResize?: string | CustomProps
    MUIDataTableSearch?: string | CustomProps
    MUIDataTableSelectCell?: string | CustomProps
    MUIDataTableToolbar?: string | CustomProps
    MUIDataTableToolbarSelect?: string | CustomProps
    MUIDataTableViewCol?: string | CustomProps
  }
}