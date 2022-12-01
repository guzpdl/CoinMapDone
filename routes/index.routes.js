const router = require("express").Router();
const validateToken = require('../middleware/validateToken.middleware');


/* GET home page */

router.use("/coins", require("./list.routes"))

router.use("/auth", require("./auth.routes"))

router.use("/", require("./exchanges.routes"))

router.use("/details", require("./details.routes"))

router.use('/user', validateToken, require('./user.routes'))



module.exports = router;
