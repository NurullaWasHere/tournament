import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();
 const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    define: {
        charset: 'utf-8',
        collate: 'utf8_general_ci'
    }
})

export default sequelize;