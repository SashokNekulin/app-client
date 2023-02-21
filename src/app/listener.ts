import { app, ipcMain } from "electron";
import { callOnlineApp } from "./call_online";
import { rootApp } from "./main";
import { unreadApp } from "./unread";


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
    
                            if (!unreadApp.mainWindow || unreadApp.mainWindow.isDestroyed()) {
                                unreadApp.createWindow()
                            }
                            if (arg.message > 0) {
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
                        case 'ATS_BEELINE_ALL':
                            //console.log('ATS_BEELINE_ALL', arg.message)
                            break;
                        case 'PHONE_CALL_ONLINE':
                            //console.log('PHONE_CALL_ONLINE', arg.message)

                            if (!callOnlineApp.mainWindow || callOnlineApp.mainWindow.isDestroyed()) {
                                callOnlineApp.createWindow()
                            }
                            if (arg.message.length > 0) {
                                callOnlineApp.mainWindow.show()
                            } else {
                                callOnlineApp.mainWindow.hide()
                            }
                            callOnlineApp.mainWindow.webContents.send('asynchronous', arg.message)
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