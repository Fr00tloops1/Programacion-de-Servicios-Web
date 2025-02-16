//Se crea una clase para actuar como un servicio falso
class servicioUserFake{
    //Metodo que retorna un objeto con id y nombre
    obtenerUsuarios(){
        return {id: 1, name: 'Cristian'};
    }
}
/*Se importa la libreria awilix con createContainer y asClass para manejear la inyeccion de dependencias
createContainer = container donde se registran los servicios 
asClass = registra una clase como servicio dentro del container*/
const {createContainer, asClass} = require('awilix');

//Se crea un container y se registra el servicioUserFake
const container = createContainer();
container.register({
    servicioUser: asClass(servicioUserFake).singleton(),
})

module.exports = container;