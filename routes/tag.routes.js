module.exports = app => {
    const tags = require("../controllers/tag.controller.js");
    var router = require("express").Router();

    // Create a new Tag
    router.post("/", tags.create);

    // Retrieve all Tags
    router.get("/", tags.findAll);

    // Retrieve a single Tag with id
    router.get("/:id", tags.findOne);

    // Update a Tag with id
    router.put("/:id", tags.update);

    // Delete a Tag with id
    router.delete("/:id", tags.delete);

    app.use('/tags', router);
};
