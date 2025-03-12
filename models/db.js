import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('postgresql://root:gsEjUxeOi6ysmdnGRJJvR7njmxJrzGtL@dpg-cv90qdogph6c73c444b0-a/menssagens')

sequelize.authenticate().then(()=>{
    console.log('conectado');
    
})


