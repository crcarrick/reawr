import { contextBridge } from 'electron'

import {
  getOS,
  getPreference,
  getStoreValue,
  getUpdates,
  openFileDialog,
  openSaveCsvDialog,
  saveCsvs,
  setPreference,
  setStoreValue,
  subscribeToStoreValue,
} from './api'

contextBridge.exposeInMainWorld('electronAPI', {
  getOS,
  getPreference,
  getStoreValue,
  getUpdates,
  openFileDialog,
  openSaveCsvDialog,
  saveCsvs,
  setPreference,
  setStoreValue,
  subscribeToStoreValue,
})
