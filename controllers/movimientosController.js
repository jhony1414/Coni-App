
/* const homeController = ( req, res ) =>{
    res.json( { msg: 'HOME' } )
} */
import { mostrarDatos } from '../helpers.js'



import Movimientos from '../models/movimientos.js'

const saldo = ( data ) => {
    const movimientos = data
    let total = 0
    let ingresos = 0
    let gastos = 0

    movimientos.forEach( el => {
        if (el.tipo === 'Ingreso') {
            ingresos += el.importe

        } else {
            gastos += el.importe
        }

    })

    total = ingresos - gastos
    return { total, ingresos, gastos }
}

class movimientosController {
    
    async index( req, res ){
        const todosMovimientos = await Movimientos.findAll()
        
        const { total, ingresos, gastos } = saldo( todosMovimientos )

        console.log({ total, ingresos, gastos });
        mostrarDatos(todosMovimientos)

        //res.json( { todosMovimientos, total, ingresos, gastos} )
        res.render('template/layout')
    }
    
    async crearNuevo( req, res, next ){

        const { fecha, importe, tipo, concepto } = req.body

        console.log( req.body )
        
        const nuevoMovimiento = await Movimientos.create(
            {
                fecha,
                importe,
                tipo,
                concepto
            }
        )
        res.json( {nuevo: nuevoMovimiento} )
    }

    async actualizar( req, res ) {

        const { fecha, importe, tipo, concepto } = req.body
    
        const movimientoActualizado = await Movimientos.update(
                {
                    fecha,
                    importe,
                    tipo,
                    concepto
                },
                { where: { id: req.params.id } }
            )
            if(movimientoActualizado[0] == 0) {
                res.json( { error: 'No se a podido actualizar'} )
            }else{
                res.json( { actualizado: 'Movimiento actualizado corectamente' } )
            }
            
        }

    async eliminar( req, res, next ){
        const movimientoBorrar = await Movimientos.findByPk( req.params.id )
        movimientoBorrar.destroy()
        res.json({ msg: 'Movimiento eliminado correctamente' })
    }

    // ----- Busquedas ----- //

    async buscarPorFechas( req, res ){
        const { fecha1, fecha2 } = req.body
        const movimientosTotales = await Movimientos.findAll()
        const movimientos = []
        movimientosTotales.forEach(el => {
            
            if( el.fecha >= fecha1 && el.fecha <= fecha2){
                movimientos.push( el )
                
            }
        });

        mostrarDatos( movimientos )
        res.json({ movimientos })
    }
    
    
}
    



export default new movimientosController()