const { getDetails, coinData, historicalChart, makeComment, deleteComment, getComments }  = require('../controller/coinDetails.controller');
const router = require('express').Router();
const validateToken = require('../middleware/validateToken.middleware')

// ---------- GET ----------------

router.get('/:id', getDetails)
router.get('/coins/:id', coinData)
router.get('/chart/:id', historicalChart)
router.get('/coins/comment/:id', getComments) //bitcoin

// -------------- POST ---------------
router.post('/coins/comment/:id', validateToken, makeComment) //bitcoin

// ---------------- DELETE -----------------
router.delete('/coins/comment/delete/:id', validateToken, deleteComment) //id del comment

module.exports = router;