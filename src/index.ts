import { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain } from "electron";
import * as path from "path";
import { AppListener } from "./app/listener";
import { rootApp } from "./app/main";
import { TrayApp } from "./app/trey";



if (require('electron-squirrel-startup')) {
  app.quit();
}



app.on("ready", () => {
  rootApp.createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) rootApp.createWindow();
  });
});


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

AppListener.init()
new TrayApp().init()


