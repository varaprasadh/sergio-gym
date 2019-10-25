/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { sendWhatsappMessages } from './screens/functions/MessageHandler';

const electron=require('electron');

// import MenuBuilder from './menu';
const path= require('path');

require("./dbhandler/connection").connection;


 const userDataPath = (electron.app || electron.remote.app).getPath('userData');
 console.log("user data path",userDataPath);

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

let splash;



if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  splash= new BrowserWindow({
    frame: false,
    width: 500,
    height: 350,
    show: false,
    webPreferences: {
      devTools: false
    }
  });

  splash.loadURL(`file://${__dirname}/splash.html`)
  splash.on("ready-to-show", () => {
    splash.show();
  })

splash.on('closed', () => {
  splash = null;
});

 setTimeout(()=>{
     mainWindow = new BrowserWindow({
       show: false,
       width: 1024,
       height: 728,
       title: "Imperium Fitness Gym",
       icon: path.join(__dirname, "icons", "png", "64x64.png"),
      //  webPreferences:{
      //    devTools:false
      //  }
     });
     mainWindow.loadURL(`file://${__dirname}/app.html`);
     splash.close();

     mainWindow.webContents.on('did-finish-load', () => {
       if (!mainWindow) {
         throw new Error('"mainWindow" is not defined');
       }
       if (process.env.START_MINIMIZED) {
         mainWindow.minimize();
       } else {
         mainWindow.show();
         mainWindow.focus();
       }
     });
      mainWindow.on('closed', () => {
        mainWindow = null;
      });
     mainWindow.setMenu(null);
 },2000);

 
  

  ipcMain.on('send-whatsapp-messages',(event,numbers,message)=>{
    sendWhatsappMessages(numbers,message).then(({success})=>{
        console.log("status is fine")
         event.sender.send('send-whatsapp-messages-status', {
           success:true
         });
    }).catch((err)=>{
      console.log("debug",err);
       event.sender.send('send-whatsapp-messages-status', {
         success: false
       });
    })
  })

  

});
