import { contextBridge } from 'electron'

import {
  getOS,
  getPreference,
  getStoreValue,
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
  openFileDialog,
  openSaveCsvDialog,
  saveCsvs,
  setPreference,
  setStoreValue,
  subscribeToStoreValue,
})
