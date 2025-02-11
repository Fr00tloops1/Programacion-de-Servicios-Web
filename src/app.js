//Asignacion de la libreria express a la constante express
const express = require('express');
const app = express();

app.use(express.json());

//Seccion donde se obtiene la respuesta del servidor
app.get('/', (req,res) =>{
    res.send('Hello World');
});

app.get('/sum', (req,res) =>{
    const {num1, num2}= (req.query);
    res.send('La suma de estos dos valores es: ' + parseInt(num1) + parseInt(num2));
    console.log (req.query);
});

app.post('/register', (req,res) =>{
    const data = (req.body);
    res.send(data);
});



module.exports = app;