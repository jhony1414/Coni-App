import express from 'express'
import { engine } from '@paroi/express-edge'
import dotenv from 'dotenv'
import usuarioRoutes from './routes/movimientosRoutes.js'
import db from './config/db.js'
import movimientosRoutes from './routes/movimientosRoutes.js'

//Carga variables de entorno
dotenv.config()

//Crear app
const app = express()
const port = process.env.PORT || 3000

//Conexion a la base de datos
try {
    await db.authenticate()
    db.sync()
    console.log('Conexion correcta a la base de datos');
} catch (error) {
    console.log(error);
}

//View Template edge
 app.use( engine )
 

//Template engenie Pug
//app.set( 'view engine', 'pug' )
app.set( 'views', `./views` )

//Carpeta publica
app.use( express.static('public') )

//Activar lectura de datos de formularios
app.use( express.urlencoded( { extended: true } ) )

//Rutas Usuarios
app.use( '/', movimientosRoutes())





app.listen(port, () => {
    console.log(`Servidor corriendo en => localhost:${ port }`);
})









