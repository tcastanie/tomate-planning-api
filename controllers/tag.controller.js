const db = require("../models");
const Tag = db.tags;

// Create and save a new Tag
exports.create = async (req, res) => {
    if (!req.body.title || !req.body.color) {
        res.status(400).send({ message: "New Tag need a title and color" });
        return;
    }
    const tag = new Tag({
        title: req.body.title,
        color: req.body.color,
        desc: req.body.desc,
    });
    try {
        const data = await tag.save(tag);
        res.status(201).send({
            message: "New Tag created",
            data: data
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
            desc: "Error creating new Tag"
        });
        throw err;
    }
};

// Retrieve all Tags from the database.
exports.findAll = async (req, res) => {
    try {
        const docs = await Tag.find({});
        res.status(200).send(docs);
    } catch (err) {
        res.status(500).send({
            message: err.message,
            desc: "Error while retrieving all Tags"
        });
        throw err;
    }
};

// Retrieve a single Tag with id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const docs = await Tag.findById(id);
        if (!docs) {
            res.status(404).send({ message: "Not found Tag with id " + id });
        } else {
            res.status(200).send(docs);
        }
    } catch (err) {
        res.status(500).send({
            message: err.message,
            desc: "Error retrieving Tag with id " + id
        });
        throw err;
    }
};

// Update a Tag with id
exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Data to update can not be empty" });
        return;
    }
    const id = req.params.id;
    try {
        const data = await Tag.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false });
        if (!data) {
            res.status(404).send({ message: `Cannot update Tag with id=${id}. Maybe Tag was not found` });
        } else {
            res.status(200).send({
                message: "Tag updated successfully",
                data: data
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message,
            desc: "Error updating Tag with id " + id
        });
        throw err;
    }
};

// Delete a Tag with id
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Tag.findByIdAndRemove(id);
        if (!data) {
            res.status(404).send({ message: `Cannot delete Tag with id=${id}. Maybe Tag was not found` });
        } else {
            res.status(200).send({
                message: "Tag deleted successfully",
                data: data
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message,
            desc: "Could not remove Tag with id " + id
        });
        throw err;
    }
};