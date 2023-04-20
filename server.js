require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())


const content = [

	{ username: 'test', title: 'Post 1'},
	{ username: 'test2', title: 'Post 2'}

]

//Serve an image to the user
app.get('/content', (req, res) => {
		res.json(content)
})


//Log the user in
app.post('/login', (req, res) => {

	const username = req.body.username
	const user = { name: username }


	const accessToken = jwt.sign(user, process.env.SECRET_TOKEN)
	res.json({ accessToken: accessToken })

})

app.listen(3000)
