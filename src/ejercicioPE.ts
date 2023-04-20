import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {spawn} from 'child_process';
import request from 'request';


const app = express();

/**
 * En caso de que se acceda a execmd 
 * se ejecuta
 * @param req, la información sobre la petición realizada
 * @return res, la respuesta envíada
 */
app.get('/execmd', (req, res) => {

  // No se ha introducido un parametro 'cmd'
  if(!req.query.cmd) { 
    return res.status(400).send();
  }
  
  let comando : string = req.query.cmd as string;
  let argumentos : string[] = [];
    
  if (req.query.args) { 
    argumentos = (req.query.args as string).split(" "); 
  } 
    
  console.log(req.query.cmd);
  console.log(req.query.args);

  const procesoComando = spawn(comando, argumentos);
  let error : boolean = false;

  // Comprobamos que no haya error con el comando 
  procesoComando.on('error', () => {
    error = true;
  })
  
  // Copiamos el contenido devuelto por el comando
  let myOutput = '';
  procesoComando.stdout.on('data', (dato) => {
    myOutput += dato;
  });

  // Copiamos el contenido del error por el comando, en caso de que haya
  let myError = '';
  procesoComando.stderr.on('data', (dato) => {
    myError += dato;
  });

  // Cuando terminemos de coger el contenido del comando
  procesoComando.on('close', (code) => {

    if (error) { // Error con el comando, no existe
      return res.status(500).send(JSON.stringify({
        'informacion': 'El comando introducido no es válido'
      }));
    } else if (code !== 0) { // Error propio del comando que existe
      return res.status(500).send(JSON.stringify({
        'informacion': myError
      }));
    } else { // Éxito
      return res.status(200).send(JSON.stringify({
        'output': myOutput
      }));
    }
  });

});

/**
 * En caso de que se acceda a cualquier lugar 
 * @param req, la información sobre la petición realizada
 * @return res, la respuesta envíada
 */
app.get('*', (req, res) => {
  return res.status(404).send();
});


/**
 * Se encarga de establecer la escucha activa
 */
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});