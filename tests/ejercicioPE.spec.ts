
import 'mocha';
import {expect} from 'chai';
import request from 'request';


const url2 = `http://localhost:3000/execmd?cmd=ls`;
request({url: url2}, (response) => {

    console.log(response);
    // console.log(response.status);
    //console.log(response.statusMessage);
});



/*describe('Propuestas ejercicioPE', () => {

    
    it('Acceso con parametros mal introducidos - Retorna 404', (done) => {
        const url = `http://localhost:3000/execmd/lk`;
        request({url: url, json: true}, (error: Error, response) => {
            //console.log(response.statusCode);
            //console.log(response.statusMessage);
            expect(response).to.be.equal(JSON.stringify({
                'informacion': 'El comando introducido no es válido'
            }));

            expect(response.statusCode).to.be.equal(404);
            /*if (error) {
                expect(response.body.error.status).to.be.equal(400);
            } else if (response.body.error) {
                callback(`Weatherstack API error: ${response.body.error.type}`, undefined);
            } else {
                callback(undefined, response);
            }
        });
    });


    /*it('Acceso a ninguna subdirección', (done) => {
        const url = `http://localhost:3000/`;
        request({url: url, json: false}, (error: Error, response) => {
            expect(response.body.error.status).to.be.equal(404);
            /*if (error) {
                expect(response.body.error.status).to.be.equal(400);
            } else if (response.body.error) {
                callback(`Weatherstack API error: ${response.body.error.type}`, undefined);
            } else {
                callback(undefined, response);
            }
        });
    }); 
});*/