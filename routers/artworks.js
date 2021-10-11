const { Router, response } = require("express");
const Artwork = require("../models").artwork;
const Bid = require("../models").bid;

const router = new Router();

// get all artworks
router.get("/", async (request, response, next) => {
  try {
    const artworks = await Artwork.findAll({
      include: [Bid],
      order: [[Bid, "createdAt", "DESC"]],
    });
    response.status(200).send({ message: "ok", artworks });
  } catch (error) {
    next(error);
  }
});

// get artwork by id
router.get("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    if (isNaN(parseInt(id))) {
      return response
        .status(400)
        .send({ message: "Artwork id is not a number" });
    }

    const artwork = await Artwork.findByPk(parseInt(id), {
      include: [Bid],
      order: [[Bid, "amount", "DESC"]],
    });

    if (artwork === null) {
      return response.status(404).send({ message: "Artwork not found" });
    }

    response.status(200).send({ message: "ok", artwork });
  } catch (error) {
    next(error);
  }
});

// change the hearts
router.patch("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const artwork = await Artwork.findByPk(parseInt(id));

    if (artwork === null) {
      return response.status(404).send({ message: "Artwork not found" });
    }

    await artwork.update({ hearts: artwork.hearts + 1 });

    response.status(200).send({ message: "ok", artwork });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
