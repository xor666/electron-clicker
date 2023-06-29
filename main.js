const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Cree la fenetre du navigateur.
  const win = new BrowserWindow({
    //fullscreen: true,
    reSizable: false,
    width:1439,
    height:624,
    backgroundColor: '#2c2f33',
    autoHideMenuBar:true,
    // icon: path.join(__dirname, 'pokeball.png'),
    icon: __dirname + './renderer/Assets/Fav/pokeball.png',
    webPreferences: {
      nodeIntegration: true
    }
  })

let contents = win.webContents
console.log(contents)

  // et charger le fichier index.html de l'application.
  win.loadFile('./renderer/main/main.html')

  // Ouvre les DevTools au départ.
   // win.webContents.openDevTools()
}

// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quant cet événement est émit.
app.whenReady().then(createWindow)

// Quitter lorsque toutes les fenêtres sont fermées, sauf sur macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// Dans ce fichier, vous pouvez inclure le reste de votre code spécifique au processus principal. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.
