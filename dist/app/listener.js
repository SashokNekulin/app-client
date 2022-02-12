"use strict";
exports.__esModule = true;
exports.AppListener = void 0;
var electron_1 = require("electron");
var Listener = /** @class */ (function () {
    function Listener() {
        this.init = function () {
            electron_1.ipcMain.on('electron_integration', function (e, arg) {
                if (arg.type !== 'CONTACTS:ONLINE')
                    console.log(arg);
            });
        };
    }
    return Listener;
}());
exports.AppListener = new Listener();
//# sourceMappingURL=listener.js.map