import { BrowserWindow, Menu, screen } from "electron";
import * as path from "path";
import * as Store from 'electron-store'
const store = new Store();

class CallOnlineApp {

    public mainWindow: BrowserWindow = null

    public createWindow = () => {

        const s = screen.getPrimaryDisplay()
        const dx = store.get('dxo') ? Number(store.get('dxo')) : s.workAreaSize.width - 800
        const dy = store.get('dyo') ? Number(store.get('dyo')) : s.workAreaSize.height - 800

        this.mainWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,
                preload: path.join(__dirname, '..', "preload.js"),
                contextIsolation: false,
                devTools: true
            },
            width: 400,
            height: 150,
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

        this.mainWindow.loadFile(path.join(__dirname, '..', '..', 'src', 'assets', 'renders', 'callOnline', 'index.html'))

        this.mainWindow.once('ready-to-show', () => {
            this.mainWindow.show()
        })


        this.mainWindow.on('close', (e) => {
            e.preventDefault()
            this.mainWindow.hide()
        })
        this.mainWindow.on('move', () => {
            const position = this.mainWindow.getPosition()
            store.set('dxo', position[0])
            store.set('dyo', position[1])

        })
        const menu = Menu.buildFromTemplate([])
        Menu.setApplicationMenu(menu)

    }
}


export const callOnlineApp = new CallOnlineApp();