import { BrowserWindow, Menu , screen} from "electron";
import * as path from "path";


class ConfApp {
    public mainWindow: BrowserWindow = null
    
    public createWindow = () => {
      const s = screen.getPrimaryDisplay()
      this.mainWindow = new BrowserWindow({
        webPreferences: {
          nodeIntegration: true,
          preload: path.join(__dirname, '..', "preload.js"),
          contextIsolation: false,
          devTools: true
        },
        height: 400,
        width: 400,
        x: s.workAreaSize.width - 400,
        y: s.workAreaSize.height - 400,
        show: false,
        icon: path.join(__dirname, '..', '..', 'src', 'assets', 'favicon-32x32.png'),
        resizable: false,
        center: true,
        paintWhenInitiallyHidden: false
        //transparent: true,
        //titleBarStyle: 'hidden'
      });
      //this.mainWindow.webContents.openDevTools();
      this.mainWindow.loadFile(path.join(__dirname, '..', '..', 'src', 'assets', 'renders', 'configSus', 'index.html'));
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


export const confApp = new ConfApp()