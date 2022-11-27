const express = require('express');
const app = express();
const port = 3001;

app.use(express.static(__dirname + '/templates'));
app.listen(port, () => {
    console.log(`Escuchando servicio en el puerto ${port}`);
});