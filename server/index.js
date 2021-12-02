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



const authorize = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({message: 'No token found'})
  }
  const authTokenArray = req.headers.authorization.split(' ');
  if (authTokenArray[0].toLowerCase() !== 'bearer' && authTokenArray.length !== 2) {
    return res.status(401).json({message: 'Invalid token'});
  }

  jwt.verify(authTokenArray[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({message: 'The token is expired or invalid'});
    }
    req.payload = decoded;
    next();
  });
}

// app.get('/libraries', authorize, (req, res) => {
//   res.json({
//     tokenInfo: req.payload,
//     sensitiveInformation: {
//       secret: 'Old school RPGs, terrible terrible puns, Lo-fi beats to relax/study to'
//     }
//   });
// })





app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
