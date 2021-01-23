const db = require("../models");
const Event = db.events;

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
    try {
        const docs = await Event.find({ dateEnd: { $gte: today } });
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
        const data = await event.save(event);
        res.status(201).send({
            message: "New Event created",
            data: data
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
            desc: "Error creating Event"
        });
        throw err;
    }
};

// Update an Event by the id in the request
exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Data to update can not be empty" });
        return;
    }
    const id = req.params.id;
    try {
        const data = await Event.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false });
        if (!data) {
            res.status(404).send({ message: `Cannot update Event with id=${id}. Maybe Event was not found` });
        } else {
            res.status(200).send({
                message: "Event updated successfully",
                data: data
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message,
            desc: "Error updating Event with id " + id
        });
        throw err;
    }
};

// Delete an Event with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Event.findByIdAndRemove(id);
        if (!data) {
            res.status(404).send({ message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found` });
        } else {
            res.status(200).send({
                message: "Event deleted successfully",
                data: data
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message,
            desc: "Could not Event with id " + id
        });
        throw err;
    }
};
