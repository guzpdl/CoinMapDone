require('dotenv/config');
const mongoose = require('mongoose');
const coinModel = require('../models/Coin.model');
const Coins = require("../service/api-coingecko")

mongoose
    .connect('mongodb://localhost:27017')
    .then((x) => {
        
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .then(()=>{
        return Coins
        .getData()
    })
    .then((data)=>{
         return coinModel
        .create(data) 
    })
    .then(() => {
        console.log('created')
    })
    .catch((err) => console.log(err))
    .finally(() => {
        mongoose.disconnect()
    })