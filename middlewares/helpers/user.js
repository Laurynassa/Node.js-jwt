//tikrina, ar vartotojas yra prisijunges ir grazina informacija apie ji
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const NOT_AUTHORIZED = "not authorized";
const NO_TOKEN_NOT_AUTHORIZED = "not authorized,no token";

async function getUser(req) {
  if (
    ///TIKRINA AR ISVIS AUTHORIZATIONAS SU BEARER
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //tikrina pati token
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return { status: 401, response: NO_TOKEN_NOT_AUTHORIZED };
      }
      //tokeno atsikodavimas slaptu env pasirasymu, bei susirandam user visa info isskyrus slaptazodi
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      return { status: 200, response: user };
    } catch (error) {
      console.log(error);

      return { status: 401, response: NOT_AUTHORIZED };
    }
  }
  return { status: 401, response: NOT_AUTHORIZED };
}

module.exports = { getUser, notAuthorizedMessage: NOT_AUTHORIZED };
