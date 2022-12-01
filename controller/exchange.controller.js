const Coins = require("../service/api-coingecko")

const exchanges = (req, res, next) => {
    Coins   
    .top100Exchanges()
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err)=> console.log(err))
}

module.exports = {exchanges}