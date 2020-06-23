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
