const knex = require("knex")(require("../knexfile").development);

//gets all books
exports.index = (req, res) => {
  knex("books")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving books: ${err}`));
};

//gets single book
exports.singleBook = (req, res) => {
  knex("books")
    .where({ id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving book: ${err}`);
    });
};

exports.addBook = (req, res) => {
  knex("books")
    .insert(req.body)
    .then((data) => {
      res.status(201).json({ message: "Your book has been added", data: data });
    })
    .catch((err) => {
      res.status(400).send(`Error adding book ${err}`);
    });
};

exports.deleteBook = (req, res) => {
  knex("books")
    .delete()
    .where({ id: req.params.id })
    .then((data) => {
      res
        .status(200)
        .json({ message: "Your book as been deleted", data: data });
    })
    .catch((err) => {
      res.status(400).send(`Error deleting this book ${err}`);
    });
};

exports.bookLibraryInfo = (req, res) => {
  knex("books")
    .join("libraries", "books.library_id", "=", "libraries.id")
    .select("books.title","books.id", "books.library_id","books.author", "libraries.address","libraries.region")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).send("Error retrieving getting data");
    });
};

