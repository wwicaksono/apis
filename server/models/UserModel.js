import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./base/db";

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.CHAR(60)
    }
  },
  {
      underscored: true,
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                }
            }
  }
);

export default User;