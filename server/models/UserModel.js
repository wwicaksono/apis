import { Sequelize, DataTypes } from "sequelize";
import sequelize from "./base/db";

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.CHAR(60),
        allowNull: false
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