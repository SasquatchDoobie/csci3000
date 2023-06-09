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
const methodOverride = require('method-override')
const path = require('path')
const {upload} = require('./multer.js')
const fs = require('fs')

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

//Enable overriding methods
app.use(methodOverride('_m'))


// WHY IS IT BORKEN
app.get('/broken', (req, res) => {
	res.render('whyisitbroken.ejs', { user: req.user })
})


//=====================
// HOME PAGE (DEFAULT)
//=====================

app.get('/', (req, res) => {
	res.render('home_page.ejs', { user: req.user })
})

//=====================
// OLD INDEX/MAIN PAGE
//=====================

app.get('/debug', checkAuthentication, getUserData, getAllUserData, getGalleryData, (req, res) => {

	res.render('debug.ejs', {

		gallery_data: res.gallery_data,
		user_data: res.user_data,
		all_user_data: res.all_user_data,
		user: req.user

	})
})

//=====================
// account page
//=====================

app.get('/account', checkAuthentication, getUserData, (req, res) => {

	res.render('account_page.ejs', {

		user: req.user,
		user_data: res.user_data

	})

})

//=====================
// gallery page
//=====================

app.get('/gallery', checkAuthentication, getGalleryData, (req, res) => {

	const uploadStatus = req.app.locals.uploadStatus
	req.app.locals.uploadStatus = null

	const fileTypeError = req.fileValidatorError
	req.fileValidatorError = null

	const albumNameExists = req.app.albumNameExists
	req.app.albumNameExists = null

	res.render('gallery.ejs', {
		name: req.user.fname,
		gallery_data: res.gallery_data,
		uploadStatus : uploadStatus,
		fileTypeError : fileTypeError,
		albumNameExists : albumNameExists
	})

})

//======================================================
// Uploads images and saves them to the specified album
//======================================================

app.post('/upload', checkAuthentication, getGalleryData, (req, res) => {

	let gallery_data = res.gallery_data
	let userid = req.user.id

	upload(req, res, async (err) => {	
		
		if(err) {
			console.log('> Image upload has failed')
			res.redirect('/gallery')
		}
		
		let upload_album
		let new_images = []
		let old_images = []

		if(req.body.album) {
			upload_album = req.body.album
		}

		req.files.forEach( async (file) => {
			new_images.push(file.filename)
			await db.send(`INSERT INTO Images VALUES ('${file.filename}','${userid}')`)
		})

		gallery_data.forEach( (album) => {

			if(album.albumname === upload_album) {
				old_images = album.albumcontent.images
				return
			}

		})

		new_images = new_images.concat(old_images)

		query_images = '["' + new_images.join('","') + '"]'

		await db.send(`UPDATE Album SET albumcontent='{"images":${query_images}}' WHERE albumname='${upload_album}'`)

		req.app.locals.uploadStatus = true

		res.redirect('/gallery')
	})
})

//=========================================
// This allows the user to create an album
//=========================================

app.post('/createalbum', checkAuthentication, getGalleryData, async (req, res) => {

	try {
		
		//If this query returns any result, we know that the album name the user requested already exists in the DB. This yeets them back to the gallery page with an error message
		let checkalbumname = await db.send(`SELECT 1 FROM Album WHERE albumname='${req.body.albumname}' LIMIT 1`)

		if (checkalbumname && checkalbumname.length) {
			
			req.app.albumNameExists = true
			res.redirect('/gallery')
		
		} else {
		
			await db.send(`INSERT INTO Album VALUES ('${Date.now() + "_" + req.user.id}', '${req.body.albumname}', '{"images":[]}', '${req.user.id}')`)
			
			console.log('> New album created')

			res.redirect('/gallery')
		}

	} catch (err) {
		console.log("you should not see this message. if you do, weep.")
	}
})

//===============
// Delete images
//===============

app.put('/deleteimages', getGalleryData, async (req, res, next) => {
	
	let images_to_delete = req.body.images

	let gallery_data = res.gallery_data

	gallery_data.forEach( async (album) => {

		if(album.albumname == req.body.album) {

			let new_images = album.albumcontent.images
			let counter = 0

			req.body.images.forEach( async (image) => {
			
				if(new_images.includes(image)) {
					
					let index = new_images.indexOf(image)
					if (index > -1) {
						new_images.splice(index, 1)
					}

				}

				query_images = '["' + new_images.join('","') + '"]'

				await db.send(`UPDATE Album SET albumcontent='{"images":${query_images}}' WHERE albumname='${req.body.album}'`)

				images_to_delete.forEach( async (image) => {
					await db.send(`DELETE FROM Images WHERE imagepath='${image}'`)
					fs.rm(`./public/images/${image}`, { recursive: true, force:true }, (err) => {
						if(err) {
							console.log("Error deleting file. Good job guys") 
							return
						}
						console.log(`> Deleted: ${image}`)
					})
				})

			})
		}
	})

	res.redirect('/gallery')

})

//=====================
// LOGIN
//=====================

app.get('/login', (req, res) => {

	updateUsers()

	res.render('login.ejs')

})

app.post('/login', passport.authenticate('local', {

	successRedirect: '/gallery',
	failureRedirect: '/login',
	failureFlash: true

}))

//=====================
// LOGOUT
//=====================

app.delete('/logout', (req, res, next) => {
	req.logout( (err) => {
		if(err) { return next(err) }
		res.redirect('login')
	})
})

//=====================
// REGISTRATION
//=====================

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
		res.redirect('/login')

	}})

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


// Function to get all user data

async function getAllUserData(req, res, next) {

	let data
	try {
		data = await db.send(`select * from Users`)
	} catch (err) { return res.status(500) }
	res.all_user_data = data
	next()
}

// Function to get the user's data

async function getUserData(req, res, next) {

	let data
	try {
		data = await db.send(`select * from Users where (id='${req.user.id}')`)
	} catch (err) { return res.status(500) }
	res.user_data = data
	next()
}

// Function to get gallery data

async function getGalleryData(req, res, next) {

	let data
	try {
		data = await db.send(`SELECT * FROM Album WHERE albumowner='${req.user.id}'`)
	} catch (err) { return res.status(500) }
	res.gallery_data = data
	next()
}

//I don't know crap about using passport with a db. This is how I got it working, deadlines people! Deadlines!!!
async function updateUsers() {
	users = await db.send('SELECT * FROM Users')
	return true;
}

app.listen(process.env.SERVER_PORT)
console.log(`> Server is running on port ${process.env.SERVER_PORT}`)
