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

// Create and Save a new Event
exports.create = (req, res) => {

};

// Retrieve all Events from the database.
exports.findAll = async (req, res) => {
    try {
        const docs = await Event.find({});
        res.status(200).send(docs);
    } catch (err) {
        res.status(500).send({ message: err.message || "Error while retrieving all Events" });
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
        res.status(500).send({ message: "Error retrieving Event with id " + id });
        throw err;
    }
};

// Update an Event by the id in the request
exports.update = (req, res) => {

};

// Delete an Event with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Events from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Events
exports.findAllPublished = (req, res) => {

};
