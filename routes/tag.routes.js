module.exports = app => {
    const tags = require("../controllers/tag.controller.js");
    var router = require("express").Router();

    // Retrieve all Tags
    router.get("/", tags.findAll);

    app.use('/tags', router);
};
