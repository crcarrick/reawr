import fs from 'fs'
import path from 'path'
import { platform } from 'os'

import { init as sentryInit } from '@sentry/electron/main'
import {
  app,
  autoUpdater,
  BrowserWindow,
  Notification,
  protocol,
} from 'electron'
import pluralize from 'pluralize'
import updateApp from 'update-electron-app'

import {
  handleGetOS,
  handleGetPreference,
  handleGetStoreValue,
  handleGetUpdates,
  handleOpenFileDialog,
  handleOpenSaveCsvDialog,
  handleParsePath,
  handleSaveCsvs,
  handleSetPreference,
  handleSetStoreValue,
  handleShowNotification,
  handleSubscribeToStoreValue,
} from './api'
import { isMac } from './detectPlatform'
import { store } from './store'
import { fileHandler } from './utils'
import { createExcel } from './utils/createExcel'

// electron-forge injected constants
declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// windows shortcuts
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 768,
    width: 1024,
    show: false,
    frame: isMac ? false : true,
    titleBarStyle: isMac ? 'hidden' : 'default',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  if (process.env.NODE_ENV === 'development')
    mainWindow.webContents.openDevTools()
  if (process.env.NODE_ENV === 'production') mainWindow.setMenu(null)
}

function showNotification(body: string, err = false) {
  new Notification({
    title: err ? 'Error 😭' : 'Success ✅',
    body,
    silent: true,
  }).show()
}

// init sentry
declare const SENTRY_DSN: string

sentryInit({
  dsn: SENTRY_DSN,
  debug: true,
  autoSessionTracking: false,
  onFatalError: (err) => {
    console.error('Fatal Sentry error 💣')
    console.error(err.message)
    console.error(err.stack)
  },
})

// ipc handlers
handleGetOS(platform)
handleGetPreference(store)
handleGetStoreValue(store)
handleGetUpdates(autoUpdater)
handleOpenFileDialog()
handleOpenSaveCsvDialog(async ({ data, filePath }) => {
  // TODO: Move out of this main file
  try {
    await createExcel(data).xlsx.writeFile(filePath)

    showNotification('Exported 1 recording')
  } catch {
    showNotification('Export failed', true)
  }
})
handleParsePath(path.parse)
handleSaveCsvs(async ({ data, dir }) => {
  // TODO: Move out of this main file
  try {
    for (const { name, meta } of data) {
      let next = 1
      let filePath = path.join(dir, `${name}.xlsx`)

      // append (1) etc to the filename if a
      // file with that name exists already
      if (fs.existsSync(filePath)) {
        filePath = filePath.replace('.xlsx', ` (${next}).xlsx`)

        while (fs.existsSync(filePath)) {
          filePath = filePath.replace(`(${next}).xlsx`, `(${++next}).xlsx`)
        }
      }

      await createExcel(meta).xlsx.writeFile(filePath)
    }

    showNotification(`Exported ${pluralize('recording', data.length, true)}`)
  } catch {
    showNotification('Export failed', true)
  }
})
handleSetPreference(store)
handleSetStoreValue(store)
handleShowNotification((options) => new Notification(options))
handleSubscribeToStoreValue(store)

app.on('ready', () => {
  // check for updates
  updateApp({ notifyUser: true })

  // register a custom protocol for loading files from the filesystem
  protocol.registerFileProtocol('reawr', fileHandler)

  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
