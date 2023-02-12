import { ipcMain, ipcRenderer } from 'electron'

import type Store from 'electron-store'

import type { IStore } from '../store'

export function getPreference<K extends keyof IStore['preferences']>(
  key: K,
  defaultValue?: IStore['preferences'][K]
): Promise<IStore['preferences'][K]> {
  return ipcRenderer.invoke('store:preferences:get', key, defaultValue)
}

export function handleGetPreference(store: Store<IStore>) {
  ipcMain.handle(
    'store:preferences:get',
    <T extends keyof IStore['preferences']>(
      _event: Electron.IpcMainEvent,
      key: T,
      defaultValue?: IStore['preferences'][T]
    ) => {
      return store.get('preferences.' + key, defaultValue)
    }
  )
}
