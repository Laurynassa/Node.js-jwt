const express = require("express");
const router = express.Router();

const { setAd, getAds } = require("../controlers/adController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(protect, setAd).get(protect, getAds);

module.exports = router;
