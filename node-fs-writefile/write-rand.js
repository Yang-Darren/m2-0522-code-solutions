const fs = require('fs');
const randomNumber = Math.random();
fs.writeFile('./random.txt', randomNumber.toString() + '\n', err => {
  if (err) throw err;
});
