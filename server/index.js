require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const knex = require("knex")(require("./knexfile").development); // import knex with db config
const PORT = process.env.PORT || 5000;
const librariesRoutes = require("./routes/librariesRoutes");
const booksRoutes = require("./routes/booksRoutes");
const usersRoutes = require('./routes/usersRoutes');
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cors());

app.use("/libraries", librariesRoutes);
app.use("/books", booksRoutes);
app.use('/signup', usersRoutes);




app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
