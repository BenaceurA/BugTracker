const { ipcMain } = require("electron");
const electron = require("electron");

let { app, BrowserWindow } = electron;

let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadURL(`FILE://${__dirname}/dist/main.html`);

    ipcMain.on("app:quit",()=>{
        app.quit();
    })
    
    ipcMain.on("app:maximize",()=>{
        mainWindow.maximize();
    })
    
    ipcMain.on("app:unmaximize",()=>{
        mainWindow.unmaximize();
    })
    
    ipcMain.on("app:minimize",()=>{
        mainWindow.minimize();
    })
    
    mainWindow.on("maximize",()=>{
        mainWindow.webContents.send("app:maximize");
    })
    
    mainWindow.on("unmaximize",()=>{
        mainWindow.webContents.send("app:unmaximize");
    })
})



