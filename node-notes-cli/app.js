const fs = require('fs');
const command = process.argv[2];
const textString = process.argv[3];
const idNum = parseInt(textString);
const newNote = process.argv[4];

const read = () => {
  fs.readFile('data.json', 'utf8', (err, jsonData) => {
    if (err) throw err;
    const data = JSON.parse(jsonData).notes;
    for (const [key, value] of Object.entries(data)) {
      console.log(`${key}: ${value}`);
    }
  });
};

const create = textString => {
  fs.readFile('data.json', 'utf8', (err, jsonData) => {
    if (err) throw err;
    const dataObj = JSON.parse(jsonData);
    dataObj.notes[dataObj.nextId] = textString;
    dataObj.nextId++;
    updateNotes(dataObj);
  });
};

const deleteNote = indexNum => {
  fs.readFile('data.json', 'utf8', (err, jsonData) => {
    if (err) throw err;
    const dataObj = JSON.parse(jsonData);
    delete dataObj.notes[indexNum];
    updateNotes(dataObj);
  });
};

const changeNote = (indexNum, newNote) => {
  fs.readFile('data.json', 'utf8', (err, jsonData) => {
    if (err) throw err;
    const dataObj = JSON.parse(jsonData);
    if (dataObj.notes[indexNum]) {
      dataObj.notes[indexNum] = newNote;
      updateNotes(dataObj);
    } else {
      throw err;
    }
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

const updateNotes = jsonData => {
  fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), 'utf8', err => {
    if (err) throw err;
  });
};
