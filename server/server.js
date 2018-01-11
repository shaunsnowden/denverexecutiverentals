const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');


const Properties = require('./models/Properties.js');
const Rentals = require('./models/Properties.js');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());

console.log(path.resolve("../build"));
console.log(path.join(__dirname, "../build"));

app.use(express.static(path.join(__dirname, "../build")));

app.get('/api', (req, res) => res.send('Hello World from 8080!'));


app.get('/api/properties', (req, res) => {
  Properties.find({})
   .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message ? err.message : 'Internal Server Blowup')
    });
});

var databaseUri = "mongodb://localhost/27017";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseUri);
}

app.get('/api/rentals', (req, res) => {
  Rentals.findOne(req.body.sub)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message ? err.message : 'Internal Server Blowup')
    });
});

// app.post('/api/posts', (req, res) => {
//   let newPost = new Post();
//   newPost.title = req.body.title;
//   newPost.body = req.body.body;
//   newPost.author = req.body.author;
//   newPost.save()
//     .then(() => {
//       res.sendStatus(204);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send(err.message ? err.message : 'Internal Server Blowup')
//     });
// });

// HERE IS WHERE WE NAME OUR DATABASE
mongoose.connect('mongodb://localhost/Properties');

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
