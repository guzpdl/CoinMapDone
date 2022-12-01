const { Schema, model } = require("mongoose");


const CoinSchema = new Schema(

    {
        id: {type: String},
        symbol: {type: String},
        name: {type: String},
        comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }],      
    },
    {
        timestamps: true,
        versionKey: false,
    }
)
const coinModel = model("coin", CoinSchema);

module.exports = coinModel