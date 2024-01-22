const { connect, connection, set} = require('mongoose');

connect('mongodb://127.0.0.1:27017/SocialNetwork');
set('debug', true);

module.exports = connection;
