const  { app, BrowserWindow, Menu, ipcMain, Notification } = require('electron'); 
const path = require('path');
let db = require('./database');

let winlogin; // Pagina de Admin Validar datos
let Awin; // Pagina Admin Adentro

let Swin; //Pagina de Studiante
let ASwin; //Pagina Student Admin Adentro 

let win; //Pagina Principal

// Actualizar automaticamente
if (process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, {
        electron : path.join(__dirname, '../node_modules', '.bin', 'electron')

    })

}

//Comenzamos App
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })


//Pagina Principal  /////////////////////////////////////////////////////////////////////////////////////
function createWindow (){
    win = new BrowserWindow({
        webPreferences: {
            // nodeIntegration: true,
            // contextIsolation:true,
            // devTools:false,
             preload:path.join(__dirname, 'main.js')
             
           },
        fullscreen:true   
    })
    win.loadFile('index.html')
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
}

const templateMenu = [
    {
        label:'Api',
        submenu: [
            { role: 'close',
              accelerator: 'a+f'
         }
        ]
    }
]

//Nos lleva a la pagina Admin
ipcMain.handle('btnA', () => {
    loginWindow()
    win.close()

 });
//Nos lleva a la Pagina Student
 ipcMain.handle('btnS', () => {
    SWindow()
    win.close()
    
 });


///////////////////////////////////////////////////////////////////////////////////////////////



//Pagina Admin  /////////////////////////////////////////////////////////////////////////////////////
function loginWindow(){
    winlogin = new BrowserWindow({
        webPreferences: {
            preload:path.join(__dirname, 'login.js')
        },
        fullscreen:true   

    })

    winlogin.loadFile('Admin.html')
}

//Nos lleva a Inicio
ipcMain.handle('inicio', () => {
    createWindow()
    winlogin.close()
   
    
 });

// Validamos Datos Y vemos si entramos o no a la pagina de admin
ipcMain.handle('login', (event, obj) => {
    validatelogin(obj)
}); 

function validatelogin(obj){
    const { codigo } = obj
    const sql = "SELECT *FROM uadmin WHERE codigo=? "
     db.query(sql, [codigo], (error, results, fields) => {
         if(error){console.log(error);}

         if(results.length > 0 ){ 
            AWindow()
            Awin.show() 
            winlogin.close()            
            
         }else{
             new Notification({
                 title:"Login",
                 body: 'Datos incorrectos'
             }).show()
         }
     }); 
}

///////////////////////////////////////////////////////////////////////////////////////////////


//Pagina Admin Adentro  /////////////////////////////////////////////////////////////////////////////////////
function AWindow () {
     Awin = new BrowserWindow({
        webPreferences: {
            preload:path.join(__dirname, 'admin_in.js')
        },
        fullscreen:true 
     })
   Awin.loadFile('admin_in.html')
}

ipcMain.handle('inicioA', () => {
    createWindow()
    Awin.close()
});


///////////////////////////////////////////////////////////////////////////////////////////////

//Pagina Student  /////////////////////////////////////////////////////////////////////////////////////

function SWindow () {
    Swin = new BrowserWindow({
        webPreferences: {
            preload:path.join(__dirname, 'Usuario.js')
        },
        fullscreen:true   

    })
  Swin.loadFile('Usuario.html')
}

//Nos lleva a la pagina principal
ipcMain.handle('inicioS', () => {
    createWindow()
    Swin.close()
});

//Nos lleva a la validacion y a otra pagina si esta bien
ipcMain.handle('loginS', (event, obj) => {
    validateloginS(obj)
}); 

function validateloginS(obj){
    const { codigo } = obj
    const sql = "SELECT *FROM ustuden WHERE codigo=? "
     db.query(sql, [codigo], (error, results, fields) => {
         if(error){console.log(error);}

         if(results.length > 0 ){ 
            ASWindow()
            ASwin.show() 
            Swin.close()            
            
         }else{
             new Notification({
                 title:"Login",
                 body: 'Datos incorrectos'
             }).show()
         }
     }); 
}


////////////////////////////////////////////////////////////////////////////////////////////////////

//Pagina Student Adentro /////////////////////////////////////////////////////////////////////////////////////

function ASWindow () {
    ASwin = new BrowserWindow({
       webPreferences: {
           preload:path.join(__dirname, 'student_in.js')
       },
       fullscreen:true 
    })
  ASwin.loadFile('student_in.html')
}

 ipcMain.handle('inicioAS', () => {
    createWindow()
    ASwin.close()
   
    
 });
