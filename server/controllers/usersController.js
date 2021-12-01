const knex = require("knex")(require("../knexfile").development);
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.addUsers = (req, res) => {
  // const password = req.body.password;
  // const hash = bcrypt.hashSync(password, 10);

  knex("users")
    .insert({ username: req.body.username, password: req.body.password})
    .then((data) => {
      res.status(201).json({ message: "You have registered", data: data });
    })
    .catch((err) => {
      res.status(400).send(`Error registering ${err}`);
    });
};

exports.loginUsers = (req, res) => {
  knex("users")
    .select("username", "password")
    .where({ username: req.body.username, password: req.body.password })
    .then((data) => {
      if (data.length > 0) {
        const token = jwt.sign(
          {
            username: req.body.username,
            loginTime: Date.now(),
          },
          "secret",
          { expiresIn: "5m" }
        );
        res.status(201).send({ auth: true, data: data , token:token });
      } else {
        res.send({ message: "error logging in" });
      }
    })
    .catch((err) => {
      res.status(400).send(`Error logging in ${err}`);
    });
};
