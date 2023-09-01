const dotenv = require("dotenv");
const { parse } = require("pg-connection-string");

dotenv.config({ path: ".env" });

const options = parse(process.env.DATABASE_URL || "");

options.ssl = true;

module.exports = options;
