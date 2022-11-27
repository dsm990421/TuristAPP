const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    let salida = {
        nombre: 'David',
        edad: 23,
        url: req.url
    }
    res.write(JSON.stringify(salida));
    res.end();

}).listen(3000);

console.log(`Escuchando el puerto 3000`);