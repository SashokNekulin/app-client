"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var listener_1 = require("./app/listener");
var main_1 = require("./app/main");
var trey_1 = require("./app/trey");
var power = electron_1.powerSaveBlocker.start('prevent-app-suspension');
if (require('electron-squirrel-startup')) {
    electron_1.app.quit();
}
var gotTheLock = electron_1.app.requestSingleInstanceLock();
if (!gotTheLock) {
    electron_1.app.quit();
}
else {
    electron_1.app.on('second-instance', function (event, commandLine, workingDirectory) {
        if (!main_1.rootApp.mainWindow || main_1.rootApp.mainWindow.isDestroyed()) {
            main_1.rootApp.createWindow();
        }
        else {
            main_1.rootApp.mainWindow.show();
        }
    });
    electron_1.app.on("ready", function () {
        main_1.rootApp.createWindow();
        electron_1.app.on("activate", function () {
            if (electron_1.BrowserWindow.getAllWindows().length === 0)
                main_1.rootApp.createWindow();
        });
    });
    electron_1.app.on("window-all-closed", function () {
        electron_1.powerSaveBlocker.stop(power);
        if (process.platform !== "darwin") {
            electron_1.app.quit();
        }
    });
    listener_1.AppListener.init();
    new trey_1.TrayApp().init();
}
//# sourceMappingURL=index.js.map