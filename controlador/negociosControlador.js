'use strict'

const bcrypt = require('bcrypt');
var negociosModelo = require('../modelo/negocios');
const uploadImage = require('../helpers/uploadImage');
var fs = require('fs');
var path = require('path');
const eliminarImg = require('../helpers/eliminarImg');




let accesoNegocio = (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    negociosModelo.findOne({ email: email }, (err, negocio) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion' });
        } else {
            if (!negocio) {
                res.status(404).send({ mesagge: 'El negocio no existe' });
            } else {
                bcrypt.compare(password, negocio.password, (err, check) => {
                    if (check) {
                        //devolver los datos del ususario logeado
                        console.log('coincide el password')
                        if (req.body.gethash) {
                            //devolver un token de jwt
                        } else {
                            res.status(200).send({ id: negocio._id, nombre: negocio.nombre, email: negocio.email, latitud: negocio.latitud, longitud: negocio.longitud, telefono: negocio.telefono, descripcion: negocio.descripcion, premium: negocio.premium, tipo: negocio.tipo, numero_ediciones: negocio.numero_ediciones });
                        }
                    } else {
                        res.status(404).send({ mesagge: 'El negocio no se ha identificado' });
                    }
                });
            }

        }
    });
}


let registrarNegocio = (req, res) => {
    var negocios = new negociosModelo();
    negocios.nombre = req.body.nombre;
    negocios.latitud = req.body.latitud;
    negocios.longitud = req.body.longitud;
    negocios.codigopostal = req.body.codigopostal;
    negocios.zona = req.body.zona;
    negocios.email = req.body.email;
    negocios.telefono = req.body.telefono;
    negocios.descripcion = req.body.descripcion;
    negocios.tipo = req.body.tipo;
    negocios.imagen = 'default.png';
    negocios.premium = 'no';
    negocios.numero_ediciones = '0';
    var email = req.body.email;
    negociosModelo.findOne({ email: email }, (err, negocio) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion' });
        } else {
            if (!negocio) {
                if (req.body.password) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        negocios.password = hash;
                        if (negocios.nombre != null && negocios.zona != null && negocios.email != null) {
                            //guardar el ususario en BD
                            negocios.save((err, negocioAlmacenado) => {
                                if (err) {
                                    res.status(500).send({ mesagge: 'Error al guardar el usuario' });
                                } else {
                                    if (!negocioAlmacenado) {
                                        res.status(404).send({ mesagge: 'No se ha registrado el ususario' });
                                    } else {
                                        //nos devuelve un objeto con los datos del ususario guardado
                                        res.status(200).send(negocioAlmacenado);
                                    }
                                }

                            });
                        } else {
                            res.status(200).send({ mesagge: 'Introduce todos los campos' });
                        }
                    });

                } else {
                    res.status(500).send({ mesagge: 'Introduce la contraseña' });
                }
            } else {
                res.status(404).send({ mesagge: 'El negocio ya existe' });
            }

        }
    });


}


let actualizarNegocio = (req, res) => { //PUT
    var negocioId = req.params.id; //GET
    var update = req.body //POST

    negociosModelo.findByIdAndUpdate(negocioId, update, (err, negocioUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario en el servidor' });
        } else {
            if (!negocioUpdate) {
                res.status(404).send({ message: 'No se ha podido encontar el usuario' });
            } else {
                res.status(200).send(negocioUpdate);
            }
        }
    });
}

let ActualizarFoto2 = async(req, res) => {
    var idNegocio = req.params.id;
    const imagenBase64 = req.body.imagen ? req.body.imagen : '';
    let imagenNueva;
    const negocioActualizar = await negociosModelo.findById(idNegocio).exec();
    // Validar que exista la imagen -> Subida de imagenes base64
    if (imagenBase64.length) {
        imagenNueva = uploadImage(imagenBase64, 'negocio');
        console.log(imagenNueva);
    } else imagenNueva = negocioActualizar.imagen;
    negociosModelo.findByIdAndUpdate(idNegocio, { imagen: imagenNueva }, (err, user) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error al buscar el usuario' });
        }
        if (!user) {
            res.status(404).send({ mesagge: 'Error en el id' });
        } else {
            res.status(200).send({
                image: imagenNueva,
                user: user
            });
        }
    })

}



let actualizarFoto = (req, res) => {
    var UserId = req.body.negocioid;
    if (req.files) {
        var file_path = req.files.file.path;
        var file_arreglo = file_path.split('\\'); //     cargas\usuario\foto.jpg
        var file_name = file_path.split[2];
        var extension = file_arreglo[2].split('\.');
        if (extension[1] == 'png' || extension[1] == 'gif' || extension[1] == 'jpg' || extension[1] == 'jpeg') {
            negociosModelo.findByIdAndUpdate(UserId, { imagen: file_arreglo[2] }, (err, user) => {
                if (err) {
                    res.status(500).send({ mesagge: 'Error al buscar el usuario' });
                }
                if (!user) {
                    res.status(404).send({ mesagge: 'Error en el id' });
                } else {
                    res.status(200).send({
                        image: file_name,
                        user: user
                    });
                }
            })
        } else {
            res.status(404).send({ mesagge: 'El formato no es adecuado' });
        }
    } else {
        res.status(404).send({ mesagge: 'No cargo el archivo.....' });
    }
}

let getFoto = (req, res) => {
    var imageFile = req.params.imageFile;
    var rutaFoto = './cargas/negocio/' + imageFile;
    console.log(imageFile);
    fs.exists(rutaFoto, (existe) => {
        if (existe) {
            res.sendFile(path.resolve(rutaFoto));
        } else {
            res.status(404).send({ mesagge: 'No has cargado una imagen con ese nombre' });
        }
    })

}

let getNegocios = (req, res) => {
    var zonaNegocios = req.params.zona;
    negociosModelo.find({ zona: zonaNegocios }, (error, negocioss) => {
        if (error) {
            res.status(404).send("No hay negocios en esta zona")
        } else {
            res.status(200).send(negocioss);
        }
    }).sort({ premium: 'desc' })
}


let datosNegocio = (req, res) => {
    var zonaNegocios = req.params.id;
    negociosModelo.findById(zonaNegocios, (error, negocioss) => {
        if (error) {
            res.status(404).send("No hay negocios")
        } else {
            res.status(200).send(negocioss);
        }
    })
}

let eliminarNegocio = (req, res) => {
    var id = req.params.id;
    negociosModelo.findByIdAndRemove(id, (err, negocio) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion' });
        } else {
            res.status(200).send({ mesagge: 'Negocio Eliminado' })
        }
    })
}


let busquedaNegocios = (req, res) => {
    var tipoNegocios = req.params.tipo;
    negociosModelo.find({ tipo: tipoNegocios }, (error, negocioss) => {
        if (error) {
            res.status(404).send("No hay negocios en esta zona")
        } else {
            res.status(200).send(negocioss);
        }
    })
}


module.exports = {
    registrarNegocio,
    accesoNegocio,
    actualizarNegocio,
    actualizarFoto,
    getFoto,
    getNegocios,
    ActualizarFoto2,
    datosNegocio,
    eliminarNegocio,
    busquedaNegocios
};