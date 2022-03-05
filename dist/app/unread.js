"use strict";
exports.__esModule = true;
exports.unreadApp = void 0;
var electron_1 = require("electron");
var path = require("path");
var config_1 = require("./config");
var UnreadApp = /** @class */ (function () {
    function UnreadApp() {
        var _this = this;
        this.mainWindow = null;
        this.createWindow = function () {
            var s = electron_1.screen.getPrimaryDisplay();
            _this.mainWindow = new electron_1.BrowserWindow({
                webPreferences: {
                    nodeIntegration: true,
                    preload: path.join(__dirname, '..', "preload.js"),
                    contextIsolation: false
                },
                width: 70,
                height: 100,
                x: s.workAreaSize.width - 70,
                y: s.workAreaSize.height - 200,
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
            //this.mainWindow.loadURL(ConfigApp.url + '/phone/call');
            _this.mainWindow.loadFile(path.join(__dirname, '..', '..', 'src', 'assets', 'renders', 'message', 'index.html'));
            _this.mainWindow.once('ready-to-show', function () {
                _this.mainWindow.show();
            });
            if (config_1.ConfigApp.dev)
                _this.mainWindow.webContents.openDevTools();
            _this.mainWindow.on('close', function (e) {
                e.preventDefault();
                _this.mainWindow.hide();
            });
            var menu = electron_1.Menu.buildFromTemplate([]);
            electron_1.Menu.setApplicationMenu(menu);
        };
    }
    return UnreadApp;
}());
exports.unreadApp = new UnreadApp();
//# sourceMappingURL=unread.js.map