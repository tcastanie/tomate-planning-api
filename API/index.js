const express = require('express');
const app = express();

const events = require('./test/events.json');
const tags = require('./test/tags.json');

app.get('/events', async (req,res) => {
    try {
        //const docs = await db.collection('events').find({}).toArray()
        //res.status(200).json(docs)
        res.status(200).json(events)
    } catch (err) {
        console.log(err)
        throw err
    }
})

app.get('/tags', async (req,res) => {
    try {
        //const docs = await db.collection('events').find({}).toArray()
        //res.status(200).json(docs)
        res.status(200).json(tags)
    } catch (err) {
        console.log(err)
        throw err
    }
})

app.listen(2020, () => {
    console.log('Tomate-planning server running on port 2020')
})