import express from 'express'
import actorController from './actor.Controller.js'

const actorRoutes = express.Router()
actorRoutes.post('/actor', actorController.handleInsertActorRequest);
actorRoutes.get('/actores', actorController.handleGetActoresRequest);
actorRoutes.get('/actor/:id', actorController.handleGetActorByIdRequest);
actorRoutes.get('/actor/pelicula/:id', actorController.handleGetActoresByPeliculaNombreRequest);


export default actorRoutes;