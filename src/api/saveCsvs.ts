import { dialog, ipcMain, ipcRenderer } from 'electron'

import type { ISelection } from '../types'

interface ISaveData {
  readonly data: ISelection[]
  readonly dir: string
}

export function saveCsvs(data: ISelection[]) {
  return ipcRenderer.invoke('save-csvs:open', data)
}

export function handleSaveCsvs(writeFiles: (data: ISaveData) => void) {
  ipcMain.handle(
    'save-csvs:open',
    async (_event: Electron.IpcMainEvent, data: ISelection[]) => {
      const {
        canceled,
        filePaths: [dir],
      } = await dialog.showOpenDialog({
        properties: ['openDirectory'],
      })

      if (canceled) return

      writeFiles({
        data,
        dir,
      })
    }
  )
}
