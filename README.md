# CSCI 3000 Web Programming Project

## STARTING THE DATABASE

Navigate in a terminal to the `./database` folder. You'll see these two files:
```
docker-compose.yml
init.sql
```

Run `docker-compose up -d` to launch the MariaDB server. Docker-compose will download and run the MariaDB version specified in `docker-compose.yml`.

Connect to the database with the following information:

Host: localhost (or 127.0.0.1) | Port: 3306 | Username: root | Password: root

Once connected, run the statements in `init.sql`. This will automatically create a populated database inside MariaDB.



## STOPPING THE DATABASE

Navigate in a terminal to the `./database` folder. Run `docker-compose down` to stop the server.

To delete the database, connect to MariaDB and run the statements in `init.sql`.

To remove the database server, search how to clear Docker volumes/images from your system



## STARTING THE SERVER

Navigate in a terminal to the main directory (same directory as package.json) and run `npm start`. This will launch the main server and the authentication server for you. 



## STOPPING THE SERVER

From the terminal where you started the server, hit `Ctrl+C`.
