import type { getOS } from './getOS'
import type { getPreference } from './getPreference'
import type { getStoreValue } from './getStoreValue'
import type { getUpdates } from './getUpdates'
import type { openFileDialog } from './openFileDialog'
import type { openSaveCsvDialog } from './openSaveCsvDialog'
import type { saveCsvs } from './saveCsvs'
import type { setPreference } from './setPreference'
import type { setStoreValue } from './setStoreValue'
import type { subscribeToStoreValue } from './subscribeToStoreValue'

export * from './getOS'
export * from './getPreference'
export * from './getStoreValue'
export * from './getUpdates'
export * from './openFileDialog'
export * from './openSaveCsvDialog'
export * from './saveCsvs'
export * from './setPreference'
export * from './setStoreValue'
export * from './subscribeToStoreValue'

export interface IElectronAPI {
  readonly getOS: typeof getOS
  readonly getPreference: typeof getPreference
  readonly getStoreValue: typeof getStoreValue
  readonly getUpdates: typeof getUpdates
  readonly openFileDialog: typeof openFileDialog
  readonly openSaveCsvDialog: typeof openSaveCsvDialog
  readonly saveCsvs: typeof saveCsvs
  readonly setPreference: typeof setPreference
  readonly setStoreValue: typeof setStoreValue
  readonly subscribeToStoreValue: typeof subscribeToStoreValue
}
