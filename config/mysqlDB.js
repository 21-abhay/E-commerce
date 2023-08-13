
const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    port: process.env.database_port,
    password: process.env.database_password,
    database: process.env.database_database
});
con.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    else {
        console.log('Connected to the database!');
    }
});


module.exports = con;