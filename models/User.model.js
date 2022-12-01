const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String, unique: true, required: true
    },

    email: {
      type: String, unique: true, required: true
    },

    password: {
      type: String, required: true
    },
    favorite_coins: [{
      type: Schema.Types.ObjectId, ref: 'coin'    
    }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
    versionKey: false,
  }
);

const userModel = model("user", userSchema);

module.exports = userModel;
