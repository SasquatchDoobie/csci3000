const mariadb = require("mariadb")
require("dotenv").config()

const pool = mariadb.createPool({
	
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME

})

module.exports.send = async function(query) {
	await sendQuery(query)
}


var sendQuery = async function(query) {
	
	let conn;
	try {

		conn = await pool.getConnection()
		return rows = await conn.query(query)

	} catch (err) {
		
		console.log(`Error connecting to ${process.env.DB_NAME}`)
		console.log(err)

	} finally { if (conn) return conn.end() }
	
}
