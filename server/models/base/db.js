import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);


sequelize
  .authenticate()
  .then(() => {
    console.log('::: Database connection has been established successfully. :::');
  })
  .catch((err) => {
    console.error('!!! Unable to connect to the database:', err);
  });

export default sequelize;
