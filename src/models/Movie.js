const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      url: "",
      secure_url: ""
    }
  },
  genreId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Genres',
      key: 'id'
    }
  }
}, {
  tableName: 'Movies',
  timestamps: true
});

module.exports = Movie;
