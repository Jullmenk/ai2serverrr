const Genre = require('./Genre');
const Movie = require('./Movie');

Movie.belongsTo(Genre, {
  foreignKey: 'genreId',
  as: 'genre'
});

Genre.hasMany(Movie, {
  foreignKey: 'genreId',
  as: 'movies'
});

module.exports = {
  Genre,
  Movie
};