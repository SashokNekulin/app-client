"use strict";
exports.__esModule = true;
exports.rootApp = void 0;
var electron_1 = require("electron");
var path = require("path");
var config_1 = require("./config");
var RootApp = /** @class */ (function () {
    function RootApp() {
        var _this = this;
        this.mainWindow = null;
        this.createWindow = function () {
            _this.mainWindow = new electron_1.BrowserWindow({
                webPreferences: {
                    nodeIntegration: true,
                    preload: path.join(__dirname, "preload.js"),
                    contextIsolation: false
                },
                height: 800,
                width: 1200,
                show: false,
                icon: path.join(__dirname, '..', '..', 'src', 'assets', 'favicon-32x32.png'),
                frame: true
            });
            _this.mainWindow.loadURL(config_1.ConfigApp.url);
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
    return RootApp;
}());
exports.rootApp = new RootApp();
//# sourceMappingURL=main.js.map