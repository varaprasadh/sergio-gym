const path=require('path');
const connection=require("./dbhandler/connection").connection;
const {ipcRenderer}= require('electron');


ipcRenderer.on('get-uid',(event,arg)=>{
    console.log(arg);
    alert(arg);
})