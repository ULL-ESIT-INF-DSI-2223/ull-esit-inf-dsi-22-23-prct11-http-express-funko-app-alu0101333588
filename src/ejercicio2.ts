import {request} from 'http';
const url = 'http://api.weatherstack.com/current?access_key=aeb97bf5fbae1e796215bb0be875d548&query=28.48,-16.31&units=m';

const req = request(url, (response) => {
  let data = '';
  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

req.on('error', (error) => {
  console.log(error.message);
});

req.end();