const db = require("../models");
const Tag = db.tags;

//tags
/*
GET /tags
GET /tags/:id
POST /tags
PUT /tags/:id
DELETE /tags/:id
*/

// Retrieve all Tags from the database.
exports.findAll = async (req, res) => {
    try {
        const docs = await Tag.find({});
        res.status(200).send(docs);
    } catch (err) {
        res.status(500).send({ message: err.message || "Error while retrieving all Tags" });
        throw err;
    }
};