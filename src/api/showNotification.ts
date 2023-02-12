import { ipcMain, ipcRenderer } from 'electron'

export function showNotification(
  options: Electron.NotificationConstructorOptions
) {
  ipcRenderer.invoke('show:notification', options)
}

export function handleShowNotification(
  createNotification: (
    options: Electron.NotificationConstructorOptions
  ) => Electron.Notification
) {
  ipcMain.handle(
    'show:notification',
    (
      _event: Electron.IpcMainEvent,
      options: Electron.NotificationConstructorOptions
    ) => {
      createNotification({ silent: true, ...options }).show()
    }
  )
}
