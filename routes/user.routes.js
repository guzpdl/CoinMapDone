const { getUser, editUser, getFavCoins, updateFavCoins, removeFavCoins } = require('../controller/getUser.controller');
const validateToken = require('../middleware/validateToken.middleware')

const router = require('express').Router();


// ------------- GET ------------

router.get('/profile', getUser)

router.get('/profile/:id', validateToken)

router.get('/profile/favs/:id', getFavCoins)


// --------------- PUT -------------

router.put('/profile/:id', editUser) 

router.put('/profile/favs/:id', updateFavCoins)
// DELETE
router.put('/profile/favs/remove/:id', removeFavCoins)






module.exports = router;