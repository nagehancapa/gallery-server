const { Router, response } = require("express");
const Artwork = require("../models").artwork;
const Bid = require("../models").bid;

const router = new Router();

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

module.exports = router;
