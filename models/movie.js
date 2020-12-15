const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const movieSchema = mongoose.Schema({
  title: { type: String, require: true, maxLength: 50 },
  numberInStock: Number,
  dailyRentalRate: Number,
  genre: genreSchema,
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
    genreId: Joi.objectId().required(),
  });
  return schema.validate(movie);
}

(exports.Movie = Movie), (exports.validateMovie = validateMovie);
