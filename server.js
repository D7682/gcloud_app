const dotenv = require('dotenv').config({path: './config/.env'});
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const User = require('./models/User');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    User.find({}, (err, models) => {
        if(models){
           res.json(models)
        } else {
            res.send(err)
        }
    })
})

app.delete('/', (req, res) => {
    User.deleteOne({username: req.body.username, age: JSON.parse(req.body.age)})
    .then(() => console.log("The Document has been deleted successfully") && res.send("The Document has been deleted successfully"))
    .catch(err => console.log(err) && res.send(err))
})

app.put('/:username', (req, res) => {
   res.send("Put not yet configured")
})

app.post('/', (req, res) => {
    new User({username: req.body.username, age: req.body.age}).save()
    .then(() => User.find({}, (err, models) => {
        if(models){
            res.json(models)
        } else {
            res.send(err)
        }
    }))
    .catch(err => console.log(err))
})


const port = process.env.PORT || 9000;

mongoose.connect(process.env.mongo_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log(`Mongoose DB has connected successfully`))
.catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Server has connected successfully on port ${port}`)
})