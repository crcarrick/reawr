import type { Octokit } from '@octokit/rest'
import { ipcMain, ipcRenderer } from 'electron'

import type { IIssue } from '../types'

export function fileIssue({ title, body }: IIssue) {
  return ipcRenderer.invoke('file:issue', { title, body })
}

export function handleFileIssue(
  client: Octokit,
  callback: (err?: Error) => void
) {
  ipcMain.handle(
    'file:issue',
    async (_event: Electron.IpcMainEvent, { title, body }: IIssue) => {
      // TODO: This should really go to some service or backend rather than GH issues
      //       but GH issues will work for now
      try {
        const response = await client.issues.create({
          owner: 'crcarrick',
          repo: 'reawr',
          title,
          body,
        })

        callback()

        return response
      } catch (err) {
        callback(err)
      }
    }
  )
}
