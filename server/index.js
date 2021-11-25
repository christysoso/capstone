require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const knex = require('knex')(require('./knexfile').development); // import knex with db config
const PORT = process.env.PORT || 5050;
const librariesRoutes  = require("./routes/librariesRoutes");
const booksRoutes = require('./routes/booksRoutes');

app.use(express.json());
app.use(cors());

// app.get('/', (req, res) => {
//     res.send('Welcome to my API');
//   });

app.use('/libraries', librariesRoutes);
app.use('/books', booksRoutes);



app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});

