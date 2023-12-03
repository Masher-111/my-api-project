const express = require('express');

const bodyParser = require('body-parser');

const fs = require('fs')

const joi = require('joi');

const app = express();
const jsonParser = bodyParser.json();




//const users = [];
let uniqueID = 0;

const userShema = joi.object({
    firstName: joi.string().min(2).required(),
    secondName: joi.string().min(2).required(),
    age: joi.number().min(0).max(150).required(),
    city: joi.string().min(2)
})
app.use(express.static(__dirname + '/public'));
//get all users
app.get('/users', (req, res) => {
    const content = fs.readFileSync('users.json', 'utf8');
    const users = JSON.parse(content);
    res.send(users)
})

app.get('/users/:id', (req, res) => {
    const userID = +req.params.id;
    
    const content = fs.readFileSync('users.json', 'utf8');
    const users = JSON.parse(content);
    const user = users.find((user) => user.id === userID);
        if(user) {       
        res.send(user);
    } else {
        res.status(404);
        res.send({user: null});
    }
})

app.post('/users', jsonParser, (req, res) => {
    ++uniqueID;
    let content = fs.readFileSync('users.json', 'utf8');
    const users = JSON.parse(content);
    
    users.push({
        id: uniqueID,
        ...req.body

    })
    content = JSON.stringify(users);
    fs.writeFileSync('users.json', content);
    res.send('added')
})


app.put('/users/:id', (req, res) =>{
    const result = userShema.validate(req.body);
    if(result.error){
        return res.status(404).send({error: result.error.details});
    }
    const userID = +req.params.id;

    const user = users.find((user) => user.id === userID);

    if(user) {
        const {firstName, secondName, age, city} = req.body;
        user.firstName = firstName;
        user.secondName = secondName;
        user.age = age;
        user.city = city;
        res.send(user);
    } else {
        res.status(404);
        res.send({user: null});
    }    
})

app.delete('/users/:id', (req, res) =>{
    const userID = +req.params.id;

    const user = users.find((user) => user.id === userID);

    if(user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        res.send({ user });
    } else {
        res.status(404);
        res.send({user: null});
    }

    
})
app.listen(3000);