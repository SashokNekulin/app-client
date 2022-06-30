import { BrowserWindow, Menu} from "electron";
import * as path from "path";
import { ConfigApp } from "./config";


class RootApp {

    public mainWindow: BrowserWindow = null
  
    public createWindow = () => {
      this.mainWindow = new BrowserWindow({
        webPreferences: {
          nodeIntegration: false,
          preload: path.join(__dirname, '..', "preload.js"),
          contextIsolation: false,
          javascript: true,
          webSecurity: false,
          allowRunningInsecureContent: true,
        },
        height: 800,
        width: 1200,
        show: false,
        icon: path.join(__dirname, '..', '..', 'src', 'assets', 'favicon-32x32.png'),
        frame: true
      });



      this.mainWindow.loadURL(ConfigApp.url);
  
      this.mainWindow.once('ready-to-show', () => {
        this.mainWindow.show()
      })
  
  
      this.mainWindow.on('close', (e)=> {
        e.preventDefault()
        this.mainWindow.hide()
      })

      const menu = Menu.buildFromTemplate([])
      Menu.setApplicationMenu(menu)
    }
  }
  
export const rootApp = new RootApp()