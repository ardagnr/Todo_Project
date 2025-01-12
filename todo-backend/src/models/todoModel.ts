import User from './userModel';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Todo extends Model {
  public id!: number;
  public title!: string;
  public completed!: boolean;
  public dueDate!: string;
  public userId!: number;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    dueDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'todos',
  }
);

Todo.belongsTo(User, { foreignKey: 'userId' });

export default Todo;
