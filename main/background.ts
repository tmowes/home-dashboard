import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import fs from 'fs'

import { createWindow } from './helpers'

const WIDTH = 1920 / 2
const HEIGHT = 1080

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

// eslint-disable-next-line prettier/prettier
(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    autoHideMenuBar: true,
    frame: false,
    minWidth: WIDTH,
    width: WIDTH,
    maxWidth: WIDTH,
    minHeight: HEIGHT,
    height: HEIGHT,
    maxHeight: HEIGHT,
    transparent: true,
  })

  const gotTheLock = app.requestSingleInstanceLock()

  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', () => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
      }
    })
  }

  const storage = 'storage/local-db.json'
  const folderExists = fs.existsSync(storage)
  if (!folderExists) {
    const folder = storage.split('/').slice(0, -1).join('/')
    fs.mkdirSync(folder, { recursive: true })
    fs.writeFileSync(storage, '{}', { encoding: 'utf-8' })
  }

  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }

  ipcMain.on('minimize-window', () => {
    mainWindow.minimize()
  })

  ipcMain.on('close-window', () => {
    app.quit()
  })
})()

app.on('window-all-closed', () => {
  app.quit()
})
