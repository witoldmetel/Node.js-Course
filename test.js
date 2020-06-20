// Global object

// console.log(global);

// Get absolute path of current folder that this file is in
console.log(__dirname);
// Get absolute path of the folder with the file name added
console.log(__filename);

const os = require('os');

console.log(os.platform(), os.homedir());
