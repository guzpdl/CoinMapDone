const { Schema, model } = require("mongoose");


const CommentSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'user' },
        coin: { type: Schema.Types.ObjectId, ref: 'coin' },
        comment_body: { type: String, required: true }

    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const commentModel = model('comments', CommentSchema);

module.exports = commentModel;