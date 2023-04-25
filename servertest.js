require('dotenv').config()

const express = require('express')
const app = express()

const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const passportInit = require('./passport.js')

passportInit(
	passport, 
	username =>	{async user => {const r = await db.send('SELECT * FROM Users'); r.username === username}},
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

app.get('/', checkAuthentication, getData, (req, res) => {

	console.log("plz work " + res.data)

	res.render('index.ejs', {

		name: req.user.firstname,
		content: res.data

	})

})

app.get('/login', (req, res) => {

	res.render('login.ejs')

})

app.post('/login', passport.authenticate('local', {

	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true

}))

app.get('/registration', (req, res) => {

	res.render('register.ejs')

})

app.post('/registration', async (req, res) => {

	try { 

		const password_hashed = await bcrypt.hash(req.body.password, 12)

		const response = await db.send(`INSERT INTO Users VALUES ('${Date.now().toString()}', '${req.body.firstname}', '${req.body.lastname}', '${req.body.username}', '${password_hashed}');`)

		console.log("A new user has been registered:")
		console.log(response)

		res.redirect('/login')

	} catch {

		res.redirect('/registration')

	}})

//MOVE TO DATABSE :P
const content = [

	{ username: 'test', title: 'Post 1'},
	{ username: 'bobduncan01', title: 'bobduncan01\'s content'}

]

function checkAuthentication(req, res, next) {

	if(req.isAuthenticated()) return next()

	res.redirect('/login')

}

async function getData(req, res, next) {

	let data

	try {

		data = await db.send(`select * from Users`)

	} catch (err) { return res.status(500) }

	res.data = data

	console.log(res.data)

	next()

}

app.listen(3000)
