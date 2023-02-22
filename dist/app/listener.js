"use strict";
exports.__esModule = true;
exports.AppListener = exports._store = void 0;
var electron_1 = require("electron");
var call_online_1 = require("./call_online");
var main_1 = require("./main");
var unread_1 = require("./unread");
var Store = require("electron-store");
var store = new Store();
exports._store = store;
var Listener = /** @class */ (function () {
    function Listener() {
        var _this = this;
        this.sender = null;
        this.start = true;
        this.init = function () {
            electron_1.app.on('ready', function () {
                if (_this.start) {
                    _this.start = false;
                    electron_1.ipcMain.on('electron_integration', function (e, arg) {
                        //console.log(arg.type)
                        switch (arg.type) {
                            case 'START:ELECTRON:INTEGRATION':
                                _this.startElectronIntegration(e);
                                break;
                            case 'UNREAD:COUNT':
                                var mes = store.get('mes') || "0";
                                if (!unread_1.unreadApp.mainWindow || unread_1.unreadApp.mainWindow.isDestroyed()) {
                                    unread_1.unreadApp.createWindow();
                                }
                                if (arg.message > 0 && mes != "1") {
                                    unread_1.unreadApp.mainWindow.show();
                                }
                                else {
                                    unread_1.unreadApp.mainWindow.hide();
                                }
                                unread_1.unreadApp.mainWindow.webContents.send('asynchronous-reply', arg.message);
                                break;
                            case 'UNREAD:COUNT:CLICK':
                                if (!main_1.rootApp.mainWindow || main_1.rootApp.mainWindow.isDestroyed()) {
                                    main_1.rootApp.createWindow();
                                }
                                main_1.rootApp.mainWindow.loadURL('https://app.techno-france.ru/admin/chat');
                                main_1.rootApp.mainWindow.show();
                                break;
                            case 'CONF':
                                store.set('ats', arg.message.ats || '0');
                                store.set('mes', arg.message.mes || '0');
                            case 'ATS_BEELINE_ALL':
                                //console.log('ATS_BEELINE_ALL', arg.message)
                                break;
                            case 'PHONE_CALL_ONLINE':
                                var ats = store.get('ats') || "0";
                                //console.log(ats);
                                var newArg = [];
                                for (var _i = 0, _a = arg.message; _i < _a.length; _i++) {
                                    var item = _a[_i];
                                    if (item.personality === 'Terminator') {
                                        if (ats === "0") {
                                            newArg.push(item);
                                        }
                                        else if (ats === "1") {
                                        }
                                        else if (ats === item.pattern) {
                                            newArg.push(item);
                                        }
                                    }
                                }
                                if (!call_online_1.callOnlineApp.mainWindow || call_online_1.callOnlineApp.mainWindow.isDestroyed()) {
                                    call_online_1.callOnlineApp.createWindow();
                                }
                                if (newArg.length > 0) {
                                    call_online_1.callOnlineApp.mainWindow.show();
                                }
                                else {
                                    call_online_1.callOnlineApp.mainWindow.hide();
                                }
                                call_online_1.callOnlineApp.mainWindow.webContents.send('asynchronous', newArg);
                                break;
                            default:
                                //console.log(arg.type)
                                break;
                        }
                    });
                }
            });
        };
    }
    Listener.prototype.emit = function (arg) {
        if (this.start || !this.sender) {
            //console.log('ELECTRON INTEGRATION DISCONECT');
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