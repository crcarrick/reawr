import { ipcMain, ipcRenderer } from 'electron'

import { IParsedPath } from '../types'

export function parsePath(path: string): Promise<IParsedPath> {
  return ipcRenderer.invoke('parse:path', path)
}

export function handleParsePath(parse: (path: string) => IParsedPath) {
  ipcMain.handle('parse:path', (_event: Electron.IpcMainEvent, path: string) =>
    parse(path)
  )
}
