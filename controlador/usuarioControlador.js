'use strict'

const bcrypt = require('bcrypt');
var usuariosModelo = require('../modelo/usuarios');
var fs = require('fs');
var path = require('path');
const uploadImage = require('../helpers/uploadImage');


let accesoUsuario = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    usuariosModelo.findOne({ email: email }, (err, user) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion' });
        } else {
            if (!user) {
                res.status(404).send({ mesagge: 'El usuario no existe' });
            } else {
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {
                        //devolver los datos del ususario logeado
                        console.log('coincide el password')
                        if (req.body.gethash) {
                            //devolver un token de jwt
                        } else {
                            res.status(200).send({ id: user._id, nombre: user.nombre, email: user.email, imagen: user.imagen });
                        }
                    } else {
                        res.status(404).send({ mesagge: 'El usuario no se ha identificado' });
                    }
                });
            }

        }
    });
}

let registrarUsuario = (req, res) => {
    var usuario = new usuariosModelo();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.telefono = req.body.telefono;
    usuario.imagen = 'default.png';

    if (req.body.password) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            usuario.password = hash;
            if (usuario.nombre != null && usuario.telefono != null && usuario.email != null) {
                //guardar el ususario en BD
                usuario.save((err, usuarioAlmacenado) => {
                    if (err) {
                        res.status(500).send({ mesagge: 'Error al guardar el usuario' });
                    } else {
                        if (!usuarioAlmacenado) {
                            res.status(404).send({ mesagge: 'No se ha registrado el ususario' });
                        } else {
                            //nos devuelve un objeto con los datos del ususario guardado
                            res.status(200).send({ id: usuarioAlmacenado._id, nombre: usuarioAlmacenado.nombre, email: usuarioAlmacenado.email, imagen: usuarioAlmacenado.imagen });
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

}

let actualizarUsuario = (req, res) => { //PUT
    var userId = req.params.id; //GET
    var update = req.body //POST

    usuariosModelo.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario en el servidor' });
        } else {
            if (!userUpdate) {
                res.status(404).send({ message: 'No se ha podido encontar el usuario' });
            } else {
                res.status(200).send({ user: userUpdate });
            }
        }
    });
}

let ActualizarFoto2 = async(req, res) => {
    var idUsuario = req.params.id;
    const imagenBase64 = req.body.imagen ? req.body.imagen : '';
    let imagenNueva;
    const negocioActualizar = await usuariosModelo.findById(idUsuario).exec();
    // Validar que exista la imagen -> Subida de imagenes base64
    if (imagenBase64.length) {
        imagenNueva = uploadImage(imagenBase64, 'usuario');
        console.log(imagenNueva);
    } else imagenNueva = negocioActualizar.imagen;
    usuariosModelo.findByIdAndUpdate(idUsuario, { imagen: imagenNueva }, (err, user) => {
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
    var UserId = req.params.id;
    if (req.files) {
        var file_path = req.files.file.path;
        var file_arreglo = file_path.split('\\'); //     cargas\usuario\foto.jpg
        var file_name = file_path.split[2];
        var extension = file_arreglo[2].split('\.');
        if (extension[1] == 'png' || extension[1] == 'gif' || extension[1] == 'jpg' || extension[1] == 'jpeg') {
            usuariosModelo.findByIdAndUpdate(UserId, { imagen: file_arreglo[2] }, (err, user) => {
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
    var rutaFoto = './cargas/usuario/' + imageFile;
    fs.exists(rutaFoto, function(existe) {
        if (existe) {
            res.sendFile(path.resolve(rutaFoto));
        } else {
            res.status(404).send({ mesagge: 'No has cargado una imagen con ese nombre' });
        }
    })

}

let getDatos = (req, res) => {
    var id = req.body.id
    usuariosModelo.findOne({ _id: id }, (err, user) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion' });
        } else {
            if (!user) {
                res.status(404).send({ mesagge: 'El usuario no existe' });
            } else {
                res.status(200).send({ id: user._id, nombre: user.nombre, email: user.email, imagen: user.imagen, telefono: user.telefono })
            }
        }
    })
}
let eliminarUsuario = (req, res) => {
    var id = req.params.id;
    usuariosModelo.findByIdAndRemove(id, (err, user) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion' });
        } else {
            res.status(200).send({ mesagge: 'Usuario Eliminado' })
        }
    })

}

module.exports = {
    registrarUsuario,
    accesoUsuario,
    actualizarUsuario,
    getFoto,
    actualizarFoto,
    getDatos,
    ActualizarFoto2,
    eliminarUsuario
};