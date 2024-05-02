process.env.NODE_ENV !== "production" ? require("dotenv").config() : null;

exports.dbUser = process.env.dbUser || "Martins_c";
exports.dbPass = process.env.dbPass || "chibuzo1";
exports.databaseUrl  = `mongodb+srv://${this.dbUser}:${this.dbPass}@cluster0-gussd.mongodb.net/blogapp?retryWrites=true&w=majority`;

