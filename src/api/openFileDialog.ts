import { dialog, ipcMain, ipcRenderer } from 'electron'

interface FileDialogResponse {
  readonly filePaths: string[]
}

export function openFileDialog(): Promise<FileDialogResponse> {
  return ipcRenderer.invoke('file-dialog:open')
}

export function handleOpenFileDialog() {
  ipcMain.handle('file-dialog:open', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        {
          name: 'Video Files',
          extensions: ['mp4'],
        },
      ],
    })

    if (canceled) return

    return { filePaths }
  })
}
