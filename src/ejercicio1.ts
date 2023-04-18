import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {spawn} from 'child_process';


const app = express();

const __dirname = join(dirname(fileURLToPath(import.meta.url)), '../public');
app.use(express.static(__dirname));


app.get('/notes', (req, res) => {

    const childProc2 = spawn(req.query.title as string);
    let myOutput2 = '';

    childProc2.stdout.on('data', (chunk) => {
        myOutput2 += chunk;
    });

    console.log(req.query.title);
    console.log(myOutput2);
    return res.send(JSON.stringify({
        'success': true,
        'message': 'pendiente',
    }));
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
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});