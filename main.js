// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')

const {autoUpdater} = require('electron-updater')
require('electron-debug')({showDevTools: true, enabled: true});
// autoUpdater.updateConfigPath = path.join(_path to app-update.yml_);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// app.on('ready', createWindow)

app.on('ready', function() {
    createWindow()
    autoUpdater.checkForUpdates();
});

autoUpdater.on('update-downloaded', (info) => {
  //mainWindow.webContents.send('updateReady')
  console.log("updated...!");
  autoUpdater.quitAndInstall();
});

setTimeout(() => {
  console.log("timmer...!")
    // autoUpdater
}, 1000);

// when receiving a quitAndInstall signal, quit and install the new version ;)
ipcMain.on("quitAndInstall", (event, arg) => {
    autoUpdater.quitAndInstall();
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

