const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");

require("dotenv").config();

const { DB_HOST } = process.env;

mongoose.set("strictQuery", false);

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connects success"))
  .catch((e) => console.log(e));

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
