import { ipcMain } from "electron";


export interface ElectronMessage {
    type: string
    message: any
}

class Listener {


    init = () => {
        ipcMain.on('electron_integration', (e: Electron.IpcMainEvent, arg: ElectronMessage) => {
            if(arg.type !== 'CONTACTS:ONLINE') console.log(arg)
        })
    }

}

export const AppListener = new Listener()