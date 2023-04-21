[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/8eRVZXt4)

[![Sonar-Cloud](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101333588/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101333588/actions/workflows/sonarcloud.yml)

[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101333588/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101333588/actions/workflows/coveralls.yml)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101333588/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101333588/actions/workflows/node.js.yml)



###### Desarrollo de Sistemas Informáticos | Práctica 11 | Andrés Hernández Ortega

## Práctica 11 - Creación de una aplicación Express para gestionar el registro de Funko Pops 

# Introducción

En esta práctica nos hemos introducido con la creación de servidores web propios mediante el uso de Express, que es un framework Web para Node.js.

En la práctica realizada en el laboratorio de clase de prácticas PE hemos podido llevar a cabo un programa que crea un servidor Express capaz de recibir un comando y sus argumentos y ejecutarlos mediante el uso de `spawn`. A su vez, ser capaz de returnar un código Status de error concreto en función de lo que ocurra con los parámetros introducidos, es decir, si ha habido éxito o fracaso.

# Desarrollo

En esta ocasión se requiere de la creación de un servidor propio empleando Express con el objetivo de gestionar las distintas colecciones de funkos como se viene desarrollando en las sucesivas prácticas desde la número nueve, para ello se diferencias las siguientes peticiones al emplear un tipo de respuesta:

- **GET** para listar todos los funkos de un usuario o mostrar un funko específico del usuario.
    - Para ello el usuario tiene que introducir un parámetro denominado `nombreUsuario`, si únicamente introduce dicho parámetro se interpreta que se desea listar todos los funkos del usuario en cuestión. En caso de introducir otro parámetro denominado `id` se considera que se desea mostrar la información de un funko concreto del usuario. Podemos ver un fragmento de la parte del programa que se encarga del GET:

    ```
    app.get('/funkos', (req, res) => {
    let error : boolean = false;
    if(!req.query.nombreUsuario) { 
        return res.send(respuestaNegativa);
    } 
    ...
    });
    ```

    El tipo de respuesta que recibe un usuario al llevar a cabo una petición es el siguiente:

    ```
    export type Respuesta = {
        success: boolean;
        funkoPops?: Funko[];
    }
    ```
    El atributo `success` nos indica si hubo éxito o no con la petición y, el atributo opcional `funkoPops` es un array de la interface `Funko`, en caso de requerir retornar dicho objeto.

    Las respuestas posibles, por tanto, normalmente serán afirmativas o negativas, según si se tuvo éxito o no:

    ```
    let respuestaNegativa : Respuesta = {success: false};
    let respuestaAfirmativa : Respuesta = {success: true};
    ```

- **POST** para añadir un funko a la colección de un usuario.
    - Para ello el usuario tiene que introducir un parámetro denominado `nombreUsuario` y los atributos del funko que desea añadir, es decir:
        - id
        - nombre
        - descripcion
        - tipo
        - genero
        - franquicia
        - numero
        - exclusivo
        - caracteristicasEspeciales
        - valorMercado

- **DELETE** para eliminar un funko concreto de la colección de un usuario.
    - Para ello el usuario tiene que introducir un parámetro denominado `nombreUsuario` e `id` con la ID del funko en cuestión.

- **PATCH** para modificar un funko concreto de la colección de un usuario.
   - Para ello el usuario tiene que introducir un parámetro denominado `nombreUsuario` y todos los atributos del funko con sus nuevos valores, es decir:
        - id
        - nombre
        - descripcion
        - tipo
        - genero
        - franquicia
        - numero
        - exclusivo
        - caracteristicasEspeciales
        - valorMercado


# Pruebas

Se ha llevado a cabo pocas propuestas debido al problema de indicar si se trata de una petición de tipo GET, POST, DELETE O PATH, es por ello que se realizaron únicamente tres pruebas con el tipo GET.

# Conclusión

Como hemos comentado en esta práctica nos hemos podido introducir en nuevos conceptos y herramientas para crear nuestros propios servidores y trabajar con ellos. Ser capaces de que establecer conexiones con ellos y retornar archivo de tipo JSON u otros tipos.

# Referencias

Para el desarrollo de la práctica se ha requerido la consulta de los siguientes recursos:

- https://frikily.com/cuanto-vale-mi-funko-pop/
- https://www.npmjs.com/package/yargs
- https://www.npmjs.com/package/chalk
- https://www.npmjs.com/package/jsonfile
- https://www.npmjs.com/package/@types/node
- https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/fs/promises.d.ts
- https://nodejs.org/docs/latest-v19.x/api/fs.html#synchronous-api