import { Theme } from '@fluentui/react'
import { createGlobalStyle } from 'styled-components'

interface IGlobalStyleProps {
  readonly theme: Theme
}

export const GlobalStyle = createGlobalStyle<IGlobalStyleProps>`
  :root {
    --content-width: calc(100vw - 200px);
    --content-height: calc(100vh - 92px);
  }

  body {
    box-sizing: border-box;
    margin: 0;
    min-height: 100vh;
    max-width: 100vw;
  }

  #root {
    flex: 1;
    display: flex;
    overflow: hidden;
    min-height: 100vh;
    max-width: 100vw;
    flex-direction: column;
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.neutralLighter};
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.palette.themePrimary};
    border-radius: 10px;
  }
`
