import { ipcMain, ipcRenderer } from 'electron'

import type Store from 'electron-store'

import type { IStore } from '../store'

export function setStoreValue<K extends keyof IStore>(
  key: K,
  value: IStore[K]
): Promise<void> {
  return ipcRenderer.invoke('store:set', key, value)
}

export function handleSetStoreValue(store: Store<IStore>) {
  ipcMain.handle(
    'store:set',
    <T extends keyof IStore>(
      _event: Electron.IpcMainEvent,
      key: T,
      value: IStore[T]
    ) => {
      store.set(key, value)
    }
  )
}
