import { BrowserWindow, Menu , screen} from "electron";
import * as path from "path";
import { ConfigApp } from "./config";
import * as Store from 'electron-store'
const store = new Store();

class UnreadApp {
    
    public mainWindow: BrowserWindow = null
    
    public createWindow = () => {

      const s = screen.getPrimaryDisplay()
      const dx = store.get('dx') ? Number(store.get('dx')) : s.workAreaSize.width - 70
      const dy = store.get('dy') ? Number(store.get('dy')) : s.workAreaSize.height - 200
      
      this.mainWindow = new BrowserWindow({
        webPreferences: {
          nodeIntegration: true,
          preload: path.join(__dirname, '..', "preload.js"),
          contextIsolation: false
        },
        width: 70,
        height: 100,
        x: dx,
        y: dy,
        show: false,
        icon: path.join(__dirname, '..', '..', 'src', 'assets', 'favicon-32x32.png'),
        resizable: false,
        center: true,
        transparent: true,
        titleBarStyle: 'hidden',
        alwaysOnTop: true,
        type: 'toolbar',
        closable: false,
        minimizable: false,
        paintWhenInitiallyHidden: false
      });
  
      //this.mainWindow.loadURL(ConfigApp.url + '/phone/call');
      this.mainWindow.loadFile(path.join(__dirname, '..', '..', 'src', 'assets', 'renders', 'message', 'index.html' ))

      this.mainWindow.once('ready-to-show', () => {
        this.mainWindow.show()
      })
  
      if(ConfigApp.dev) this.mainWindow.webContents.openDevTools();
  
      this.mainWindow.on('close', (e)=> {
        e.preventDefault()
        this.mainWindow.hide()
      })
      this.mainWindow.on('move', ()=>{
        const position = this.mainWindow.getPosition()
        store.set('dx' , position[0])
        store.set('dy' , position[1])
      })
      const menu = Menu.buildFromTemplate([])
      Menu.setApplicationMenu(menu)
      
    }
}


export const unreadApp = new UnreadApp()