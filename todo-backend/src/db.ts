import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE||'todo_app', process.env.DB_USERNAME||'root',process.env.DB_PASSWORD||'', {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT as 'mysql' || 'mysql',
    port: Number(process.env.DB_PORT) || 3306,
});

export default sequelize;
