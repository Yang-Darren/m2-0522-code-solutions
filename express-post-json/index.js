var express = require('express');
var app = express();

var nextId = 1;
var grades = {
};

app.get('/api/grades', function (req, res) {
  const gradesArr = [];
  for (const id in grades) {
    gradesArr.push(grades[id]);
  }
  res.json(gradesArr);
});

app.listen(3000, () => {
});

app.use(express.json());

app.post('/api/grades', function (req, res) {
  grades[nextId] = req.body;
  grades[nextId].id = nextId;
  res.status(201);
  res.send(grades[nextId]);
  nextId++;
});
