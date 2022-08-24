const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Enter a name!",
      unique: true
    },
    email: {
      type: String,
      required: "Enter an email!",
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: {
      type:Schema.Types.ObjectId,
      ref: "Thought"
    },
    friends:{
      type:Schema.Types.ObjectId,
      ref:"User"
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
