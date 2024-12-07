const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
  'postgres://postgres:postgresSuperUserPsw@mypostgres:5432/postgres'
);

// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

const Result = sequelize.define(
  'Result',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    time: {
      type: DataTypes.DOUBLE
    },
    correctTypingNumber: {
      type: DataTypes.INTEGER
    },
    average: {
      type: DataTypes.DOUBLE
    },
    missTypingNumber: {
      type: DataTypes.INTEGER
    },
    accuracy: {
      type: DataTypes.DOUBLE
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  }
);

Result.sync({ alter: true });

module.exports = Result;