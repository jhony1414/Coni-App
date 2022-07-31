
import express from 'express'
const router = express.Router()
import movimientosController from '../controllers/movimientosController.js'

const movimientosRoutes = ( req, res ) => {

    router.get('/', movimientosController.index)
    router.post('/nuevo', movimientosController.crearNuevo)
    router.post('/actualizar/:id', movimientosController.actualizar)
    router.delete('/eliminar/:id', movimientosController.eliminar)
    router.post('/por-fechas', movimientosController.buscarPorFechas)
        
    return router

}




export default movimientosRoutes