import { dialog, ipcMain, ipcRenderer } from 'electron'

interface ParsedPath {
  readonly base: string
  readonly dir: string
  readonly ext: string
  readonly name: string
  readonly root: string
}

interface FileDialogResponse {
  readonly filePaths: ParsedPath[]
}

export function openFileDialog(): Promise<FileDialogResponse> {
  return ipcRenderer.invoke('file-dialog:open')
}

export function handleOpenFileDialog(parse: (path: string) => ParsedPath) {
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
      filePaths: result.filePaths.map((path) => parse(path)),
    }
  })
}
