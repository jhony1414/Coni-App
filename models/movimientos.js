import { Sequelize, DataTypes } from 'sequelize'
import db from '../config/db.js'

const Movimientos = db.define('movimientos', 
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            },

        fecha: {
            type: DataTypes.STRING,
            },

        importe: {
            type: DataTypes.DOUBLE
            },

        tipo: {
            type: DataTypes.STRING
        },

        concepto: {
            type: DataTypes.STRING
        },
        
        
    }
)

export default Movimientos
