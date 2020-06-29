const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to MongoDB
const dbURI =
	'mongodb+srv://<login>:<password>@freecluster-gfbko.mongodb.net/Ninja-Crash-Course?retryWrites=true&w=majority';

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => app.listen(3000))
	.catch((err) => console.log(err));

app.use(morgan('dev'));

// static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// register view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.redirect('/blogs');
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
	res.status(404).render('404', { title: '404' });
});
