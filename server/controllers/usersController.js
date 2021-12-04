const knex = require("knex")(require("../knexfile").development);
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.addUsers = (req, res) => {
  const password = req.body.password;
  const hash = bcrypt.hashSync(password, 10);

  knex("users")
    .insert({ username: req.body.username, password: req.body.password })
    .then((data) => {
      res.status(201).json({ message: "You have registered", data: data });
    })
    .catch((err) => {
      res.status(400).send(`Error registering ${err}`);
    });
};



//middleware
const authorize = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({message: 'No token found'})
  }
  const authTokenArray = req.headers.authorization.split(' ');
  if (authTokenArray[0].toLowerCase() !== 'bearer' && authTokenArray.length !== 2) {
    return res.status(401).json({message: 'Invalid token'});
  }

  jwt.verify(authTokenArray[1], "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({message: 'The token is expired or invalid'});
    }
    req.payload = decoded;
    next();
  });
}









exports.loginUsers = (req, res) => {
  const password = req.body.password;
  knex("users")
    .select("username", "password")
    .where({ username: req.body.username, password: req.body.password })
    .then((data) => {
      if (data.length > 0) {

        const token = jwt.sign(
          {
            username: req.body.username,
          },
          "secret",
          { expiresIn: "5m" }
        );
        res.status(201).json({ auth: true, data: data, token: token });
      } else {
        res.send({ message: "error logging in" });
      }
    })
    .catch((err) => {
      res.status(400).send(`user does not exist ${err}`);
    });
};
