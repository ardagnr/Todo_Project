import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('todo_app', 'root', '13211100Arda.', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});

export default sequelize;
