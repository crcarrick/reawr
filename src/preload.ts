import { contextBridge } from 'electron'

import {
  fileIssue,
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
  fileIssue,
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
