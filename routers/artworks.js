const { Router, response } = require("express");
const Artwork = require("../models").artwork;
const Bid = require("../models").bid;
const User = require("../models").user;
const auth = require("../auth/middleware");

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

// make bid
router.post("/:id/bids", auth, async (request, response, next) => {
  try {
    const { id } = request.params;
    const artwork = await Artwork.findByPk(parseInt(id), { include: [Bid] });

    if (artwork === null) {
      return response.status(404).send({ message: "Artwork not found" });
    }

    const currentBids = artwork.bids.map((b) => b.amount);
    const maxCurrentBid = currentBids.length
      ? Math.max(...currentBids)
      : artwork.minimumBid;

    const { amount } = request.body;

    if (amount <= maxCurrentBid + 1) {
      return response
        .status(400)
        .send({ message: "Your bid should be bigger than the current bid" });
    }

    const newBid = await Bid.create({
      email: request.user.email,
      amount,
      artworkId: artwork.id,
    });

    return response.status(201).send({ message: "Bid created", newBid });
  } catch (error) {
    next(error);
  }
});

// post a new artwork
router.post("/", auth, async (request, response, next) => {
  try {
    if (request.user.id === null) {
      return response.status(404).send({ message: "This user does not exist" });
    }

    if (!request.user.isArtist) {
      return response
        .status(403)
        .send({ message: "You are not authorized to update this space" });
    }

    const { title, imageUrl, minimumBid } = request.body;

    if (!title || !imageUrl || !minimumBid) {
      return res.status(400).send({
        message: "An artwork must have a title, imageUrl and minimumBid",
      });
    }

    const artwork = await Artwork.create({
      title,
      imageUrl,
      hearts: 0,
      minimumBid,
      userId: request.user.id,
    });

    return response.status(201).send({ message: "Artwork created", artwork });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
