const { write } = require('fs');
const fs = require('fs/promises');
const R = require('ramda');
const keymapJson = require('./via.json');


// const getFileContents = (path) => {
//   return fs.readFile(__dirname + path, { encoding: 'utf8' })
// }

const writeKeymaps = (data) => {
  fs.writeFile(__dirname + '/6x4keymap.c', data);
}

const makeRows = layers => {
  let rows = R.map(layer => {
    let [left, right] = R.splitAt(R.divide(R.length(layer), 2), layer)
    // for left, bucket into groups of 6
    left = R.splitEvery(6, left);
    // for right, same, but also reverse each bucket
    right = R.map(R.reverse, R.splitEvery(6, right));
    let row = R.map(R.flatten, R.zip(left, right));
    // then a row is a zipping of left and right
    console.log({row})
    return row;
    // then add delimiters
    // join with newlines
    // and return
    // for gergoplex keymap conversion, remove the first and last keys
  })(layers)
  console.log({rows});
}


Promise.resolve(keymapJson)
  // .then(json => JSON.parse(json)) // only when reading from disk
  .then(keymap => keymap.layers)
  .then(layers => makeRows(layers))
  // .then(result => writeKeymaps(result.toString()));

