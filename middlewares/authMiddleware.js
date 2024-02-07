//apsauga nuo neautorizuotu vartotoju kad nepasiektu tam tikros info ar routu
const asyncHandler = require("express-async-handler");
const { getUser } = require("./helpers/user");

const protect = asyncHandler(async (req, res, next) => {
  //tikrina ir siftuoja statusa ir user
  const { status, response } = await getUser(req);

  if (status === 200) {
    req.user = response;
    next();
  } else {
    res.send(status, response);
  }
});

module.exports = { protect };
