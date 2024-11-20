import express, { urlencoded, } from 'express'
import cors from 'cors'
import client from './src/common/db.js'
import peliculaRoutes from './src/pelicula/pelicula.Routes.js'
import actorRoutes from './src/actor/actor.Routes.js'

//Configuracion del servidor.
const PORTS = process.env.PORT || 3000
const app = express()

//Middlewares
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors())

//Rutas por defecto GET
app.all('/', (req, res) => {return res.status(200).json(' Bienvenido al cine Iplacex') })

//Configuración rutas personalizadas
app.use('/api', peliculaRoutes )
app.use('/api', actorRoutes)


//Conexión a MongoDB Atlas y levantamiento del servidor
await client.connect()
.then(() => {
    console.log('Conectado al clúster de MongoDB Atlas exitosamente')
    app.listen(PORTS, () => { console.log(`Servidor corriendo en http://localhost:${PORTS}`)})
})
.catch(() => {
    console.log('Error al conectar al clúster de MongoDB Atlas', err.message)
})

