const mariadb = require("mariadb")
require("dotenv").config()

const pool = mariadb.createPool({
	
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME

})

var send = async function(query) {

	try {

		const rows = await pool.query(query)
		return rows

	} catch (err) {
		
		console.log(`Error connecting to ${process.env.DB_NAME}`)
		console.log(err)

	}

}

module.exports.send = send
