const express = require( 'express' );
const router = express.Router();
const { GetaUser } = require('../controllers/user');
const { VerifyToken } = require('../middlewares/AuthenticationChecker');

router.get('/getauser/:id', VerifyToken ,GetaUser);
router.get('/public/getauser/:id' ,GetaUser);

module.exports = router ;

