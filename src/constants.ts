import { createTheme } from '@fluentui/react'

export enum ThemeMode {
  SYSTEM = 'system',
  DARK = 'dark',
  LIGHT = 'light',
}

export const themeDark = createTheme({
  palette: {
    themePrimary: '#ffba01',
    themeLighterAlt: '#fffcf5',
    themeLighter: '#fff4d6',
    themeLight: '#ffebb3',
    themeTertiary: '#ffd666',
    themeSecondary: '#ffc31f',
    themeDarkAlt: '#e6a800',
    themeDark: '#c28e00',
    themeDarker: '#8f6900',
    neutralLighterAlt: '#323130',
    neutralLighter: '#31302f',
    neutralLight: '#2f2e2d',
    neutralQuaternaryAlt: '#2c2b2a',
    neutralQuaternary: '#2a2928',
    neutralTertiaryAlt: '#282726',
    neutralTertiary: '#c8c8c8',
    neutralSecondary: '#d0d0d0',
    neutralPrimaryAlt: '#dadada',
    neutralPrimary: '#ffffff',
    neutralDark: '#f4f4f4',
    black: '#f8f8f8',
    white: '#323130',
  },
})

export const themeLight = createTheme({
  palette: {
    themePrimary: '#0078d4',
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#ffffff',
  },
})
