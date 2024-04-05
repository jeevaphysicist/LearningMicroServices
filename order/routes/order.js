const express = require( 'express' );
const router = express.Router();
const { GetaOrder ,createaOrder} = require('../controllers/order');
const { VerifyToken } = require('../middlewares/AuthenticationChecker');

router.post('/createaorder',VerifyToken,createaOrder);
router.get('/getaorder/:id', VerifyToken ,GetaOrder);
router.get('public/getaorder/:id' ,GetaOrder);

module.exports = router ;

