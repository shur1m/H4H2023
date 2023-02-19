const express = require('express');

const cors = require("cors");
const app = express();

const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

// Growth Graph
const graphs = require("./routes/growthgraph");

app.use(bodyParser.json());
app.use(cors({
    origin: "*",
    credentials: true
}));

app.use('/graphs', graphs);

app.get("/", (req, res) => {
    res.send("Testing JavaScript!");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

