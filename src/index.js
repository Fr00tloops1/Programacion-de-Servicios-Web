//Asignacion del Puerto
const app = require('./app');
const port = 8080;

//Levantamiento del servidor
(async () =>{
    console.log('Iniciando servidor...');
    app.listen(port, () =>{
        console.log(`El servidor esta corriendo en el puerto: ${port}`);
    });
})();