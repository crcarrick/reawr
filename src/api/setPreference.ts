import { ipcMain, ipcRenderer } from 'electron'

import type Store from 'electron-store'

import type { IStore } from '../store'

export function setPreference<K extends keyof IStore['preferences']>(
  key: K,
  value: IStore['preferences'][K]
): Promise<void> {
  return ipcRenderer.invoke('store:preferences:set', key, value)
}

export function handleSetPreference(store: Store<IStore>) {
  ipcMain.handle(
    'store:preferences:set',
    <T extends keyof IStore['preferences']>(
      _event: Electron.IpcMainEvent,
      key: T,
      value: IStore['preferences'][T]
    ) => {
      store.set('preferences.' + key, value)
    }
  )
}
