export {}

import type { IElectronAPI } from '../api'

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
