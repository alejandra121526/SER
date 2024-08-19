import mongoose from "mongoose";

const noticiaSchema =new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    imagenUrl: [{
        type: String
      }],
   /**objectId incrementable */
   autor:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "Usuario",
    //    required: true
   },
},
/*fecha de creacion y actualizacion*/
   {
       timestamps:true,
   }
)
const Noticias = mongoose.model("Noticias", noticiaSchema )
export default Noticias;