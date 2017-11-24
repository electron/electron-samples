const {app, BrowserWindow} = require('electron') // http://electron.atom.io/docs/api
const path = require('path')         // https://nodejs.org/api/path.html
const url = require('url')           // https://nodejs.org/api/url.html

let window = null

function createWindow(){
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 400px
    width: 400,
    // Set the initial height to 500px
    height: 500,
    // Don't show the window until it ready, this prevents any white flickering
    show: false,
    // Don't allow the window to be resized.
    resizable: false,
  })

  // Load a URL in the window to the local index.html path
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  window.on('closed',()=>{
    window = null;
  })

  // Show window when page is ready
  window.once('ready-to-show', () => {
    window.show()
  })
}

// Wait until the app is ready
app.once('ready',createWindow)

//for mac os
app.on('window-all-closed',()=>{
  if(process.platform != 'darwin'){
    app.quit();
  }
})
app.on('activate',()=>{
  if(window == null){
    createWindow();
  }
})
