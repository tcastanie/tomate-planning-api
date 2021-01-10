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
var db;
client.connect(err => {
    try {
        console.log("Connected successfully to server");
        db = client.db();
    } catch (err) {
        console.log("Connection error",err);
        client.close();
        throw err;
    }
});

app.use(express.json());
app.use(compression());
app.use(helmet());

//root
app.get('/', (req, res) => {
    try {
        res.send("Tomate Planning API <3");
    } catch (err) {
        console.log(err);
        throw err;
    }
});

//events
/*
GET /events
GET /events/:id
POST /events
PUT /events/:id
DELETE /events/:id
*/
app.get('/events', async (req, res) => {
    try {
        const docs = await db.collection('events').find({}).toArray();
        res.status(200).json(docs);
    } catch (err) {
        console.log(err);
        throw err;
    }
});

app.get('/events/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const docs = await db.collection('events').find({id}).toArray();
        res.status(200).json(docs);
    } catch (err) {
        console.log(err);
        throw err;
    }
});

//tags
/*
GET /tags
GET /tags/:id
POST /tags
PUT /tags/:id
DELETE /tags/:id
*/
app.get('/tags', async (req, res) => {
    try {
        const docs = await db.collection('tags').find({}).toArray();
        res.status(200).json(docs);
    } catch (err) {
        console.log(err);
        throw err;
    }
});

app.listen(PORT, () => {
    console.log(`Tomate-planning server running on port ${PORT}`);
});