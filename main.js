const { app, BrowserWindow, nativeTheme } = require('electron');
const path = require('path');

const isMac = process.platform === 'darwin';

const creatWindow = () => {
	const win = new BrowserWindow({
		titleBarStyle: 'hidden',
		titleBarOverlay: {
			color: '#2f3241',
			symbolColor: '#74b1be',
			height: 30,
		},
		show: false,
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});
	win.loadFile('index.html');

	win.once('ready-to-show', () => {
		win.show();
	});
};

app.whenReady().then(() => {
	creatWindow();
	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

// EMPAQUETAR PROYECTO
//OPCION 1
//para instalar el empaquetador: npm install electron-builder --save-dev
//Configurar en el package.json:
//"dist": "electron-builder" y quedaria de esta forma
/*
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "electron .",
    "dist": "electron-builder"
  },
*/
//luego ejecutar el comando: npm run dist

//OPCION 2
//para instalar empaquetador: npm install -g electron-packager --save-dev
//para empaquedar: electron-packager appdirectory operativa --platform=win32 --arch=x64 --electron-version=1.4.3
/*
 * en appdirectory puede ser solo ".", podemos ignorar "--electron-version=1.4.3"
 */
