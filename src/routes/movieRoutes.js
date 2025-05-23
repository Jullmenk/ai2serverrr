const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const multer = require('multer')
const upload = multer({dest:'uploads/'})
router.get('/', movieController.movieList);
router.get('/:id', movieController.movieDetail);
router.post('/create', upload.single('image'), movieController.movieCreate);


router.put('/update/:id', upload.single('image'), movieController.movieUpdate);

router.delete('/delete/:id', movieController.movieDelete);

module.exports = router;
