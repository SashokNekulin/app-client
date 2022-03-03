import { app, Menu, Tray, nativeImage } from "electron";
import * as path from "path";
import { callApp } from "./call";
import { rootApp } from "./main";

export class TrayApp {
    init = () => {
        let appIcon = null
        app.whenReady().then(() => {
            const icon = nativeImage.createFromPath(path.join(__dirname, '..', '..', 'src', 'assets', 'favicon-32x32.png'))
            appIcon = new Tray(icon)
            const contextMenu = Menu.buildFromTemplate([
                {
                    label: 'Открыть', type: 'normal', click: () => {
                        if (!rootApp.mainWindow || rootApp.mainWindow.isDestroyed()) {
                            rootApp.createWindow()
                        } else {
                            rootApp.mainWindow.show()
                        }
                    }, icon: path.join(__dirname, '..', '..', 'src', 'assets', 'favicon-16x16.png')
                },
                {
                    label: 'Скрыть', type: 'normal', click: () => {
                        rootApp.mainWindow.hide()
                    }
                },
                //callApp
                /*{
                    label: 'Позвонить', type: 'normal', click: () => {
                        if (!callApp.mainWindow || callApp.mainWindow.isDestroyed()) {
                            callApp.createWindow()
                        } else {
                            callApp.mainWindow.show()
                        }
                    }
                },*/
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
                if (!rootApp.mainWindow || rootApp.mainWindow.isDestroyed()) {
                    rootApp.createWindow()
                } else {
                    rootApp.mainWindow.show()
                }
            })
        })
    }
}