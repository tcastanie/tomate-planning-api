
const uri = require('../config/db.config.js');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const db = {};
db.mongoose = mongoose;
db.uri = uri;
db.events = require("./event.model.js")(mongoose);
db.tags = require("./tag.model.js")(mongoose);

db.connectDB = async () => {
    try {
        await db.mongoose.connect(db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to the database !");
    } catch (err) {
        console.log("Cannot connect to the database !", err);
        process.exit();
    }
};

module.exports = db;