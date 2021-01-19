const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(compression());
app.use(helmet());

//connection database
const db = require("./models");
db.connectDB();

//root
app.get('/', (req, res) => {
    try {
        res.send("Tomate Planning API <3");
    } catch (err) {
        console.log(err);
        throw err;
    }
});

require("./routes/event.routes")(app);
require("./routes/tag.routes")(app);

const PORT = process.env.PORT || 2020;
app.listen(PORT, () => {
    console.log(`Tomate-planning server running on port ${PORT}`);
});