require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

//Enable application/json parsing
app.use(express.json())


const content = [

	{ username: 'test', title: 'Post 1'},
	{ username: 'test2', title: 'Post 2'}

]

//Serve an image to the user
app.get('/content', authToken, (req, res) => {

	console.log(req.user.name + " is requesting content")
	res.json(content.filter(usercontent => usercontent.username === req.user.name))

})

//Authenticates tokens
function authToken(req, res, next) {

	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	
	console.log(token)

	//Check if token does not exist
	if(token == null) {
		console.log("No token")
		return res.sendStatus(401)
	}
	
	//Verify token is genuine
	jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
		
		if (err) {
			console.log("Token is invalid")
			return res.sendStatus(403)
		}

		req.user = user
		next()
	
	})

}

app.listen(3000)
