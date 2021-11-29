const router = require("express").Router();
const usersController = require('../controllers/usersController');


router.route('/register').post(usersController.addUsers);

router.route('/login').post(usersController.loginUsers);





module.exports = router;