import { ipcMain, ipcRenderer } from 'electron'

import type Store from 'electron-store'

import type { IStore } from '../store'

export function getStoreValue<K extends keyof IStore>(
  key: K,
  defaultValue?: IStore[K]
): Promise<IStore[K]> {
  return ipcRenderer.invoke('store:get', key, defaultValue)
}

export function handleGetStoreValue(store: Store<IStore>) {
  ipcMain.handle(
    'store:get',
    <T extends keyof IStore>(
      _event: Electron.IpcMainEvent,
      key: T,
      defaultValue?: IStore[T]
    ) => {
      return store.get(key, defaultValue)
    }
  )
}
