import type { fileIssue } from './fileIssue'
import type { getOS } from './getOS'
import type { getPreference } from './getPreference'
import type { getStoreValue } from './getStoreValue'
import type { getUpdates } from './getUpdates'
import type { openFileDialog } from './openFileDialog'
import type { openSaveCsvDialog } from './openSaveCsvDialog'
import type { parsePath } from './parsePath'
import type { saveCsvs } from './saveCsvs'
import type { setPreference } from './setPreference'
import type { setStoreValue } from './setStoreValue'
import type { showNotification } from './showNotification'
import type { subscribeToStoreValue } from './subscribeToStoreValue'

export * from './fileIssue'
export * from './getOS'
export * from './getPreference'
export * from './getStoreValue'
export * from './getUpdates'
export * from './openFileDialog'
export * from './openSaveCsvDialog'
export * from './parsePath'
export * from './saveCsvs'
export * from './setPreference'
export * from './setStoreValue'
export * from './showNotification'
export * from './subscribeToStoreValue'

export interface IElectronAPI {
  readonly fileIssue: typeof fileIssue
  readonly getOS: typeof getOS
  readonly getPreference: typeof getPreference
  readonly getStoreValue: typeof getStoreValue
  readonly getUpdates: typeof getUpdates
  readonly openFileDialog: typeof openFileDialog
  readonly openSaveCsvDialog: typeof openSaveCsvDialog
  readonly parsePath: typeof parsePath
  readonly saveCsvs: typeof saveCsvs
  readonly setPreference: typeof setPreference
  readonly setStoreValue: typeof setStoreValue
  readonly showNotification: typeof showNotification
  readonly subscribeToStoreValue: typeof subscribeToStoreValue
}
