# Node.js Course

## Table of contents

- [Node introduction](#node-introduction)
- [Node Basics](#node-basics)
- [Streams and Buffers](#streams-and-buffers)
- [Clients and Servers](#clients-and-servers)
- [Requests and Responses](#requests-and-responses)
- [Express](#express)
- [View Engines](#view-engines)
- [Middleware](#middleware)
- [Connect with MongoDB](#connect-with-mongoDB)
- [Get, Post and Delete Requests](#get-post-and-delete-requests)

## Node introduction

![Screen](/Images/screen1.png)
![Screen](/Images/screen2.png)
![Screen](/Images/screen3.png)
![Screen](/Images/screen4.png)
![Screen](/Images/screen5.png)

## Node Basics

Global Object

Get absolute path of current folder that this file is in

```
console.log(__dirname);
```

Get absolute path of the folder with the file name added

```
console.log(__filename);
```

Modules and Require

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

File system

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

## Clients and Servers

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

## Requests and Responses

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

## Express

```
const express = require('express');

// Express app
const app = express();

// Listen for requests
app.listen(3000);

app.get('/', (req, res) => {
	// Send HTML File
	res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
	// Send direct html template
	res.send('<p>About Page</p>');
});

// Redirect
app.get('/about-us', (req, res) => {
	res.redirect('/about');
});

// 404 Page
// use working similar to `catch`
app.use((req, res) => {
	res.status(404).sendFile('./views/404.html', { root: __dirname });
});
```

## View Engines

View engines allow to us, write HTML templates but also allow us to inject dynamic data and logic into them like variables, loops and then we can serve the resulting HTML page with that data to the browser

```
const express = require('express');

// Express app
const app = express();

// Register view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // Take index.ejs automatically from folder views
	res.render('index');
});
```

Passing data into views

```
// Dynamic code
<% const name = 'test' %>

// Output data
<%= name %>
```

You can put any data directly to template

```
app.get('/', (req, res) => {
	res.render('index', { title: 'Home' });
});

Inside the `index.ejs` file you can refference to this variable as: <$= title>
```

![Screen](/Images/screen11.png)

Partials are parts of template which can be re-use.

## Middleware

Code which runs (on the server) between getting a request and sending a response

![Screen](/Images/screen12.png)
![Screen](/Images/screen13.png)

Middleware example

```
app.use((req, res, next) => {
	console.log(req.hostname);
	console.log(req.path);
	console.log(req.method);
	next(); // allow go to next middleware, without this - page don't know what should be next step
});
```

3rd party middleware

```
app.use(morgan('dev'));
```

Static Files

```
// all files inside public folder will be available on browser i.e. css styles
app.use(express.static('public'));
```

## Connect with MongoDB

SQL vs NoSQL or MySQL vs MongoDB
https://academind.com/learn/web-dev/sql-vs-nosql/

MongoDB - Complete Introduction & Summary
https://www.youtube.com/watch?v=VELru-FCWDM

https://robomongo.org/

![Screen](/Images/screen14.png)
![Screen](/Images/screen15.png)
![Screen](/Images/screen16.png)
![Screen](/Images/screen17.png)

```
// connect to MongoDB
const dbURI =
	'mongodb+srv://<user>:<password>@cluster0-pt2ri.mongodb.net/<database_name>?retryWrites=true&w=majority';

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log('connected to db');
	})
	.catch((err) => console.log(err));

```

Prepare model and schema using Mongoose

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		snippet: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
```

Save example data to database

```
app.get('/add-blog', (req, res) => {
	const blog = new Blog({
		title: 'new Blog',
		snippet: 'about my new blog',
		body: 'more about',
	});

	blog
		.save()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => console.log(err));
});
```

Get data from database

```
app.get('/all-blogs', (req, res) => {
	Blog.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => console.log(err));
});
```

## Get, Post and Delete Requests

![Screen](/Images/screen18.png)

Post request

```
// takes urlencoded data and pass it as the object
app.use(express.urlencoded({ extended: true }));

app.post('/blogs', (req, res) => {
	const blog = new Blog(req.body);

	blog
		.save()
		.then((result) => {
			res.redirect('/blogs');
		})
		.catch((err) => console.log(err));
});
```

Route Parameters

![Screen](/Images/screen19.png)

Get request

```
app.get('/blogs/:id', (req, res) => {
	const id = req.param.id;

	Blog.findById(id)
		.then((result) => {
			render('details', { blog: result, title: 'Blog Details' });
		})
		.catch((err) => console.log(err));
});
```

Delete request

```
app.delete('/blogs/:id', (req, res) => {
	const id = req.params.id;

	Blog.findByIdAndDelete(id)
		.then((result) => {
			res.json({ redirect: '/blogs' });
		})
		.catch((err) => console.log(err));
});

// On the front-end side
<script>
  const trashcan = document.querySelector('a.delete');
  trashcan.addEventListener('click', (e) => {
    const endpoint = `/blogs/${trashcan.dataset.doc}`;

    fetch(endpoint, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => (window.location.href = data.redirect))
      .catch((err) => console.log(err));
  });
</script>
```

More details here:
https://youtu.be/VVGgacjzc2Y?t=1212
