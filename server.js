var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

const jsonFile = './test.json';

app.use(bodyParser.json());

app.get('/getNote', function (req, res) {
  fs.readFile(jsonFile, 'utf8', function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.post('/updateNote/:note', function (req, res) {
  fs.readFile(jsonFile, 'utf8', function (err, data) {
    if (err) throw err;
    const dataObject = JSON.parse(data);

    const { note } = req.params;
    dataObject.notes.push(note);
    data = JSON.stringify(dataObject);

    fs.writeFile(jsonFile, data, function (err) {
      if (err) throw err;
      console.log('file updated');
      res.send(data);
    });
  });
});

var server = app.listen(3000);