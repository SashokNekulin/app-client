// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
/*
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld( 'api', {
    send: ( channel:any, data:any ) => ipcRenderer.invoke( channel, data ),
    handle: ( channel:any, callable:any, event:any, data:any ) => ipcRenderer.on( channel, callable( event, data ) )
} )*/
//# sourceMappingURL=preload.js.map