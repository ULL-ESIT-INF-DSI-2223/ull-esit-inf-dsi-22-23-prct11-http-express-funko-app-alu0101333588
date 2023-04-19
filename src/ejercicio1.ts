import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {spawn} from 'child_process';


const app = express();

const __dirname = join(dirname(fileURLToPath(import.meta.url)), '../public');
app.use(express.static(__dirname));

app.get('/notes', (req, res) => {

  // req.query.title as string
  //const childProc = spawn(req.query.cmd as string, ['-la']);

  if(!req.query.cmd) { 
    return res.send({ 
      error: "Se requiere introducir un nombre de comando con el atributo 'cmd'", 
    }); 
  } 

  let comando : string = req.query.cmd as string;
  let argumentos : string[] = [];

  if (req.query.args) { 
    argumentos= (req.query.args as string).split(" "); 
  } 

  console.log(req.query.cmd);
  console.log(req.query.args);

  //argumentos.push(req.query.args as string);

  const childProc = spawn(comando, argumentos);
  let error : boolean = false;

    // Comprobamos que no haya error con el comando 
  childProc.on('error', () => {
    error = true;
  })
  
  // Copiamos el contenido devuelto por el comando
  let myOutput = '';
  childProc.stdout.on('data', (chunk) => {
    myOutput += chunk;
  });

  // Copiamos el contenido del error por el comando, en caso de que haya
  let myError = '';
  childProc.stderr.on('data', (chunk) => {
    myError += chunk;
  });

  // Cuando terminemos de coger el contenido del comando
  childProc.on('close', (code) => {

    if (error) {
      return res.send(JSON.stringify({
        'success': false,
        'message': 'El comando introducido no es válido'
      }));
    } else if (code !== 0) {
      return res.send(JSON.stringify({
        'success': false,
        'message': myError
      }));
    } else {
      return res.send(JSON.stringify({
        'success': true,
        'message': myOutput,
      }));
    }
  });

});

app.get('*', (req, res) => { 
  res.send("<h1>404</h1>"); 
}); 

    //console.log(req.query.title);
    //console.log(myOutput2);
    //childProc2.stdout.pipe(process.stdout);
    
    /*res.send({
      error: 'A title has to be provided',
    });

    //let comando : string = req.query.title;
    const childProc = spawn('cata');

    childProc.on('error', (err) => {
        res.send(JSON.stringify({
        'success': false,
        'message': err.message
      }));
      
    });

    let myOutput = '';
    childProc.stdout.on('data', (chunk) => {
      myOutput += chunk;
    });

    let myError = '';
    childProc.stderr.on('data', (chunk) => {
      myError += chunk;
    });

    childProc.on('close', (code) => {
      if (code !== 0) {
        res.send(JSON.stringify({
          'success': false,
          'message': myError
        }));
      } else {
        res.send(JSON.stringify({
          'success': true,
          'message': myOutput
        }));
      }
    });
    */
//});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});