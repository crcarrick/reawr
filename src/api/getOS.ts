import { ipcMain, ipcRenderer } from 'electron'

import type { IOperatingSystem } from '../types'

export function getOS(): Promise<IOperatingSystem> {
  return ipcRenderer.invoke('get:os')
}

export function handleGetOS(getPlatform: () => NodeJS.Platform) {
  ipcMain.handle('get:os', () => {
    const platform = getPlatform()

    return {
      isMac: platform === 'darwin',
      isWin: platform === 'win32',
      isLinux: platform === 'linux',
    }
  })
}
