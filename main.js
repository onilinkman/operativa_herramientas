const {app,BrowserWindow, Menu}=require('electron')
const path=require('path');
const { setupTitlebar, attachTitlebarToWindow } = require('custom-electron-titlebar/main');

setupTitlebar()

const creatWindow=()=>{
    const win=new BrowserWindow({
        titleBarStyle: 'hidden',
        
        width:800,
        height:600,
        webPreferences:{
            preload: path.join(__dirname,'preload.js')
        }
    })

    const menu = Menu.buildFromTemplate(exampleMenuTemplate());
    Menu.setApplicationMenu(menu);

    win.loadFile('index.html')
    attachTitlebarToWindow(win);
}

app.whenReady().then(()=>{
    creatWindow()
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
      })
})

app.on('window-all-closed',()=>{
    if(process.platform!=='darwin') app.quit()
})


const exampleMenuTemplate = () => [
    {
      label: "Simple Options",
      submenu: [
        {
          label: "Quit",
          click: () => app.quit()
        },
        {
          label: "Radio1",
          type: "radio",
          checked: true
        },
        {
          label: "Radio2",
          type: "radio",
        },
        {
          label: "Checkbox1",
          type: "checkbox",
          checked: true,
          click: (item) => {
            console.log("item is checked? " + item.checked);
          }
        },
        { type: "separator" },
        {
          label: "Checkbox2",
          type: "checkbox",
          checked: false,
          click: (item) => {
            console.log("item is checked? " + item.checked);
          }
        }
      ]
    },
    {
      label: "Advanced Options",
      submenu: [
        {
          label: "Quit",
          click: () => app.quit()
        },
        {
          label: "Radio1",
          type: "radio",
          checked: true
        },
        {
          label: "Radio2",
          type: "radio",
        },
        {
          label: "Checkbox1",
          type: "checkbox",
          checked: true,
          click: (item) => {
            console.log("item is checked? " + item.checked);
          }
        },
        { type: "separator" },
        {
          label: "Checkbox2",
          type: "checkbox",
          checked: false,
          click: (item) => {
            console.log("item is checked? " + item.checked);
          }
        },
        {
          label: "Radio Test",
          submenu: [
            {
              label: "Sample Checkbox",
              type: "checkbox",
              checked: true
            },
            {
              label: "Radio1",
              checked: true,
              type: "radio"
            },
            {
              label: "Radio2",
              type: "radio"
            },
            {
              label: "Radio3",
              type: "radio"
            },
            { type: "separator" },
            {
              label: "Radio1",
              checked: true,
              type: "radio"
            },
            {
              label: "Radio2",
              type: "radio"
            },
            {
              label: "Radio3",
              type: "radio"
            }
          ]
        },
        {
          label: "zoomIn",
          role: "zoomIn"
        },
        {
          label: "zoomOut",
          role: "zoomOut"
        },
        {
          label: "Radio1",
          type: "radio"
        },
        {
          label: "Radio2",
          checked: true,
          type: "radio"
        },
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { type: "separator" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { role: "resetZoom" },
        { role: "toggleDevTools" }
      ],
    }
  ];