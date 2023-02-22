"use strict";
exports.__esModule = true;
exports.TrayApp = void 0;
var electron_1 = require("electron");
var path = require("path");
var conf_1 = require("./conf");
var main_1 = require("./main");
var listener_1 = require("./listener");
var TrayApp = /** @class */ (function () {
    function TrayApp() {
        this.init = function () {
            var appIcon = null;
            electron_1.app.whenReady().then(function () {
                var icon = electron_1.nativeImage.createFromPath(path.join(__dirname, '..', '..', 'src', 'assets', 'favicon-32x32.png'));
                appIcon = new electron_1.Tray(icon);
                var contextMenu = electron_1.Menu.buildFromTemplate([
                    {
                        label: 'Открыть', type: 'normal', click: function () {
                            if (!main_1.rootApp.mainWindow || main_1.rootApp.mainWindow.isDestroyed()) {
                                main_1.rootApp.createWindow();
                            }
                            else {
                                main_1.rootApp.mainWindow.show();
                            }
                        }, icon: path.join(__dirname, '..', '..', 'src', 'assets', 'favicon-16x16.png')
                    },
                    {
                        label: 'Скрыть', type: 'normal', click: function () {
                            main_1.rootApp.mainWindow.hide();
                        }
                    },
                    //confApp
                    {
                        label: 'Настройки', type: 'normal', click: function () {
                            if (!conf_1.confApp.mainWindow || conf_1.confApp.mainWindow.isDestroyed()) {
                                conf_1.confApp.createWindow();
                            }
                            else {
                                var arg = {
                                    ats: (listener_1._store.get('ats') || '0'),
                                    mes: (listener_1._store.get('mes') || '0')
                                };
                                conf_1.confApp.mainWindow.show();
                                conf_1.confApp.mainWindow.webContents.send('asynchronous-in', arg);
                            }
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
                    if (!main_1.rootApp.mainWindow || main_1.rootApp.mainWindow.isDestroyed()) {
                        main_1.rootApp.createWindow();
                    }
                    else {
                        main_1.rootApp.mainWindow.show();
                    }
                });
            });
        };
    }
    return TrayApp;
}());
exports.TrayApp = TrayApp;
//# sourceMappingURL=trey.js.map