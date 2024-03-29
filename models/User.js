const { Schema, model, Types} = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([-\.+]?\w+)*@\w+\.(\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: {
      type: [Types.ObjectId]
    },
    friends: {
      type: [Types.ObjectId]
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;
