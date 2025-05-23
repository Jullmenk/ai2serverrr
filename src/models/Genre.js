const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GENRES = ['Ação', 'Aventura', 'Comédia', 'Drama', 'Fantasia', 'Ficção Científica', 'Terror'];

const Genre = sequelize.define('Genre', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.ENUM(...GENRES),
    allowNull: false,
    validate: {
      isIn: [GENRES]
    }
  }
}, {
  tableName: 'Genres',
  timestamps: false
});

module.exports = Genre;