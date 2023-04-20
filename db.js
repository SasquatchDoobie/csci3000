const db = require("mysql")
require("dotenv").config()

const dbConn = db.createConnection({
	
	host : process.env.DB_HOST,
	user : process.env.DB_USER,
	password : process.env.DB_PASSWORD,
	database : process.env.DB_NAME

})

dbConn.connect(function(e){

	if(!e){
		console.log(`Connected to database: ${process.env.DB_NAME}`)
	} else {
		console.log(`Error connecting to database: ${process.env.DB_NAME}`) 
	}

})

module.exports = {dbConn}
