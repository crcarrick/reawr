import { createContext, useCallback, useContext } from 'react'
import type { PropsWithChildren } from 'react'

import { ThemeMode } from '../../constants'
import { useStateAsync } from '../../hooks'

interface IThemeContext {
  readonly mode: ThemeMode
  readonly setMode: (mode: ThemeMode) => void
}

export const ThemeContext = createContext<IThemeContext>({
  mode: ThemeMode.LIGHT,
  setMode: () => {},
})

export function Provider({ children }: PropsWithChildren) {
  const [mode, _setMode] = useStateAsync(
    () => window.electronAPI.getPreference('mode'),
    ThemeMode.LIGHT,
    []
  )

  const setMode = useCallback(
    (mode: ThemeMode) => {
      _setMode(mode)
      window.electronAPI.setPreference('mode', mode)
    },
    [_setMode]
  )

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
