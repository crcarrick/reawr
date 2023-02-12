export {}

import type { IElectronAPI } from '../api'

declare global {
  interface Crypto {
    randomUUID: () => string
  }
  interface Window {
    electronAPI: IElectronAPI
  }
}
