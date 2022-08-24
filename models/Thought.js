const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Enter your thought!",
      maxlength:280,
      minlength:1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) =>
            moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")    
    },
    username: {
      type:String,
      required: "Enter your username!",
    },
    reactions:[ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters:true
    },
    id: false
  }
);

UserSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
          type: String,
          required: "enter youur reaction!",
          maxlength:280    
      },
      username: {
        type:String,
        required: "Enter your username!",
      },createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) =>
            moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")    
    },
      reactions:[ReactionSchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters:true
      },
      id: false
    }
  );

const Thought = mongoose.model("Thought", ThoughtSchema);

module.exports = Thought;
