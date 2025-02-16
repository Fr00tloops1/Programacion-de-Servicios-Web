//Asignacion de la libreria express a la constante express
const express = require('express');
const Sequelize = require('sequelize');
const app = express();
const container = require('./container');
const servicioUser = container.resolve('servicioUser')

app.use(express.json());

//Se conecta a la base de datos de prueba
const sequelize = new Sequelize('pruebaservweb','root','123456',{
    host: 'localhost',
    dialect: 'mysql'
})
//Se genera el modelo de la tabla
const pruebaModel = sequelize.define('pruebas', {
    'id': {type: Sequelize.INTEGER, primaryKey: true},
    'usuarios': Sequelize.STRING
})
//Funcion asincrona que autentica la conexion a la base de datos
const authCon = async()=>{
    try{
        await sequelize.authenticate();
        console.log("Conexion exitosa a la Base de Datos: "+ sequelize.getDatabaseName());
    }
    catch(error){
        console.error("Conexion fallida a la Base de Datos: "+ sequelize.getDatabaseName());
    }
//Utilizacion del modelo de la tabla
pruebaModel.findAll({attributes: ['id','usuarios']})
    .then(pruebas=>{
        const muestra = JSON.stringify(pruebas);
        console.log("Los datos en la tabla pruebas son: "+ muestra);
    })
}
//Se manda a llamar la funcion asincrona de autenticacion de la conexion
authCon();

//Seccion donde se obtiene la respuesta del servidor
app.get('/', (req,res) =>{
    res.send('Hello World');
});

app.get('/sum', (req,res) =>{
    const {num1, num2} = (req.query);
    res.send('La suma de estos dos valores es: ' + parseInt(num1) + parseInt(num2));
    console.log (req.query);
});

app.post('/register', (req,res) =>{
    const data = (req.body);
    console.log('Los datos enviados son: '+ data);
    res.send(data);
});

app.get('/user', (req, res)=>{
    const usuario = servicioUser.obtenerUsuarios();
    res.send(usuario);
})
module.exports = app;

/*No hacerlo asi:
const saludar = (nombre)=> nombre = 'Cristian';
    console.log('Mi nombre es: '+ saludar(nombre));
Sino asi:
const saludar = (nombre)=> return "hola" + nombre;
*/

/*Diferencias entre declaracion de variables:
asignar: es asignarle un valor a una variable
declarar: es crear una variable y darle un valor

reasignar: es re darle un valor a una variable ya creada
redeclarar: es re crear de nuevo una variable y darle un nuevo valor

tipos de variables:
var: se puede usar en todo el codigo y se puede redeclarar y redefinir (preferiblemente evitarlo)
const: se puede usar en todo el codigo pero NO se puede redeclarar NI redefinir
let: se puese usar solo dentro de una funcion y no se puede usar fuera de la misma, se puede reasignar pero NO redefinir
*/