import Noticias from "../models/Noticias.js"


const crear = async (req, res) => {
  
    try {
        const noticias = new Noticias(req.body)
        const noticiasAlmacenada = await noticias.save()
        res.json(noticiasAlmacenada)
    } catch (error) {
        console.log(error)
    }


    
}

export { crear };