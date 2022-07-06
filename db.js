const mongoose = require("mongoose");
const { dbUrl } = require('./config');

mongoose.Promise = global.Promise;

const connect = async () => {
 mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, });
 const db = mongoose.connection;
 db.on("error", (err) => {
 console.log(`could not connect to the database because::: ${err}`);
 });
 db.once("open", () => {
 console.log("> Successfully connected to the database");
 });
};

const disconnect = async () => {
  if(mongoose.connection) {
    mongoose.disconnect();
    mongoose.once('closed', async () => {
      console.log('Database disconnected!')
    })
  } else return;
}

module.exports = { connect, disconnect };
