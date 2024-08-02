import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/email.js";
/* import { json } from "express";*/

const registrar = async (req, res) =>{

    //evitar registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email  })
    
    if (existeUsuario) {
        const error = new Error("Uusario ya existe")
        return res.status(400).json({ msg: error.message })
    }

    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId()
        await usuario.save()

        emailRegistro({
            email : usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })

        res.json({msg: 'Usuario Creado Corectamente, Revisa tu email para confirmar tu cuenta'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al crear usuario'})
    }   
};
const autenticar = async (req, res) => {

    const {email, password} = req.body

    // comprobar si el usuario existe
        const usuario = await Usuario.findOne({email})
        if (!usuario) {
            const error = new Error("El usuario no existe")
            return res.status(404).json({msg: error.message})
        }

    // comprobar si el usuario esta confirmado
        if (!usuario.confirmado) {
            const error = new Error("Tu cuenta no ha sido confirmada")
            return res.status(403).json({msg: error.message})
        }
    // comprobrar su password
    if (await usuario.comprobarPassword(password)) {
        res.json({
          _id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          token: generarJWT(usuario._id),
        })
    }else{
        const error = new Error("El password es incorrecto")
            return res.status(403).json({msg: error.message})
    }
}
const confirmar = async (req, res) => {
    const { token } = req.params//leer la url es lo que hace
    const usuarioConfirmar = await Usuario.findOne({token})//busca el usuario
if (!usuarioConfirmar) {//si no existe aparece mensaje que el token no es valido
    const error = new Error("Token no valido")
    return res.status(403).json({msg: error.message})
}

try {//si existe confirmamos el usuario con el true y se ponen comillas vacias porque el token es un solo uso
    usuarioConfirmar.confirmado = true
    usuarioConfirmar.token = ""
    await usuarioConfirmar.save()
    res.json({msg: 'usuario confirmado correctamente'})//mensaje de exito
} catch (error) {
    console.log(error)
}
    
}

const olvidePassword = async (req, res) => {
    const { email } = req.body

    const usuario = await Usuario.findOne({email})
        if (!usuario) {
            const error = new Error("El usuario no existe")
            return res.status(404).json({msg: error.message})
        }
        try {
            usuario.token = generarId()
            await usuario.save()

            emailOlvidePassword({
                email : usuario.email,
                nombre: usuario.nombre,
                token: usuario.token
            })

            // enviar el email de nueva confirmacion
            res.json({msg: 'hemos enviado un email con las instrucciones'})
        } catch (error) {
            console.log(error)
        }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params

    const tokenValido = await Usuario.findOne({ token })

    if (tokenValido) {
        res.json({msg: "token valido y el usuario existe"})
    } else{
        const error = new Error("Token no valido")
        return res.status(404).json({msg: error.message})
    }
}
const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const usuario = await Usuario.findOne({ token })

    if (usuario) {
        usuario.password = password
        usuario.token = ''
        try {
            await usuario.save()
            res.json({msg: "password modifcado exitosamente"})
        } catch (error) {
            console.log(error)
        }
    } else{
        const error = new Error("Token no valido")
        return res.status(404).json({msg: error.message})
    }
}
const perfil = async (req, res) => {
    const { usuario } = req

    res.json(usuario)
}

export { registrar, 
        autenticar, 
        confirmar, 
        olvidePassword, 
        comprobarToken, 
        nuevoPassword,
        perfil,
    };