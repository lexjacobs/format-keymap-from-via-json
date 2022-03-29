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
    // divide the layer array in half for left/right halves so right can be reversed
    let [left, right] = R.splitAt(R.divide(R.length(layer), 2), layer)
    // for left, bucket into groups of 6 for each keyboard row on that half
    left = R.splitEvery(6, left);
    // for right, same, but also reverse each bucket of keys
    right = R.map(R.reverse, R.splitEvery(6, right));
    // then a full row of keys is a zipping of left and right
    let row = R.map(R.flatten, R.zip(left, right));
    // split in half and add some space
    // console.log(row)
    return row.join('\n//|--------+--------+--------+--------+--------+--------|--------+--------+--------+--------+--------+--------|\n');
    // then add delimiters
    // join with newlines
    // and return
    // for gergoplex keymap conversion, remove the first and last keys
  })(layers)
  console.log(rows.join('\n\n\n'));
}


Promise.resolve(keymapJson)
  // .then(json => JSON.parse(json)) // only when reading from disk
  .then(keymap => keymap.layers)
  .then(layers => makeRows(layers))
  // .then(result => writeKeymaps(result.toString()));

