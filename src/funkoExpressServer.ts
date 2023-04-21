import { Funko } from "./Funko.js";
import { ColeccionFunkos } from "./ColeccionFunkos.js";
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import request from 'request';
import { tipoPop } from "./tipoPop.js";
import { genero } from "./genero.js";

export type Respuesta = {
    success: boolean;
    funkoPops?: Funko[];
}

const app = express();

const esNumero = (n : string) => !!Number(n); // Saber si un string contiene un número o no
let respuestaNegativa : Respuesta = {success: false};
let respuestaAfirmativa : Respuesta = {success: true};





/**
 * Listar los funkos de un usuario introduciendo su ID de usuario
 * o mostrar un funko concreto del usuario mostrando, además, la ID
 * del funko en cuestión
 * @param req, la información sobre la petición realizada
 * @return res, la respuesta envíada
 */
app.get('/funkos', (req, res) => {
    let error : boolean = false;
    if(!req.query.nombreUsuario) { 
        return res.send(respuestaNegativa);
    } 

    let idFunko : number = 0;
    let hayId : boolean = false;
    if(req.query.id) { 
        if (esNumero(req.query.id as string)){
            idFunko = Number(req.query.id as string);
            hayId = true;
        } else {
            error = true;
        }
    } 
    if (error) {
        return res.send(respuestaNegativa);
    } else if (hayId) {
        console.log('Acción MOSTRAR Funko');
        let coleccionfunkos1 : ColeccionFunkos = new ColeccionFunkos(req.query.nombreUsuario as string);
        let funkos : Funko[] = [coleccionfunkos1.obtenerFunko(idFunko)];
        if (coleccionfunkos1.existeFunko(idFunko)) {
            let respuesta : Respuesta = {success: true, funkoPops: funkos};
            return res.send(respuesta);
        } else {
            return res.send(respuestaNegativa);
        }  
    } else {
        console.log('Acción LISTAR Funko');
        let coleccionfunkos1 : ColeccionFunkos = new ColeccionFunkos(req.query.nombreUsuario as string);
        let funkos : Funko[] = coleccionfunkos1.arrayFunkos();
        if (funkos.length === 0) {
            return res.send(respuestaNegativa);
        } else {
            let respuesta : Respuesta = {success: true, funkoPops: funkos};
            return res.send(respuesta);
        }
    }


});

/**
 * Añadir un funko
 * @param req, la información sobre la petición realizada
 * @return res, la respuesta envíada
 */
app.post('/funkos', (req, res) => {
    console.log('Acción AÑADIR nuevo Funko');

    if(!req.query.nombreUsuario) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.id) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.nombre) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.descripcion) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.tipo) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.genero) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.franquicia) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.numero) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.exclusivo) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.caracteristicasEspeciales) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.valorMercado) { 
        return res.send(respuestaNegativa);
    }

    
        let exclusividad : boolean = false;
        if (req.query.exclusivo as string == "true") {
            exclusividad = true;
        }
        let funko : Funko = {
            _ID: Number(req.query.id as string),
            _nombre: req.query.nombre as string,
            _descripcion: req.query.descripcion as string,
            _tipo : req.query.tipo as tipoPop,
            _genero: req.query.genero as genero,
            _franquicia: req.query.franquicia as string,
            _numero : Number(req.query.numero as string),
            _exclusivo: exclusividad,
            _caracteristicasEspeciales: req.query.caracteristicasEspeciales as string,
            _valorMercado: Number(req.query.valorMercado as string)
        }
        let coleccionfunkos1 : ColeccionFunkos = new ColeccionFunkos(req.query.nombreUsuario as string);
        if(coleccionfunkos1.anadir(funko)) {
            return res.send(respuestaAfirmativa); 
        } else {
            return res.send(respuestaNegativa);
        }    

});


/**
 * Eliminar un funko
 * @param req, la información sobre la petición realizada
 * @return res, la respuesta envíada
 */
app.delete('/funkos', (req, res) => {

    console.log('Acción ELIMINAR Funko');

    if(!req.query.nombreUsuario) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.id) { 
        return res.send(respuestaNegativa);
    }

    
    let coleccionfunkos1 : ColeccionFunkos = new ColeccionFunkos(req.query.nombreUsuario as string);
    if(coleccionfunkos1.eliminar(Number(req.query.id as string))) {
        return res.send(respuestaAfirmativa); 
    } else {
        return res.send(respuestaNegativa);
    }    

});


/**
 * Modificar un funko
 * @param req, la información sobre la petición realizada
 * @return res, la respuesta envíada
 */

app.patch('/funkos', (req, res) => {
    console.log('Acción MODIFICAR Funko');

    if(!req.query.nombreUsuario) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.id) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.nombre) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.descripcion) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.tipo) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.genero) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.franquicia) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.numero) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.exclusivo) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.caracteristicasEspeciales) { 
        return res.send(respuestaNegativa);
    }

    if(!req.query.valorMercado) { 
        return res.send(respuestaNegativa);
    }

    let exclusividad : boolean = false;
    if (req.query.exclusivo as string == "true") {
        exclusividad = true;
    }
    let funko : Funko = {
        _ID: Number(req.query.id as string),
        _nombre: req.query.nombre as string,
        _descripcion: req.query.descripcion as string,
        _tipo : req.query.tipo as tipoPop,
        _genero: req.query.genero as genero,
        _franquicia: req.query.franquicia as string,
        _numero : Number(req.query.numero as string),
        _exclusivo: exclusividad,
        _caracteristicasEspeciales: req.query.caracteristicasEspeciales as string,
        _valorMercado: Number(req.query.valorMercado as string)
    }
    let coleccionfunkos1 : ColeccionFunkos = new ColeccionFunkos(req.query.nombreUsuario as string);
    if(coleccionfunkos1.modificar(funko)) {
        return res.send(respuestaAfirmativa); 
    } else {
        return res.send(respuestaNegativa);
    }  
});

/**
 * Se encarga de establecer la escucha activa
 */
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});