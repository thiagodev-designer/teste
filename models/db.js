import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('menssagens','root','',{
    host: 'http://localhost:8282/phpmyadmin/',
  dialect: 'mysql'
})

sequelize.authenticate().then(()=>{
    console.log('conectado');
    
})


