import { DataTypes } from 'sequelize';
import sequelize from './base/db';

const User = sequelize.define(
  'User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR(60),
      allowNull: false,
    },
  },
  {
    underscored: true,
  },
);

export default User;
