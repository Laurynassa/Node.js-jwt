require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db.js");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
// const port = process.env.PORT || 6000

connectToDB();

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/ads", require("./routes/adRoutes"));
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
