const asyncHandler = require("express-async-handler");

const Ad = require("../models/adModel");

//@desc Set ads
//@route POST /api/ads
//@access PRIVaTE
const setAd = asyncHandler(async (req, res) => {
  if (!req.body.text || !req.body.description || !req.body.price) {
    res.status(400);
    //klases pagrindu kuriamas naujas objektas
    throw new Error("Please add a required fields");
  }
  const ad = await Ad.create({
    text: req.body.text,
    description: req.body.description,
    price: req.body.price,
    user: req.user.id,
  });
  res.status(200).json(ad);
});

//@DESC Get ads
//@route GET /api/ads
//@access PRIVATE
const getAds = asyncHandler(async (req, res) => {
  const ads = await Ad.find({ user: req.user.id });
  res.status(200).json(ads);
});
module.exports = { setAd, getAds };
