const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');


//Setings
const app = express();

let nombreArchivo;
let contenidoArchivo = '';

app.set('port',8080);

app.listen(app.get('port'), () => {
    console.log('Estoy listo para escuchar..');
    escucharCuento();
});

let escucharCuento = async () => {
    let data = null;
    const res = await fetch('http://localhost:3030/lectura')
        .then(async response => { data = await response.json() })
        .then(() => {
            for ( let linea of data._lines) {
                console.log(linea);
                guardarArchivo(linea);
            }
    }).catch(error => console.log('Esperando al lector'))
};

let guardarArchivo = (contenido) => {
    if (contenidoArchivo == '') {
        nombreArchivo = contenido + '.txt';
        comprobarSiExisteArchivo(nombreArchivo);
        console.log("Archivo creado")
    }

    contenidoArchivo = contenidoArchivo + '\n' + contenido;
    fs.writeFileSync(nombreArchivo, contenidoArchivo, err => { if (err) console.log(err); } )
};

let comprobarSiExisteArchivo = (file) => {
    try {
        fs.unlinkSync(file);
        console.log("Archivo eliminado...\n");
    } catch (e) {
        console.log("Conmenzando...\n")
    }
}