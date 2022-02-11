import { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain } from "electron";
import * as path from "path";

const dev = false
const url = "https://app.techno-france.ru"

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow: BrowserWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: false
    },
    height: 600,
    width: 800,
    show: false,
    icon: path.join(__dirname, '..', 'src', 'assets', 'favicon-32x32.png'),
    frame: true
  });

  const menu = Menu.buildFromTemplate([])
  Menu.setApplicationMenu(menu)

  const icon = nativeImage.createFromPath(path.join(__dirname, '..','src', 'assets', 'favicon-32x32.png'))
  mainWindow.setThumbarButtons([
    {
      tooltip: 'button1',
      icon: icon,
      click() { console.log('button1 clicked') }
    }, {
      tooltip: 'button2',
      icon: icon,
      flags: ['enabled', 'dismissonclick'],
      click() { console.log('button2 clicked.') }
    }
  ])

  mainWindow.loadURL(url);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  if(dev) mainWindow.webContents.openDevTools();

  mainWindow.on('close', (e)=> {
    e.preventDefault()
    mainWindow.hide()
  })
}


app.on("ready", () => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

/** К */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


/** Меню в трее */
let appIcon = null
app.whenReady().then(() => {
  const icon = nativeImage.createFromPath(path.join(__dirname, '..','src', 'assets', 'favicon-32x32.png'))
  appIcon = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Открыть', type: 'normal', click: () => {
        if (!mainWindow || mainWindow.isDestroyed()) {
          createWindow()
        } else {
          mainWindow.show()
        }
      }, icon: path.join(__dirname, '..','src', 'assets', 'favicon-16x16.png')
    },
    {
      label: 'Скрыть', type: 'normal', click: () => {
        mainWindow.hide()
      }
    },
    { type: 'separator' },
    {
      label: 'Выход', type: 'normal', click: () => {
        app.quit();
        app.exit();
      }
    }
  ])

  appIcon.setContextMenu(contextMenu)

  appIcon.on('click', () => {
    if (!mainWindow || mainWindow.isDestroyed()) {
      createWindow()
    } else {
      mainWindow.show()
    }
  })
})

/** Сообщения */
ipcMain.on('electron_integration', (e, arg)=>{
  console.log(arg)
})
