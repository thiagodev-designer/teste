import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('menssagens','root','',{
    host: 'localhost',
  dialect: 'mysql'
})

sequelize.authenticate().then(()=>{
    console.log('conectado');
    
})


