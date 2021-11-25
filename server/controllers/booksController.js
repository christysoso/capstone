const knex = require('knex')(require('../knexfile').development);

exports.index = (req, res) => {
    knex('books')
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving books: ${err}`)
      );
  };