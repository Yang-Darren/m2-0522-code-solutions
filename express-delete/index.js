var express = require('express');
var app = express();
var grades = {
  12: {
    id: 12,
    name: 'Tim Berners-Lee',
    course: 'HTML',
    score: 95
  },
  47: {
    id: 47,
    name: 'Brendan Eich',
    course: 'JavaScript',
    score: 100
  },
  273: {
    id: 273,
    name: 'Forbes Lindsay',
    course: 'JavaScript',
    score: 92
  }
};

const gradesArr = [];
for (const id in grades) {
  gradesArr.push(grades[id]);
}

app.get('/api/grades', function (req, res) {
  const gradesArr = [];
  for (const id in grades) {
    gradesArr.push(grades[id]);
  }
  res.json(gradesArr);
});

app.delete('/api/grades/:id', function (req, res) {
  delete grades[req.params.id];
  res.sendStatus(204);
});

app.listen(3000, () => {
});
