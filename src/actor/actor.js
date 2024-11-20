import { BSONType, ObjectId } from "mongodb"

export const Actor = {
    _id: ObjectId,

    idPelicula: BSONType.string,

    nombre: BSONType.string,

    edad: BSONType.int,

    estaRetirado: BSONType.Boolean,
    
    premios: BSONType.array
}