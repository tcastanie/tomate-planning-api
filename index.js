const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const app = express();

require('dotenv').config();

// const events = require('./test/events.json');
// const tags = require('./test/tags.json');

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const DBNAME = process.env.DB_NAME;
const PORT = process.env.PORT || 2020;
const uri = `mongodb+srv://${USER}:${PASS}@${HOST}/${DBNAME}?retryWrites=true&w=majority`;

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db;
client.connect(err => {
    //console.log("Connected successfully to server");
    db = client.db(DBNAME);
    //client.close();
});

app.use(express.json());
app.use(compression());
app.use(helmet());

app.get('/events', async (req, res) => {
    try {
        const docs = await db.collection('events').find({}).toArray();
        res.status(200).json(docs);
    } catch (err) {
        console.log(err);
        throw err;
    }
})

app.get('/tags', async (req, res) => {
    try {
        const docs = await db.collection('tags').find({}).toArray();
        res.status(200).json(docs);
    } catch (err) {
        console.log(err);
        throw err;
    }
})

app.listen(PORT, () => {
    console.log(`Tomate-planning server running on port ${PORT}`);
})