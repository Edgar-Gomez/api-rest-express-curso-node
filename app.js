/*app.get(); //peticion
app.post(); //envio datos
app.put(); // actualización
app.delete(); //eliminación*/

const express = require('express');
const config = require('config');
const usuarios = require('./routes/usuarios.js');
const debug = require('debug')('app:inicio');
//const dbDebug = require('debug')('app:db');
//const logger = require('./logger');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api/usuarios', usuarios);

//Configuración de entornos
console.log('Aplicación: ' + config.get('nombre'));
console.log('DB server: ' + config.get('configDB.host'));

//Uso de middleware de terceros - morgan
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    //console.log('Morgan habilitado');
    debug('Morgan habilitado...');
}

//Trabajos con la base de datos
debug('Conectando con la base de datos...');

/*app.use(logger);
app.use(function(req, res, next){
    console.log('Autenticando....');
    next();
})*/


app.get('/', (req, res) => {
    res.send('Hola Mundo desde Express');
});



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando en el puerto: ${port}...`);
});

