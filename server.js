const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res, next) => {

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log',log + '\n', (err) => {
		if(err){
			console.log("Unable to append to data in log file");
		}
	});
	console.log(log);
	next();
});

// app.use((req,res,next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => {
	// res.send("<body> <input type='text' name='firstname' value=''/> </body>");
	res.render('home.hbs',{
		welcomeMessage:'Welcome to our Website. Thans for Visiting'
	});
});

hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});



app.get('/about',(req,res) => {
	res.render('about.hbs',{
		pageTitle:'About Us page'
	});
});

app.get('/portfolio',(req,res) => {
	res.render('portfolio.hbs',{
		pageTitle:'Portfolio page'
	});
});

app.get('/bad',(req, res) => {
	res.send({
		errorMessage:"Unable to connect"
	});
});

app.listen(port,() => {
	console.log(`server is up on port ${port}`);
});