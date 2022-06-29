const fs = require('fs');
const command = process.argv[2];
const textString = process.argv[3];
const idNum = parseInt(textString);
const newNote = process.argv[4];

const read = () => {
  fs.readFile('data.json', 'utf8', (err, jsonString) => {
    if (err) throw err;
    const data = JSON.parse(jsonString).notes;
    for (const [key, value] of Object.entries(data)) {
      console.log(`${key}: ${value}`);
    }
  });
};

const create = textString => {
  fs.readFile('data.json', 'utf8', (err, jsonString) => {
    if (err) throw err;
    const dataObj = JSON.parse(jsonString);
    dataObj.notes[dataObj.nextId] = textString;
    dataObj.nextId++;
    updateNotes(dataObj);
  });
};

const deleteNote = indexNum => {
  fs.readFile('data.json', 'utf8', (err, jsonString) => {
    if (err) throw err;
    const dataObj = JSON.parse(jsonString);
    delete dataObj.notes[indexNum];
    updateNotes(dataObj);
  });
};

const changeNote = (indexNum, newNote) => {
  fs.readFile('data.json', 'utf8', (err, jsonString) => {
    if (err) throw err;
    const dataObj = JSON.parse(jsonString);
    dataObj.notes[indexNum] = newNote;
    updateNotes(dataObj);
  });
};

if (command === 'read') {
  read();
} else if (command === 'create') {
  create(textString);
} else if (command === 'delete') {
  deleteNote(idNum);
} else if (command === 'update') {
  changeNote(idNum, newNote);
}

const updateNotes = jsonString => {
  fs.writeFile('data.json', JSON.stringify(jsonString, null, 2), 'utf8', err => {
    if (err) throw err;
  });
};
