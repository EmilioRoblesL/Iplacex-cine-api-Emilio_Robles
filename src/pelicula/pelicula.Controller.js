import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { Pelicula } from "./pelicula.js";

const peliculaCollection = client.db('cine-db').collection('peliculas')

// Controlador para ingresar peliculas
async function handleInsertPeliculaRequest(req, res) {
    let data = req.body;
    let pelicula = { ...Pelicula };

    pelicula.nombre = data.nombre;
    pelicula.generos = data.generos;
    pelicula.anioEstreno = data.anioEstreno;
    await peliculaCollection.insertOne(pelicula)
        .then((result) => {
            if (!result) return res.status(400).send('Error al guardar registro');
            return res.status(201).send(result);
        })
        .catch((e) => {
            console.log(e);
            return res.status(500).send({ aqui: true, code: e.message });
        });
}

// Controlador para obtener peliculas
async function handleGetPeliculasRequest(req, res) {
    await peliculaCollection.find({}).toArray()
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((e) => {
            return res.status(500).send({ code: e.message });
        });
}

// Controlador para obtener película id
async function handleGetPeliculaByIdRequest(req, res) {
    let id = req.params.id;
    try {
        let oid = ObjectId.createFromHexString(id);
        await peliculaCollection.findOne({ _id: oid })
            .then((data) => {
                if (!data) return res.status(404).send('Película no encontrada');
                return res.status(200).send(data);
            })
            .catch((e) => {
                return res.status(500).send({ code: e.message });
            });
    } catch (e) {
        return res.status(400).send('Id mal formado');
    }
}

// Controlador para actualizar película id
async function handleUpdatePeliculaByIdRequest(req, res) {
    let id = req.params.id;
    try {
        let oid = ObjectId.createFromHexString(id);
        let data = req.body;
        let query = { $set: data };
        await peliculaCollection.updateOne({ _id: oid }, query)
            .then((result) => {
                if (result.matchedCount === 0) return res.status(404).send('Película no encontrada');
                return res.status(200).send(result);
            })
            .catch((e) => {
                return res.status(500).send({ code: e.message });
            });
    } catch (e) {
        return res.status(400).send('Id mal formado');
    }
}

// Controlador para eliminar película por id
async function handleDeletePeliculaByIdRequest(req, res) {
    let id = req.params.id;
    try {
        let oid = ObjectId.createFromHexString(id);
        await peliculaCollection.deleteOne({ _id: oid })
            .then((result) => {
                if (result.deletedCount === 0) return res.status(404).send('Película no encontrada');
                return res.status(200).send(result);
            })
            .catch((e) => {
                return res.status(500).send({ code: e.message });
            });
    } catch (e) {
        return res.status(400).send('Id mal formado');
    }
}

//Exportaciones 
export default {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest
};