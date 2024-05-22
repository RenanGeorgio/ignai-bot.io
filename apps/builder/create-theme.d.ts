import '@mui/material/styles'

type CustomProps = {
  [key: string]: any
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs?: true
    sm?: true
    md?: true
    lg?: true
    xl?: true
    mobile?: true
    tablet?: true
    laptop?: true
    desktop?: true
  }

  interface Theme {
    status: {
      danger: React.CSSProperties["color"] | string
    }
  }

  interface Palette {
    neutral?: Palette["primary"]
    tertiary?: Palette["primary"]
    gradient?: PaletteColor
    transparent?: PaletteColor
    secondary?: {
      transparent?: string
    }
    mode?: string
  }
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"]
    tertiary?: PaletteOptions["primary"]
  }

  interface PaletteColor {
    darker?: string
    transparent?: string
    gradient?: PaletteColor
    lighter?: string
  }
  interface SimplePaletteColorOptions {
    darker?: string
    lighter?: string
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
    MUIDataTable: 'root' | 'caption' | 'liveAnnounce' | 'paper' | 'responsiveScroll' | 'tableRoot'

    MUIDataTableBody: 'root' | 'emptyTitle' | 'lastSimpleCell' | 'lastStackedCell'

    MUIDataTableBodyCell:
        | 'root'
        | 'cellHide'
        | 'cellStackedSmall'
        | 'responsiveStackedSmall'
        | 'responsiveStackedSmallParent'
        | 'simpleCell'
        | 'simpleHeader'
        | 'stackedCommon'
        | 'stackedCommonAlways'
        | 'stackedHeader'
        | 'stackedParent'
        | 'stackedParentAlways'

    MUIDataTableBodyRow: 'root' | 'hoverCursor' | 'responsiveSimple' | 'responsiveStacked'

    MUIDataTableFilter:
        | 'root'
        | 'checkbox'
        | 'checkboxFormControl'
        | 'checkboxFormControlLabel'
        | 'checkboxFormGroup'
        | 'checkboxIcon'
        | 'checkboxListTitle'
        | 'checked'
        | 'filtersSelected'
        | 'gridListTile'
        | 'header'
        | 'noMargin'
        | 'reset'
        | 'resetLink'
        | 'title'

    MUIDataTableFilterList: 'root' | 'chip'

    MUIDataTableFooter: 'root'

    MUIDataTableHead: 'main' | 'responsiveSimple' | 'responsiveStacked' | 'responsiveStackedAlways'

    MUIDataTableHeadCell:
        | 'root'
        | 'contentWrapper'
        | 'data'
        | 'dragCursor'
        | 'fixedHeader'
        | 'hintIconAlone'
        | 'hintIconWithSortIcon'
        | 'mypopper'
        | 'sortAction'
        | 'sortActive'
        | 'sortLabelRoot'
        | 'toolButton'
        | 'tooltip'

    MUIDataTableHeadRow: 'root'

    MUIDataTableJumpToPage: 'root' | 'caption' | 'input' | 'select' | 'selectIcon' | 'selectRoot'

    MUIDataTablePagination:
        | 'root'
        | '@media screen and (max-width: 400px)'
        | 'navContainer'
        | 'selectRoot'
        | 'tableCellContainer'
        | 'toolbar'

    MUIDataTableResize: 'root' | 'resizer'

    MUIDataTableSearch: 'clearIcon' | 'main' | 'searchIcon' | 'searchText'

    MUIDataTableSelectCell:
        | 'root'
        | 'checkboxRoot'
        | 'checked'
        | 'disabled'
        | 'expandDisabled'
        | 'expanded'
        | 'fixedHeader'
        | 'fixedLeft'
        | 'headerCell'
        | 'hide'
        | 'icon'

    MUIDataTableToolbar:
        | 'root'
        | '@media screen and (max-width: 480px)'
        | "[theme.breakpoints.down('sm')]"
        | "[theme.breakpoints.down('xs')]"
        | 'actions'
        | 'filterCloseIcon'
        | 'filterPaper'
        | 'fullWidthActions'
        | 'fullWidthLeft'
        | 'fullWidthRoot'
        | 'fullWidthTitleText'
        | 'icon'
        | 'iconActive'
        | 'left'
        | 'searchIcon'
        | 'titleRoot'
        | 'titleText'

    MUIDataTableToolbarSelect: 'root' | 'deleteIcon' | 'iconButton' | 'title'

    MUIDataTableViewCol:
        | 'root'
        | 'checkbox'
        | 'checkboxRoot'
        | 'checked'
        | 'formControl'
        | 'formGroup'
        | 'label'
        | 'title'
  }
}