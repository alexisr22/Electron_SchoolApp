const { ipcRenderer } = require('electron')

let btnA;
let btnS;


window.onload = function(){
    
    btnA = document.getElementById("btnA")
    btnS = document.getElementById("btnS")

    btnA.onclick = function(){
        ipcRenderer.invoke("btnA")
    }
    
    btnS.onclick = function(){
        ipcRenderer.invoke("btnS")
    }
}