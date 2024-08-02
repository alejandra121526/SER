import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    tipoDocumento: {
        type: String,
        required: true,
        enum: ['CedulaCiudadania', 'TarjetaIdentidad', 'RegistroCivil', 'CedulaExtranjeria', 'CarnetIdentidad']
    },
    numero_identificacion:{
        type: Number,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    rol:{
        type: String,
        required: true,
        default: 'usuario',
        enum: ['usuario', 'dinamizador', 'admin'],
        trim: true
    },
    token:{
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
}
);
UsuarioSchema.pre('save', async function(next){
    if (!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UsuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Usuario = mongoose.model("Usuario", UsuarioSchema )
export default Usuario;