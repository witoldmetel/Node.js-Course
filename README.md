# Node basics

## Global Object

Get absolute path of current folder that this file is in

```
console.log(__dirname);
```

Get absolute path of the folder with the file name added

```
console.log(__filename);
```

## Modules and Require

Require another file automatically node looks for that file and run it

```
const xyz = require('../path')
```

Export something manually from the file

```
module.exports = 'hello'
```

Export multiple things

```
module.exports = {
  name: 'Test",
  someObject: { ... }
}
```

Build-in method in Node

Get information about the current operating system in which the file is being executed

```
const os = require('os')

console.log(os.platform(), os.homedir())
```

## File system

Import file system core module

```
const fs = require('fs')
```

All methods below are asynchronous

Reading files

```
fs.readFile('relative/path/to/file', (err, data) => {
 if (err) {
   console.log(err)
 }

 console.log(data) // This return a buffer. Buffer is package of data that's been send to us when we read this file now
})
```

Writing files

```
fs.writeFile('relative/path/to/file', 'text-we-want-to-write', () => {
  console.log('file was written)
})
```

if file doesn't exist, write method will create a file with current text, if file exists, method overwrite current file content

Directories

```
if (!fs.existsSync('relative/path/to/folder')) {
  fs.mkdir('relative/path/to/folder', (err) => {
    if (err) {
      console.log(err)
    }

    console.log('folder created')
  })
} else {
  fs.rmdir('relative/path/to/folder', (err) => {
    if (err) {
      console.log(err)
    }

    console.log('folder deleted')
  })
}

```

if folder is already exists, method return error

Deleting files

```
if (fs.existsSync('relative/path/to/file')) {
  fs.unlink('relative/path/to/file', () => {
    if (err) {
      console.log(err)
    }

    console.log('File deleted')
  })
}
```

## Streams and Buffers

![Streams](Images\streams.png)

Read stream

```
const fs = require('fs')

const readStream = fs.createReadStream('relative/path/to/stream', { encoding: 'utf8' });

readStream.on('data', (chunk) => {
  console.log('new chunk')
  console.log(chunk)
})
```

on is event listener (data listener)

Write stream

```
const fs = require('fs')

const readStream = fs.createReadStream('relative/path/to/stream', { encoding: 'utf8' });
const writeStream = fs.createWritetream('relative/path/to/stream');

readStream.on('data', (chunk) => {
  console.log('new chunk')
  console.log(chunk)

  writeStream.write('\nNEW CHUNK\n');
  writeStream.write(chunk)
})
```

Pipe (Shorter version to write stream)

```
const fs = require('fs')

const readStream = fs.createReadStream('relative/path/to/stream', { encoding: 'utf8' });
const writeStream = fs.createWritetream('relative/path/to/stream');

readStream.pipe(writeStream)
```
