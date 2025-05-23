const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const multer = require('multer')
const upload = multer({dest:'uploads/'})
// List all movies
router.get('/', movieController.movieList);

// Get movie by ID
router.get('/:id', movieController.movieDetail);

// Create new movie
router.post('/create', upload.single('image'), movieController.movieCreate);

// Update movie
router.put('/update/:id', upload.single('image'), movieController.movieUpdate);

// Delete movie
router.delete('/delete/:id', movieController.movieDelete);

module.exports = router;
