"use strict";
exports.__esModule = true;
exports.unreadApp = void 0;
var electron_1 = require("electron");
var path = require("path");
var Store = require("electron-store");
var store = new Store();
var UnreadApp = /** @class */ (function () {
    function UnreadApp() {
        var _this = this;
        this.mainWindow = null;
        this.createWindow = function () {
            var s = electron_1.screen.getPrimaryDisplay();
            var dx = store.get('dx') ? Number(store.get('dx')) : s.workAreaSize.width - 70;
            var dy = store.get('dy') ? Number(store.get('dy')) : s.workAreaSize.height - 200;
            _this.mainWindow = new electron_1.BrowserWindow({
                webPreferences: {
                    nodeIntegration: true,
                    preload: path.join(__dirname, '..', "preload.js"),
                    contextIsolation: false
                },
                width: 70,
                height: 100,
                x: dx,
                y: dy,
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
            //if(ConfigApp.dev) this.mainWindow.webContents.openDevTools();
            _this.mainWindow.on('close', function (e) {
                e.preventDefault();
                _this.mainWindow.hide();
            });
            _this.mainWindow.on('move', function () {
                var position = _this.mainWindow.getPosition();
                store.set('dx', position[0]);
                store.set('dy', position[1]);
            });
            var menu = electron_1.Menu.buildFromTemplate([]);
            electron_1.Menu.setApplicationMenu(menu);
        };
    }
    return UnreadApp;
}());
exports.unreadApp = new UnreadApp();
//# sourceMappingURL=unread.js.map