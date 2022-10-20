import { PropsWithChildren } from 'react'

import { ThemeProvider as FThemeProvider } from '@fluentui/react'
import { ThemeProvider as SThemeProvider } from 'styled-components'

import { themeDark, themeLight, ThemeMode } from '../constants'

import { Provider as APIProvider } from './APIContext'
import { Provider as RecordingInfoProvider } from './RecordingInfoContext'
import { Provider as ThemeProvider, ThemeContext } from './ThemeContext'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      {/* this whole thing is kinda gross */}
      <ThemeContext.Consumer>
        {({ mode }) => (
          <FThemeProvider
            theme={mode === ThemeMode.DARK ? themeDark : themeLight}
            style={{ minHeight: '100vh' }}
          >
            <SThemeProvider
              theme={mode === ThemeMode.DARK ? themeDark : themeLight}
            >
              <APIProvider>
                <RecordingInfoProvider>{children}</RecordingInfoProvider>
              </APIProvider>
            </SThemeProvider>
          </FThemeProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  )
}
