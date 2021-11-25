const router = require("express").Router();
const librariesController = require("../controllers/librariesController");

//route all libraries
router.route("/").get(librariesController.index);

module.exports = router;
