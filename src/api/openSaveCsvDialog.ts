import { dialog, ipcMain, ipcRenderer } from 'electron'

import type { IRecording } from '../types'

interface ISaveData {
  readonly data: IRecording
  readonly filePath: string
}

export function openSaveCsvDialog(data: IRecording) {
  return ipcRenderer.invoke('csv-dialog:open', data)
}

export function handleOpenSaveCsvDialog(writeFile: (data: ISaveData) => void) {
  ipcMain.handle(
    'csv-dialog:open',
    async (_event: Electron.IpcMainEvent, data: IRecording) => {
      const { canceled, filePath } = await dialog.showSaveDialog({
        defaultPath: `Run ${data.recordingInfo.runId} - ID ${data.recordingInfo.mouseId} - ${data.recordingInfo.testName} (${data.recordingInfo.testDate}).xlsx`,
        filters: [
          {
            name: 'Spreadsheets',
            extensions: ['xlsx'],
          },
        ],
      })

      if (canceled) return

      writeFile({
        data,
        filePath,
      })
    }
  )
}
