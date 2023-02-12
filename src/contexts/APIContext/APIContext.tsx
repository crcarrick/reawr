import { createContext, useContext, useMemo } from 'react'
import type { PropsWithChildren } from 'react'

import type { IElectronAPI } from '../../api'

const Context = createContext<IElectronAPI>(null)

export function Provider({ children }: PropsWithChildren) {
  const value = useMemo(() => window.electronAPI, [])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useAPI = () => useContext(Context)
