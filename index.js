const electron = require('electron')
const express = require('express')

function createWindow () {
  const win = new electron.BrowserWindow({
    width: 960,
    height: 540,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('index.html')
}
const app = express()

const init = () => {
  createWindow()
  electron.ipcMain.on('create', (e, d) => {
    if(d[1] === undefined) {    
      e.returnValue = 1
      return
    }
    if(parseInt(d[0]).toString() !== d[0] || parseInt(d[0]) < 1025 || parseInt(d[0]) > 49151) {    
      e.returnValue = 2
      return
    }
    app.use(express.static(d[1]))
    app.listen(d[0])
    e.returnValue = 0
  })
}

electron.app.on('ready', init)
