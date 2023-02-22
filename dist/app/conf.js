"use strict";
exports.__esModule = true;
exports.confApp = void 0;
var electron_1 = require("electron");
var path = require("path");
var ConfApp = /** @class */ (function () {
    function ConfApp() {
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
                height: 400,
                width: 400,
                x: s.workAreaSize.width - 400,
                y: s.workAreaSize.height - 400,
                show: false,
                icon: path.join(__dirname, '..', '..', 'src', 'assets', 'favicon-32x32.png'),
                resizable: false,
                center: true,
                paintWhenInitiallyHidden: false
                //transparent: true,
                //titleBarStyle: 'hidden'
            });
            //this.mainWindow.webContents.openDevTools();
            _this.mainWindow.loadFile(path.join(__dirname, '..', '..', 'src', 'assets', 'renders', 'configSus', 'index.html'));
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
    return ConfApp;
}());
exports.confApp = new ConfApp();
//# sourceMappingURL=conf.js.map