import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {spawn} from 'child_process';
import request from 'request';



const app = express();

const __dirname = join(dirname(fileURLToPath(import.meta.url)), '../public');
app.use(express.static(__dirname));
    
app.get('/notes', (req, res) => {
    
    // req.query.title as string
    //const childProc = spawn(req.query.cmd as string, ['-la']);
    
    if(!req.query.localizacion) { 
        return res.send({ 
            error: "Se requiere introducir un nombre de la localización", 
        }); 
    }
    
    let localizacion : string = req.query.localizacion as string;
    console.log(req.query.localizacion);

    const url = `http://api.weatherstack.com/current?access_key=aeb97bf5fbae1e796215bb0be875d548&query=${localizacion}&units=m`;;

    request({url: url, json: true}, (error: Error, response) => {
        if (error) {
            console.log(`Weatherstack API is not available: ${error.message}`);
            return res.send(JSON.stringify({
                'success': false,
                'message': `Weatherstack API is not available: ${error.message}`,
            }));
        } else if (response.body.error) {
            console.log(`Weatherstack API error: ${response.body.error.type}`);
            return res.send(JSON.stringify({
                'success': false,
                'message': `Weatherstack API error: ${response.body.error.type}`,
            }));
        } else {
            console.log(response.body);
            return res.send(JSON.stringify({
                'success': true,
                'message': response.body,
            }));
        }
    });
});
    
app.get('*', (req, res) => { 
    res.send("ERROR GENERAL"); 
}); 
    
    
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});