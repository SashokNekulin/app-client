import { app, BrowserWindow, powerSaveBlocker, Notification} from "electron";
import { AppListener } from "./app/listener";
import { rootApp } from "./app/main";
import { TrayApp } from "./app/trey";

const power = powerSaveBlocker.start('prevent-app-suspension')

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
  powerSaveBlocker.stop(power)
  if (process.platform !== "darwin") {
    app.quit();
  }
});




//app.disableHardwareAcceleration()

AppListener.init()
new TrayApp().init()

