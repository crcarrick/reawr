import { dialog, ipcMain, ipcRenderer } from 'electron'

export function openFileDialog() {
  return ipcRenderer.invoke('file-dialog:open')
}

export function handleOpenFileDialog() {
  ipcMain.handle('file-dialog:open', async () => {
    const { canceled, ...result } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        {
          name: 'Video Files',
          extensions: ['mp4'],
        },
      ],
    })

    if (canceled) return

    return {
      ...result,
      filePaths: result.filePaths.map((path) => `reawr:///${path}`),
    }
  })
}
