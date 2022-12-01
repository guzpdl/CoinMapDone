const { exchanges }  = require('../controller/exchange.controller');
const router = require('express').Router();



router.get('/exchanges', exchanges)

module.exports = router;

