const Sequelize = require('sequelize');

const DB_NAME = 'nodedb';

const sequelize = new Sequelize(DB_NAME, 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false, // Optional: Disable logging for production
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`Database Connection has been established to '${DB_NAME}'`);
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

module.exports = sequelize;

// module.exports = pool;
