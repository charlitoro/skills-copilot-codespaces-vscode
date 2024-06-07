// Create web server
// Create a web server that listens on port 3000 and serves the comments.json file.
// The comments.json file is an array of objects that have a name and comment property.
// Create a route that returns the comments as JSON.
// Create a route that accepts POST requests to add comments to the array.
// Create a route that accepts PUT requests to edit comments in the array.
// Create a route that accepts DELETE requests to remove comments from the array.
// You will need to use the fs module to read and write the file.
// You will need to use the body-parser module to parse the POST request body.

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const comments = require('./comments.json');

const app = express();
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
    if (err) {
      res.status(500).send('Error writing to file');
    } else {
      res.status(201).send('Comment added');
    }
  });
});

app.put('/comments/:index', (req, res) => {
  const index = req.params.index;
  const comment = req.body;
  comments[index] = comment;
  fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
    if (err) {
      res.status(500).send('Error writing to file');
    } else {
      res.status(200).send('Comment updated');
    }
  });
});

app.delete('/comments/:index', (req, res) => {
  const index = req.params.index;
  comments.splice(index, 1);
  fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
    if (err) {
      res.status(500).send('Error writing to file');
    } else {
      res.status(200).send('Comment deleted');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});