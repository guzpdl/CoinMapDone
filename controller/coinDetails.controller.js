const coinModel = require("../models/Coin.model")
const details = require("../models/coinDetails.model")
const commentModel = require("../models/Comment.model")
const userModel = require("../models/User.model")
require('mongoose')
const Coins = require("../service/api-coingecko")

const getDetails = (req, res, next) => {
    const {id} = req.params
    coinModel
        .find({id})
        .then((details) => {
            res.status(200).json(details)
        })
        .catch((err) => (console.log(err)))

}

const historicalChart = (req,res, next) => {
    const {id} = req.params
    Coins
    .chart(id)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => console.log(err))
}

const getComments = (req, res, next) => {

    const {id} = req.params
    console.log('la moneda a la que hay que traerle los comments ---->', id)

    coinModel
    .findOne({id:id})
    .populate({path: 'comments', populate: {path: 'user'}})
    .then(coinInfo => {

        return coinInfo.comments.flatMap(elements => {
            return ([elements.user.username, elements.comment_body]) 

        })
        })
        .then((details) =>{

            res.status(200).json(details)
        })
    .catch((err) => (console.log(err)))
}


const makeComment = (req, res, next) => {

    const {id: coinId} = req.params
    const {commentBody} = req.body 
    const {_id} = req.user

    coinModel
    .findOne({id: coinId})
    .then((coinData) => {
        console.log('ID DEL COIN formato MONGO', coinData._id)
            
        return commentModel
        .create({coin: coinData._id, comment_body: commentBody, user: _id})
        .then((newComment) => {

            console.log('NUEVO COMENTARIO', newComment)
            
            return coinModel
            .updateOne({_id: newComment.coin},
                 {$push: {comments: newComment._id}})
        })
        .then(() => {

            res.sendStatus(200)
        })
     }) 
    .catch((err) => (console.log(err)))
}

const deleteComment = (req, res, next) => {

    const {id: commentId} = req.params
    // console.log(id);
    console.log(typeof commentId)

commentModel
    .findByIdAndDelete(commentId) 
    .then((commentId) => {

        console.log(commentId);
        return coinModel
        .updateOne({_id: commentId.coin},
             {$pull: {comments: commentId._id}

        })

        .then(() => {
            res.sendStatus(200)
        })



    })
    .catch((err) => (console.log(err)))
}



const coinData = (req, res, next) => {
    Coins   
    .changingDetails(req.params.id)
    .then(({
        market_data:{
            current_price:{usd: currentPriceUsd}, 
            market_cap:{usd: marketCapUsd}, 
            total_volume:{usd: volumeUsd}, 
            price_change_24h,
            price_change_percentage_24h,
            max_supply,
            circulating_supply
        },
        description:{en}, 
        image:{thumb}, 
        market_cap_rank, 
        sentiment_votes_up_percentage, 
        sentiment_votes_down_percentage
    }) => {
        // const {current_price} = {usd}
        res.status(200).json({thumb, 
            en,
            market_cap_rank, 
            sentiment_votes_up_percentage, 
            sentiment_votes_down_percentage,
            marketCapUsd, 
            currentPriceUsd, 
            volumeUsd,
            price_change_24h,
            price_change_percentage_24h,
            max_supply,
            circulating_supply
        })
    })
    .catch((err)=> console.log(err))
}

module.exports = {getDetails, coinData, historicalChart, makeComment, deleteComment, getComments}