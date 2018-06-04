import { Sequelize } from "sequelize";
import sequelize from "./base/db";

const User = sequelize.define('users', {
    iduser: {
        type: Sequelize.INTEGER,
        // field: 'iduser',
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default User;