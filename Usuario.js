const { ipcRenderer } = require('electron')

let btnlogin;
let inicio;
 
let codigo; 

window.onload = function(){
    codigo = document.getElementById("codigo")
    btnlogin = document.getElementById("login")
    inicio = document.getElementById("inicio")

    btnlogin.onclick = function(){

        const obj = {codigo:codigo.value}

        ipcRenderer.invoke("loginS", obj)
    }

    inicio.onclick = function(){
        ipcRenderer.invoke("inicioS")
    }
}