const {getAllCoins, getAllData, searchCoin, getTrending}  = require('../controller/coin.controller');
const router = require('express').Router();



router.get('/home', getAllCoins)
router.get('/trending', getTrending)
router.get('/search', searchCoin)


// useless - imported to MD
router.get('/market', getAllData) 

module.exports = router;

