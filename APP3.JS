const express = require('express');
const app = express();
const port = 3001;
app.get('/', (req, res) => {
    let salida = {
        nombre: 'Janet',
        edad: 21,
        url: req.url
    }
    res.send(salida);
});
app.get('/OtroServicio', (req, res) => {
    res.send('Hello World');
});
app.listen(port, () => {
    console.log(`Escuchando servicio en el puerto ${port}`);
});