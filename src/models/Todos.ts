import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface TodosInstance extends Model {
  id: number;
  title: string;
  done: boolean;
}

export const Todo = sequelize.define<TodosInstance>(
  "Todo",
  {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    done: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "todos",
    timestamps: false,
  }
);
