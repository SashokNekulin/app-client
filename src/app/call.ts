import { BrowserWindow, Menu , screen} from "electron";
import * as path from "path";
import { ConfigApp } from "./config";

class CallApp {
    public mainWindow: BrowserWindow = null
    
    public createWindow = () => {
      const s = screen.getPrimaryDisplay()
      this.mainWindow = new BrowserWindow({
        webPreferences: {
          nodeIntegration: true,
          preload: path.join(__dirname, '..', "preload.js"),
          contextIsolation: false,
          //nodeIntegrationInWorker: true
        },
        height: 600,
        width: 350,
        x: s.workAreaSize.width - 345,
        y: s.workAreaSize.height - 595,
        show: false,
        icon: path.join(__dirname, '..', '..', 'src', 'assets', 'favicon-32x32.png'),
        resizable: false,
        center: true,
        //transparent: true,
        //titleBarStyle: 'hidden'
      });
  
      this.mainWindow.loadURL(ConfigApp.url + '/phone/call');
      //this.mainWindow.loadFile(path.join(__dirname, '..', '..', 'src', 'assets', 'renders', 'message', 'index.html' ))

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


export const callApp = new CallApp()