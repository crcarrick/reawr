import { ipcMain, ipcRenderer } from 'electron'

import type Store from 'electron-store'

import type { IStore } from '../store'

/**
 * TODO: There's a memory leak here
 *       Unsubscribe is not really accessible to the caller
 *       Don't use this until fixed
 * */

export function subscribeToStoreValue<K extends keyof IStore>(
  key: K,
  callback: (value: IStore[K]) => void
): Promise<() => void> {
  return ipcRenderer.invoke('store:subscribe', key, callback)
}

export function handleSubscribeToStoreValue(store: Store<IStore>) {
  ipcMain.handle(
    'store:subscribe',
    <K extends keyof IStore>(
      _event: Electron.IpcMainEvent,
      key: K,
      callback: (value: IStore[K]) => void
    ) => {
      return store.onDidChange(key, callback)
    }
  )
}
