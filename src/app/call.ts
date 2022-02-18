import { BrowserWindow, Menu } from "electron";
import * as path from "path";
import { ConfigApp } from "./config";

class CallApp {
    public mainWindow: BrowserWindow = null
  
    public createWindow = () => {
      this.mainWindow = new BrowserWindow({
        webPreferences: {
          nodeIntegration: true,
          preload: path.join(__dirname, "preload.js"),
          contextIsolation: false,
          //nodeIntegrationInWorker: true
        },
        height: 600,
        width: 350,
        show: false,
        icon: path.join(__dirname, '..', '..', 'src', 'assets', 'favicon-32x32.png'),
        resizable: false,
        center: true,
        title: ' '
      });
  
      this.mainWindow.loadURL(ConfigApp.url + '/phone/call');
  
      this.mainWindow.once('ready-to-show', () => {
        this.mainWindow.show()
      })
  
      if(ConfigApp.dev) this.mainWindow.webContents.openDevTools();
  
      this.mainWindow.on('close', (e)=> {
        e.preventDefault()
        this.mainWindow.hide()
      })
      const menu = Menu.buildFromTemplate([])
      Menu.setApplicationMenu(menu)
    }
}


export const callApp = new CallApp()