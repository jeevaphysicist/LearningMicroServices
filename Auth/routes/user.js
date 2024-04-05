const express = require( 'express' );
const router = express.Router();
const { Login ,createAccount } = require('../controllers/user');

router.post('/create-account',createAccount);
router.post('/login',Login);

module.exports = router ;

