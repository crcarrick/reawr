import { Theme } from '@fluentui/react'
import { createGlobalStyle } from 'styled-components'

interface IGlobalStyleProps {
  readonly theme: Theme
}

export const GlobalStyle = createGlobalStyle<IGlobalStyleProps>`
  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.neutralLighter};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.palette.themePrimary};
  }
`
