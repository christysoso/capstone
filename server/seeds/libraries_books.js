const libraryData = require("../seed_data/libraries");
const booksData = require("../seed_data/books");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("libraries")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("libraries").insert(libraryData);
    })
    .then(() => {
      return knex("books").del();
    })
    .then(() => {
      return knex("books").insert(booksData);
    });
};
