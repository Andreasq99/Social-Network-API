const { Schema, model } = require('mongoose');
const {userSchema} = require('./User');
const reactionSchema = require('./Reaction.js');

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatTimestamp
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

function formatTimestamp(createdAt){
    return createdAt;
}

thoughtSchema
.virtual('reactionCount')
.get(function(){
    return this.reactions.length;
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
