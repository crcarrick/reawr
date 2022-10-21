import { ipcMain, ipcRenderer } from 'electron'

export function getUpdates() {
  return ipcRenderer.invoke('get:updates')
}

export function handleGetUpdates(autoUpdater: Electron.AutoUpdater) {
  ipcMain.handle('get:updates', () => autoUpdater.checkForUpdates())
}
