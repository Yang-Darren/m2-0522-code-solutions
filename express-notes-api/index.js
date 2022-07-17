const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

function ObjtoArr(obj) {
  const newArray = [];
  for (const id in obj) {
    newArray.push(obj[id]);
  }
  return newArray;
}

app.get('/api/notes', function (req, res) {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    const notesArray = ObjtoArr(obj.notes);
    res.status(200).send(notesArray);
  });
});

app.get('/api/notes/:id', function (req, res) {
  const idNumber = Number(req.params.id);
  if (!Number.isInteger(idNumber) || idNumber <= 0) {
    res.status(400).json({ Error: 'id must be a postive integer' });
    return;
  }
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    if (obj.notes[idNumber] === undefined) {
      return res.status(404).send({ error: `cannot find note with id ${idNumber}` });
    }
    return res.status(200).send(obj.notes[idNumber]);
  });
});

app.post('/api/notes', function (req, res) {
  const newNote = req.body.content;
  if (!newNote.content === undefined || newNote.length === 0) {
    return res.status(400).send({ error: 'content is a required field' });
  }
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    const { nextId: idNum } = obj;
    obj.notes[idNum] = { content: newNote, id: idNum };
    obj.nextId++;
    fs.writeFile('data.json', JSON.stringify(obj, null, 2), err => {
      if (err) return res.status(500).send({ error: 'An unexpected error occurred.' });
      res.status(201).send(obj.notes[idNum]);
    });
  });
});

app.delete('/api/notes/:id', function (req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).send({ error: 'id must be a positive integer' });
  }
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    if (obj.notes[id] === undefined) {
      return res.status(404).send({ error: `cannot find note with id ${id}` });
    }
    delete obj.notes[id];
    fs.writeFile('data.json', JSON.stringify(obj, null, 2), err => {
      if (err) return res.status(500).send({ error: 'An unexpected error occurred.' });
      res.sendStatus(204);
    });
  });
});

app.put('/api/notes/:id', function (req, res) {
  const id = Number(req.params.id);
  const newNote = req.body.content;
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).send({ error: 'id must be a positive integer' });
  }
  if (newNote === undefined || newNote.length === 0) {
    return res.status(400).send({ error: 'content is a required field' });
  }
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    if (obj.notes[id] === undefined) {
      return res.status(404).send({ error: `cannot find note with id ${id}` });
    }
    obj.notes[id].content = newNote;
    fs.writeFile('data.json', JSON.stringify(obj, null, 2), err => {
      if (err) return res.status(500).send({ error: 'An unexpected error occurred.' });
      res.status(200).send(obj.notes[id]);
    });
  });
});

app.listen(3000, () => {
});
