const express = require('express');

const app = express();

const users = [];

let uniqueID = 0;
app.use(express.json())
app.get('/users', (req, res) => {
    res.send({ users })
})

app.post('/users', (req, res) => {
    uniqueID += 1;
    users.push({
        id: uniqueID,
        ...req.body

    })
    res.send({ id: uniqueID })
})

app.listen(3000);