const dotenv = require("dotenv");
dotenv.config(); // Ensure the .env file is loaded before anything else
const { MONGO_URL, PORT, JWT_SECRET } = process.env; // Also load JWT_SECRET

const Config = { MONGO_URL, PORT, JWT_SECRET }; // Ensure JWT_SECRET is included in the config
module.exports = Config;