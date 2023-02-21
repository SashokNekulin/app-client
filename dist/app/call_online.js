"use strict";
exports.__esModule = true;
exports.callOnlineApp = void 0;
var electron_1 = require("electron");
var path = require("path");
var Store = require("electron-store");
var store = new Store();
var CallOnlineApp = /** @class */ (function () {
    function CallOnlineApp() {
        var _this = this;
        this.mainWindow = null;
        this.createWindow = function () {
            var s = electron_1.screen.getPrimaryDisplay();
            var dx = store.get('dxo') ? Number(store.get('dxo')) : s.workAreaSize.width - 800;
            var dy = store.get('dyo') ? Number(store.get('dyo')) : s.workAreaSize.height - 800;
            _this.mainWindow = new electron_1.BrowserWindow({
                webPreferences: {
                    nodeIntegration: true,
                    preload: path.join(__dirname, '..', "preload.js"),
                    contextIsolation: false,
                    devTools: true
                },
                width: 400,
                height: 150,
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
            _this.mainWindow.loadFile(path.join(__dirname, '..', '..', 'src', 'assets', 'renders', 'callOnline', 'index.html'));
            _this.mainWindow.once('ready-to-show', function () {
                _this.mainWindow.show();
            });
            _this.mainWindow.on('close', function (e) {
                e.preventDefault();
                _this.mainWindow.hide();
            });
            _this.mainWindow.on('move', function () {
                var position = _this.mainWindow.getPosition();
                store.set('dxo', position[0]);
                store.set('dyo', position[1]);
            });
            var menu = electron_1.Menu.buildFromTemplate([]);
            electron_1.Menu.setApplicationMenu(menu);
        };
    }
    return CallOnlineApp;
}());
exports.callOnlineApp = new CallOnlineApp();
//# sourceMappingURL=call_online.js.map