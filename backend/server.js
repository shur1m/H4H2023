const express = require('express');

const cors =require("cors");
const app = express();

// Growth Graph
const graphs =require("./routes/growthgraph");
const users =require("./routes/users");
const port = process.env.PORT || 8080;
const bodyParser =require('body-parser');

app.use(bodyParser.json());
app.use(cors({
    origin: "*",
    credentials: true
}));

app.use('/graphs', graphs);
app.use('/users', users);

app.get("/", (req, res) => {
    res.send("Testing JavaScript!");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

