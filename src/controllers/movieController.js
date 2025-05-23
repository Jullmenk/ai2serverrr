const { cloudinary } = require("../config/cloudinary");
const Movie = require("../models/Movie");
const Genre = require("../models/index").Genre;

exports.movieList = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      include: [
        {
          model: Genre,
          as: "genre",
          attributes: ["description"],
        },
      ],
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.movieDetail = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id, {
      include: [
        {
          model: Genre,
          as: "genre",
          attributes: ["description"],
        },
      ],
    });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.movieCreate = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    console.log(req.body)
    switch (true) {
      case !title:
        return res.status(400).json({ error: "Missing title" });
      case !description:
        return res.status(400).json({ error: "Missing description" });
      case !req.file:
        return res.status(400).json({ error: "Missing image" });
      case !category:
        return res.status(400).json({ error: "Missing genreId" });
    }

    const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: "posts",
    });
    console.log("picture", uploadResponse);
    const movie = await Movie.create({
      title,
      description,
      photo: {
        secure_url: uploadResponse.secure_url,
        url: uploadResponse.url,
      },
      genreId: category,
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.movieUpdate = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    let { title, description, photo, genreId } = req.body;
    console.log(req.body)
    if(req.file){
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: "posts",
      });
      if(uploadResponse){
        await cloudinary.uploader.destroy(movie.photo.secure_url);
      }
      photo = {
        secure_url: uploadResponse.secure_url,
        url: uploadResponse.url,
      }
    }
    await movie.update({
      title,
      description,
      photo,
      genreId,
    });

    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.movieDelete = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }
    if(movie.photo.secure_url){
      await cloudinary.uploader.destroy(movie.photo.secure_url);
    }
    await movie.destroy();
    res.json({ message: "Filme deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

