"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var dev = false;
var url = "https://app.techno-france.ru";
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    electron_1.app.quit();
}
var mainWindow = null;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: false
        },
        height: 600,
        width: 800,
        show: false,
        icon: path.join(__dirname, '..', 'src', 'assets', 'favicon-32x32.png'),
        frame: true
    });
    var menu = electron_1.Menu.buildFromTemplate([]);
    electron_1.Menu.setApplicationMenu(menu);
    var icon = electron_1.nativeImage.createFromPath(path.join(__dirname, '..', 'src', 'assets', 'favicon-32x32.png'));
    mainWindow.setThumbarButtons([
        {
            tooltip: 'button1',
            icon: icon,
            click: function () { console.log('button1 clicked'); }
        }, {
            tooltip: 'button2',
            icon: icon,
            flags: ['enabled', 'dismissonclick'],
            click: function () { console.log('button2 clicked.'); }
        }
    ]);
    mainWindow.loadURL(url);
    mainWindow.once('ready-to-show', function () {
        mainWindow.show();
    });
    if (dev)
        mainWindow.webContents.openDevTools();
    mainWindow.on('close', function (e) {
        e.preventDefault();
        mainWindow.hide();
    });
}
electron_1.app.on("ready", function () {
    createWindow();
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
/** К */
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
/** Меню в трее */
var appIcon = null;
electron_1.app.whenReady().then(function () {
    var icon = electron_1.nativeImage.createFromPath(path.join(__dirname, '..', 'src', 'assets', 'favicon-32x32.png'));
    appIcon = new electron_1.Tray(icon);
    var contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: 'Открыть', type: 'normal', click: function () {
                if (!mainWindow || mainWindow.isDestroyed()) {
                    createWindow();
                }
                else {
                    mainWindow.show();
                }
            }, icon: path.join(__dirname, '..', 'src', 'assets', 'favicon-16x16.png')
        },
        {
            label: 'Скрыть', type: 'normal', click: function () {
                mainWindow.hide();
            }
        },
        { type: 'separator' },
        {
            label: 'Выход', type: 'normal', click: function () {
                electron_1.app.quit();
                electron_1.app.exit();
            }
        }
    ]);
    appIcon.setContextMenu(contextMenu);
    appIcon.on('click', function () {
        if (!mainWindow || mainWindow.isDestroyed()) {
            createWindow();
        }
        else {
            mainWindow.show();
        }
    });
});
/** Сообщения */
electron_1.ipcMain.on('electron_integration', function (e, arg) {
    console.log(arg);
});
//# sourceMappingURL=index.js.map