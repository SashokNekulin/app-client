import { app, BrowserWindow, powerSaveBlocker, Notification } from "electron";
import { AppListener } from "./app/listener";
import { rootApp } from "./app/main";
import { TrayApp } from "./app/trey";

const power = powerSaveBlocker.start('prevent-app-suspension')

if (require('electron-squirrel-startup')) {
  app.quit();
}
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {

  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (!rootApp.mainWindow || rootApp.mainWindow.isDestroyed()) {
      rootApp.createWindow()
    } else {
      rootApp.mainWindow.show()
    }
  })
  app.on("ready", () => {
    rootApp.createWindow();
    app.on("activate", function () {
      if (BrowserWindow.getAllWindows().length === 0) rootApp.createWindow();
    });
  });


  app.on("window-all-closed", () => {
    powerSaveBlocker.stop(power)
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  AppListener.init()
  new TrayApp().init()
}



