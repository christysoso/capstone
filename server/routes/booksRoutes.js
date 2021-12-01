const router = require("express").Router();
const booksController = require("../controllers/booksController");

//gets all books
router.route("/").get(booksController.index).post(booksController.addBook);

//gets single book
router
  .route("/:id")
  .get(booksController.singleBook)
  .delete(booksController.deleteBook);

router.route("/info/info").get(booksController.bookLibraryInfo);

module.exports = router;
