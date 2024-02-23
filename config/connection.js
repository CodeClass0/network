const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/networkDB';

connect(connectionString, console.log("mongo db connected"));

module.exports = connection;
