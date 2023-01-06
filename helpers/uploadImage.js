const fs = require('fs');

/**
 * Convierte un string base64 recibido de Volley a una imagen JPG
 * 
 * @param {string} imagenBase64 Imagen codificada en base64
 * @param {string} tipo Si la imagen es de un 'usuario' o un 'servicio'
 * @returns {(string | boolean)} Nombre de la imagen (String) o false si no pudo subirla
 */
const uploadImage = (imagenBase64, tipo) => {
    var path;
    try {
        let nombreImg;
        let carpeta;
        if (tipo == 'usuario') {
            nombreImg = `usuario_${ Date.now() }.jpg`;
            carpeta = 'usuario';
            path = `./cargas/${carpeta}/${nombreImg}`;
        } else if (tipo == 'negocio') {
            nombreImg = `negocio_${ Date.now() }.jpg`;
            carpeta = 'negocio';
            path = `./cargas/${carpeta}/${nombreImg}`;
        } else if (tipo == 'servicio') {
            nombreImg = `servicio_${ Date.now() }.jpg`;
            carpeta = 'menu';
            path = `./cargas/${carpeta}/${nombreImg}`;
        }
        const base64Data = imagenBase64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        // Subir la imagen
        fs.writeFileSync(path, base64Data, { encoding: 'base64' });
        return nombreImg;
    } catch (e) {
        return false;
    }
}
module.exports = uploadImage;