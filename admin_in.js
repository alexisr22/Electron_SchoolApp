const { ipcRenderer } = require('electron')


let inicio;
 

window.onload = function(){

    inicio = document.getElementById("inicio")

    inicio.onclick = function(){
        ipcRenderer.invoke("inicioA")
    }
}