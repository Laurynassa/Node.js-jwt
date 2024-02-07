const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectingToDB = async () => {
  try {
    const connecting = await mongoose.connect(`${process.env.MONGO_DB_URL}`);
    console.log(`Connected tp ${connecting.connection.host}`);
  } catch (err) {
    console.log(`Couldnt connect ${err}`);
  }
};
module.exports = connectingToDB;
