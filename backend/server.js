const express = require('express');
const app = express();

const port = 8080;

let info = [
    {"id": 1, "name": "John", "age": 20},
    {"id": 2, "name": "Jane", "age": 21}
]

app.get("/", (req, res) => {
    res.send("Testing JavaScript!");
})

app.get("/info/:num", (req, res) => {
    res.json(info[req.params.num - 1]);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

