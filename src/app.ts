import * as electron from 'electron';

class ClientApp {
    public app = electron.app;
    public BrowserWindow = electron.BrowserWindow;
    private mainWindow;
    constructor() {
        this.app.on('ready', this.createWindow);
    }

    public createWindow = () => {
        this.mainWindow = new this.BrowserWindow({
            width: 800,
            height: 600,
            title: "Hospital",
        });

        this.mainWindow.loadURL('file://' + __dirname + '/app/index.html');

        this.mainWindow.webContents.openDevTools();

        this.mainWindow.on('closed', function () {
            this.mainWindow = null;
        });
    }
}



// export class Hospital{
//     private app;
//     private browser;
//     constructor(){
//         this.app = electron.app;
//         this.browser = electron.BrowserWindow;
//     }
// }

// const electron = require('electron');
// Module to control application life.

// Module to create native browser window.


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// let mainWindow;



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.


// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});



app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});