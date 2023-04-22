require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

//Enable application/json parsing
app.use(express.json())

//Login the user
app.post('/login', (req, res) => {
	
	const username = req.body.username
	const user = { name: username }

	const accessToken = genToken(user)
	const refreshToken = jwt.sign(user, process.env.SECRET_REFRESH_TOKEN)
	res.json({ accessToken: accessToken, refreshToken: refreshToken })

})

function genToken(user) {
	return jwt.sign(user, process.env.SECRET_TOKEN, { expiresIn: '20s' })
}


app.listen(3001)
