# CENTRO DE MANDO

Este build es mi versión del Desafío Frontend Zeroq

## Installation

1. Run `npm i`
2. Optionally, choose a port in `vite.config.ts`, under server: port (the app runs in port 3000 by default).
3. Run `json-server --watch offices.json --port 8000` where port can be any port (except 3000).
4. `npm start`

### Run tests

1. `npm test` para correr todas las pruebas
2. Dentro del entorno de pruebas, presiona `p` para filtrar por nombre de la prueba.

**Important:**
Librerías a considerar:

1. `axe-core/react` permite revisar el build y chequear posibles problemas de accesibilidad. Axe-core encontró algunos issues en los colores verde y gris (contraste) que me permitieron cambiarlos a tiempo.
2. `lodash/isEqual` es un metodo que permite hacer una deep comparison entre arrrays de objetos.
3. `json-server` permite generar endpoints para simular API REST calls desde el front-end.
4. `date-fns` permite formatear valores de tiempo.
5. `axios` permite simplificar API calls.
