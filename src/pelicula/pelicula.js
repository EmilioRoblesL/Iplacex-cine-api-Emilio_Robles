import { ObjectId, BSONType } from 'mongodb';

export const Pelicula = {
_id: ObjectId,

nombre: BSONType.string,

generos: BSONType.array,

anioEstreno: BSONType.int

};