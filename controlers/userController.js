const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

//@description - ka atlieka : ==> register new user
//@route- kaip patikrinama postman'e ==> POST /api/users
//@access- ar private,ar publick: ==> PUBLIC ---ar gali
//prisijungit bet kas ar tik tam tikri useriai(e.g.admin)

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, email, password } = req.body;
  if (!firstname || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User alreaty exsists");
  }
  //hash password- kiek simboliu papildomai prideti uzsifruojant
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    firstname,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      //jauyra is db esati info ir grazina response su ja jau db esanciais duomenimis
      //sukuria JSON objekta,kuris yra siuncamas atsakyme (response) i client
      _id: user.id,
      firstname: user.firstname,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//-------------------------------------

//Genereate JWT: imamas userio ID ir prie jo pridedama uzkodavimo druskyte
//(papildomas dalykas, kad butu neimanoma atkoduoti) is .env failo
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
//login user
//@route /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstname: user.firstname,
      email: user.email,
      toke: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credencials");
  }
});
module.exports = { registerUser, loginUser };
