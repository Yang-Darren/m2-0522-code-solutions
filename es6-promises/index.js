const takeAChance = require('./take-a-chance');

const goodLuck = takeAChance('Darren');
goodLuck.then(value => {
  console.log(value);
}).catch(e => {
  console.log(e.message);
});
