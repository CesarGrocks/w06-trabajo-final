require('../models')
const sequelize = require("../utils/connection");
// const userCreate = require('./createData/userCreate');

const testMigrate = async()=>{

    try{
        await sequelize.sync({force:true}) //limpia la base de datos con el force true
        console.log('DB reset ✅');
        // await userCreate() //introducimos un usuario
        process.exit()
    }catch(error){
        console.error(error);
    }
}


testMigrate()

//mi db siempre va a quedar limpiar luego de testear