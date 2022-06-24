const add = require('./add');
const divide = require('./divide');
const multiply = require('./multiply');
const subtract = require('./subtract');

const x = Number(process.argv[2]);
const y = Number(process.argv[4]);

if (process.argv[3] === 'plus') {
  console.log(`result: ${add(x, y)}`);
}
if (process.argv[3] === 'minus') {
  console.log(`result: ${subtract(x, y)}`);
}
if (process.argv[3] === 'times') {
  console.log(`result: ${multiply(x, y)}`);
}
if (process.argv[3] === 'over') {
  console.log(`result: ${divide(x, y)}`);
}
