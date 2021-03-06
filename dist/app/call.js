"use strict";
exports.__esModule = true;
exports.callApp = void 0;
var electron_1 = require("electron");
var path = require("path");
var config_1 = require("./config");
var CallApp = /** @class */ (function () {
    function CallApp() {
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
                height: 600,
                width: 350,
                x: s.workAreaSize.width - 345,
                y: s.workAreaSize.height - 595,
                show: false,
                icon: path.join(__dirname, '..', '..', 'src', 'assets', 'favicon-32x32.png'),
                resizable: false,
                center: true
            });
            _this.mainWindow.loadURL(config_1.ConfigApp.url + '/phone/call');
            //this.mainWindow.loadFile(path.join(__dirname, '..', '..', 'src', 'assets', 'renders', 'message', 'index.html' ))
            _this.mainWindow.once('ready-to-show', function () {
                _this.mainWindow.show();
            });
            _this.mainWindow.on('close', function (e) {
                e.preventDefault();
                _this.mainWindow.hide();
            });
            var menu = electron_1.Menu.buildFromTemplate([]);
            electron_1.Menu.setApplicationMenu(menu);
        };
    }
    return CallApp;
}());
exports.callApp = new CallApp();
//# sourceMappingURL=call.js.map