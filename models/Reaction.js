const {Schema} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatTimestamp
        }
    },
    {
        toJSON: {
          getters: true
        }
    }
);

function formatTimestamp(createdAt){
    return createdAt;
}

module.exports = reactionSchema;