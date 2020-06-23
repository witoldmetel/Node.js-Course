# Node introduction

![Screen](/Images/screen1.png)
![Screen](/Images/screen2.png)
![Screen](/Images/screen3.png)
![Screen](/Images/screen4.png)
![Screen](/Images/screen5.png)

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

![Screen](/Images/screen6.png)

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

# Clients & Servers

![Screen](/Images/screen7.png)

Create local server on Node.js

```
const http = require('http');

const server = http.createServer((req, res) => {
  console.log('request made')
});

server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000')
})
```

![Screen](/Images/screen8.png)

Port number is like 'doors' into a computer

# Requests & Responses

```
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set header content type
  res.setHeader('Content-Type', 'text/html);

  res.write('<p>hello world</p>');
  res.end();
});

server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000')
})
```

Return HTML file

```
const http = require('http');
const fs = require('fs);

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html);

  // send an html file
  fs.readFile('path-to-html-file', (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // use `res.write(data);` when you need send multiple things
      res.end(data);
    }
  })
});

server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000')
})
```

Basic Routing

```
const http = require('http');
const fs = require('fs);

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html);

  // Routing
  let path = 'path-to-html-files';

  switch(req.url) {
    case '/':
      path += 'index.html';
      break;
    case '/about':
      path += 'about.html';
      break;
    default:
      path += '404.html';
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  })
});

server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000')
})
```

Status Codes

![Screen](/Images/screen9.png)
![Screen](/Images/screen10.png)

```
const http = require('http');
const fs = require('fs);

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html);

  let path = 'path-to-html-files';

  switch(req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  })
});

server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000')
})
```

Redirects

```
const http = require('http');
const fs = require('fs);

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html);

  let path = 'path-to-html-files';

  switch(req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    // Redirect
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', './about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  })
});

server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000')
})
```

All these examples are in `vanilla_js_approach` folder
