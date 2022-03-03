"use strict";
exports.__esModule = true;
exports.AppListener = void 0;
var electron_1 = require("electron");
var unread_1 = require("./unread");
var Listener = /** @class */ (function () {
    function Listener() {
        var _this = this;
        this.sender = null;
        this.start = true;
        this.init = function () {
            if (_this.start) {
                _this.start = false;
                electron_1.ipcMain.on('electron_integration', function (e, arg) {
                    switch (arg.type) {
                        case 'START:ELECTRON:INTEGRATION':
                            _this.startElectronIntegration(e);
                            break;
                        case 'UNREAD:COUNT':
                            if (!unread_1.unreadApp.mainWindow || unread_1.unreadApp.mainWindow.isDestroyed()) {
                                unread_1.unreadApp.createWindow();
                            }
                            if (arg.message > 0) {
                                unread_1.unreadApp.mainWindow.show();
                            }
                            else {
                                unread_1.unreadApp.mainWindow.hide();
                            }
                            unread_1.unreadApp.mainWindow.webContents.send('asynchronous-reply', arg.message);
                            break;
                        case 'ATS_BEELINE_ALL':
                            //console.log('ATS_BEELINE_ALL', arg.message)
                            break;
                        default:
                            //console.log(arg.type)
                            break;
                    }
                });
            }
        };
    }
    Listener.prototype.emit = function (arg) {
        if (this.start || !this.sender) {
            console.log('ELECTRON INTEGRATION DISCONECT');
            return;
        }
        this.sender.send('electron_integration', arg);
    };
    Listener.prototype.startElectronIntegration = function (e) {
        this.sender = e.sender;
        //console.log('ELECTRON INTEGRATION START')
        // this.emit({ type: 'ADD:ROOM', message: 'ATS:BEELINE:ALL' })
    };
    return Listener;
}());
exports.AppListener = new Listener();
//# sourceMappingURL=listener.js.map