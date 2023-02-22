import { app, ipcMain } from "electron";
import { callOnlineApp } from "./call_online";
import { rootApp } from "./main";
import { unreadApp } from "./unread";
import * as Store from 'electron-store'
const store = new Store();
export const _store = store
export interface ElectronMessage {
    type: string
    message: any 
}

class Listener {

    private sender: Electron.WebContents = null
    private start = true

    init = () => {
        app.on('ready', () => {
            if (this.start) {

                this.start = false
                
                ipcMain.on('electron_integration', (e: Electron.IpcMainEvent, arg: ElectronMessage) => {
                    //console.log(arg.type)
                    switch (arg.type) {
                        case 'START:ELECTRON:INTEGRATION':
                            this.startElectronIntegration(e)
                            break;
                        case 'UNREAD:COUNT':
                            let mes = store.get('mes') || "0"
                            if (!unreadApp.mainWindow || unreadApp.mainWindow.isDestroyed()) {
                                unreadApp.createWindow()
                            }
                            if (arg.message > 0 && mes != "1") {
                                unreadApp.mainWindow.show()
                            } else {
                                unreadApp.mainWindow.hide()
                            }
                            unreadApp.mainWindow.webContents.send('asynchronous-reply', arg.message)
                            break;
                        case 'UNREAD:COUNT:CLICK':
                            if (!rootApp.mainWindow || rootApp.mainWindow.isDestroyed()) {
                                rootApp.createWindow()
                            }
                            rootApp.mainWindow.loadURL('https://app.techno-france.ru/admin/chat')
                            rootApp.mainWindow.show()
                            break;
                        case 'CONF':
                            store.set('ats', arg.message.ats || '0')
                            store.set('mes', arg.message.mes || '0')

                        case 'ATS_BEELINE_ALL':
                            //console.log('ATS_BEELINE_ALL', arg.message)
                            break;
                        case 'PHONE_CALL_ONLINE':
                            let ats = store.get('ats') || "0"
                            //console.log(ats)
                            let newArg = []
                            for (const item of arg.message) {
                                if (item.personality === 'Terminator'){
                                    if (ats === "0"){
                                        newArg.push(item)
                                    } else if (ats === "1") {

                                    } else if (ats === item.pattern){
                                        newArg.push(item)
                                    }
                                }
                            }

                            if (!callOnlineApp.mainWindow || callOnlineApp.mainWindow.isDestroyed()) {
                                callOnlineApp.createWindow()
                            }
                            if (newArg.length > 0) {
                                callOnlineApp.mainWindow.show()
                            } else {
                                callOnlineApp.mainWindow.hide()
                            }
                            callOnlineApp.mainWindow.webContents.send('asynchronous', newArg)
                            break;
                        default:
                            //console.log(arg.type)
                            break;
                    }
                })
            }
        });

    }

    emit(arg: ElectronMessage) {
        if (this.start || !this.sender) {
            console.log('ELECTRON INTEGRATION DISCONECT')
            return
        }
        this.sender.send('electron_integration', arg)
    }

    private startElectronIntegration(e: Electron.IpcMainEvent) {
        this.sender = e.sender
        //console.log('ELECTRON INTEGRATION START')
        // this.emit({ type: 'ADD:ROOM', message: 'ATS:BEELINE:ALL' })
    }


}

export const AppListener = new Listener()