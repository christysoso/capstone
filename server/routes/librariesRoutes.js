const router = require("express").Router();
const librariesController = require("../controllers/librariesController");

//route all libraries
router.route("/").get(librariesController.index);

//routes for single libaries
router.route("/:id").get(librariesController.singleLibrary);

//routes for a library's books
router.route("/:id/books").get(librariesController.libraryBooks);

module.exports = router;
