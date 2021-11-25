const router = require('express').Router();
const booksController = require('../controllers/booksController');

router.route('/')
.get(booksController.index);

module.exports = router;