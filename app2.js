const express = require('express');
const app = express();

app.get('/', (req, res) => {
    let salida = {
        nombre: 'David',
        edad: 23,
        url: req.url
    }
    res.send(salida);
});

app.listen(3001);