import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
} from 'electron'
import Store from 'electron-store'

export default function createWindow(
  windowName: string,
  options: BrowserWindowConstructorOptions,
): BrowserWindow {
  const key = 'window-state'
  const name = `window-state-${windowName}`
  const store = new Store({ name })
  const defaultSize = {
    width: options.width,
    height: options.height,
  }
  let state = {}
  let win: BrowserWindow

  const restore = () => store.get(key, defaultSize)

  const getCurrentPosition = () => {
    const position = win.getPosition()
    const size = win.getSize()
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    }
  }

  const windowWithinBounds = (windowState, bounds) =>
    windowState.x >= bounds.x &&
    windowState.y >= bounds.y &&
    windowState.x + windowState.width <= bounds.x + bounds.width &&
    windowState.y + windowState.height <= bounds.y + bounds.height

  const resetToDefaults = () => {
    const { bounds } = screen.getPrimaryDisplay()
    return {
      ...defaultSize,
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    }
  }

  const ensureVisibleOnSomeDisplay = (windowState) => {
    const visible = screen
      .getAllDisplays()
      .some((display) => windowWithinBounds(windowState, display.bounds))
    if (!visible) {
      return resetToDefaults()
    }
    return windowState
  }

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition())
    }
    store.set(key, state)
  }

  state = ensureVisibleOnSomeDisplay(restore())

  const browserOptions: BrowserWindowConstructorOptions = {
    show: false,
    transparent: true,
    ...options,
    ...state,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nativeWindowOpen: true,
      ...options.webPreferences,
    },
  }
  win = new BrowserWindow(browserOptions)

  win.once('ready-to-show', () => win.show())

  win.on('close', saveState)

  return win
}
