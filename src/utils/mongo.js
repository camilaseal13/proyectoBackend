const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectMongo = async () => {
  try {
    console.log("Intentando conectar a:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔌 Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectMongo;
