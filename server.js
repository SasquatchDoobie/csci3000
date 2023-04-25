//
//		This website is vulnerable to SQL Injections
//
//		This is a feature, not a bug. Have fun!
//

require('dotenv').config()

const express = require('express')
const app = express()

const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const passportInit = require('./passport.js')
const path = require('path')

passportInit(
	passport, 
	username =>	users.find( user => user.username === username ),
	id => users.find( user => user.id === id )
)

const db = require('./db')

app.use(flash())
app.use(session({
	secret: process.env.SECRET_SESSION_TOKEN,
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

//Enable EJS support for dymanic content
app.set('view-engine', 'ejs')

//Enable form params in req object
app.use(express.urlencoded({ extended: false }))

//Enable Content-Type: application/json parsing
app.use(express.json())

//Enable static content
app.use(express.static(path.join(__dirname, 'public')))


//=====================
// INDEX/MAIN PAGE
//=====================

app.get('/', checkAuthentication, getData, (req, res) => {

	res.render('index.ejs', {

		name: req.user.firstname,
		content: res.data

	})

})

//=====================
// test page
//=====================

app.get('/test', (req, res) => {

	res.sendFile(__dirname + '/views/rough_draft.ejs.html')

})


//=====================
// LOGIN
//=====================

app.get('/login', (req, res) => {

	updateUsers()

	res.render('login.ejs')

})

app.post('/login', passport.authenticate('local', {

	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true

}))

//=====================
// REGISTRATION
//=====================

app.get('/registration', (req, res) => {

	res.render('login.ejs')

})

app.post('/registration', async (req, res) => {

	let h;

	try { 
		
		//Hashes password from post request
		const password_hashed = await bcrypt.hash(req.body.password, 12)

		//Stores user info in the database
		h = await db.send(`INSERT INTO Users VALUES ('${Date.now().toString()}', '${req.body.firstname}', '${req.body.lastname}', '${req.body.username}', '${password_hashed}')`)

		//makes the login system work.
		await updateUsers()

		//fun fact, goes off if a user already exists. liar.
		console.log("> A new user has been registered")

		res.redirect('/login')

	} catch {

		//something has gone wrong. cry.
		res.redirect('/registration')

	}})

//MOVE TO DATABSE :P
const content = [

	{ username: 'test', title: 'Post 1'},
	{ username: 'bobduncan01', title: 'bobduncan01\'s content'}

]

let users = []

//===============================
// Route authentication callback
//===============================
//
//	This function checks to see if the user is logged in before accessing a route
//	If not, it routes them back to the login page
//
//	Add this function to a route to secure it
//

async function checkAuthentication(req, res, next) {

	if(req.isAuthenticated()) return next()

	res.redirect('/login')

}


// Function to perform a query. Could make this a generic function but meh.

async function getData(req, res, next) {

	let data

	try {

		data = await db.send(`select * from Users`)

	} catch (err) { return res.status(500) }

	res.data = data

	next()

}

//I don't know crap about using passport with a db. This is how I got it working, deadlines people! Deadlines!!!
async function updateUsers() {
	users = await db.send('SELECT * FROM Users')
	return true;
}

app.listen(3000)
