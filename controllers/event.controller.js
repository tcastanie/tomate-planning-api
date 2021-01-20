const db = require("../models");
const Event = db.events;

//events
/*
GET /events
GET /events/:id
POST /events
PUT /events/:id
DELETE /events/:id
*/

// Retrieve all Events from the database.
exports.findAll = async (req, res) => {
    try {
        const docs = await Event.find({});
        res.status(200).send(docs);
    } catch (err) {
        res.status(500).send({
            message: err.message,
            desc: "Error while retrieving all Events"
        });
        throw err;
    }
};

// Find a single Event with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const docs = await Event.findById(id);
        if (!docs) {
            res.status(404).send({ message: "Not found Event with id " + id });
        } else {
            res.status(200).send(docs);
        }
    } catch (err) {
        res.status(500).send({
            message: err.message,
            desc: "Error retrieving Event with id " + id
        });
        throw err;
    }
};

// Find all incoming Events
exports.findInc = async (req, res) => {
    const today = new Date();
    today.setHours(2, 0, 0, 0);
    console.log(today);
    try {
        const docs = await Event.find({ dateEnd: { $gte: today } });
        console.log(docs);
        if (docs.length <= 0) {
            res.status(404).send({ message: "Not found incoming Events" });
        } else {
            res.status(200).send(docs);
        }
    } catch (err) {
        res.status(500).send({
            message: err.message,
            desc: "Error retrieving incoming Events"
        });
        throw err;
    }
};

// Create and Save a new Event
exports.create = async (req, res) => {
    if (!req.body.title || !req.body.dateBegin || !req.body.dateEnd) {
        res.status(400).send({ message: "New Event need a title, a begin and an end" });
        return;
    }
    //create new Event
    const event = new Event({
        idTag: req.body.idTag,
        title: req.body.title,
        desc: req.body.desc,
        place: req.body.place,
        dateBegin: req.body.dateBegin,
        dateEnd: req.body.dateEnd
    });
    try {
        const data = await Event.save(event);
        res.status(201).send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message,
            desc: "Error creating Event"
        });
        throw err;
    }
};

// Update an Event by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Data to update can not be empty" });
        return;
    }
    const id = req.params.id;
    //TODO
};

// Delete an Event with the specified id in the request
exports.delete = (req, res) => {

};
