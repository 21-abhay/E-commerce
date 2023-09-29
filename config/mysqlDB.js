
const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    port: process.env.database_port,
    password: process.env.database_password,
    // database: process.env.database_database
});
con.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    // Execute the query to create the new database
    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.database_database}`;
    con.query(createDatabaseQuery, (err, result) => {
      if (err) {
        console.error('Error creating database:', err);
      } else {
        console.log('Database created successfully');
        con.changeUser({ database: `${process.env.database_database}` }, (err) => {
          if (err) {
            console.error('Error switching to the new database:', err);
            return con.end();
          }
          createTables();
        })
        
      }
    });
});

const createTables = ()=>{
    const book = `CREATE TABLE IF NOT EXISTS book (
        book_id varchar(40) NOT NULL PRIMARY KEY,
        book_name varchar(40) NOT NULL,
        category varchar(40) NOT NULL,
        author varchar(40) DEFAULT NULL,
        publisher varchar(40) DEFAULT NULL,
        uploaded_by varchar(40) NOT NULL,
        price double DEFAULT NULL,
        views int(10) DEFAULT NULL,
        sells int(10) DEFAULT NULL,
        quantity int(10) DEFAULT NULL,
        upload_date varchar(70) DEFAULT NULL,
        permission varchar(10) NOT NULL,
        FOREIGN KEY (uploaded_by) REFERENCES users(user_id)
      )`;
    
      const cart = `CREATE TABLE IF NOT EXISTS cart (
        book_id varchar(40) NOT NULL,
        user_id varchar(40) NOT NULL,
        FOREIGN KEY (book_id) REFERENCES book(book_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      )`;

      const login_details = `CREATE TABLE IF NOT EXISTS login_details (
        user_id varchar(40) NOT NULL,
        name varchar(20) NOT NULL,
        email varchar(30) NOT NULL,
        mobile bigint(12) NOT NULL,
        password varchar(30) NOT NULL,
        hash_password varchar(150) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      )`;

      const login_history = `CREATE TABLE IF NOT EXISTS login_history (
        id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id varchar(40) NOT NULL,
        login_time varchar(80) NOT NULL,
        logout_time varchar(80) NOT NULL,
        plateform varchar(100) NOT NULL,
        ipaddress varchar(32) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      )`;

      const order_details = `CREATE TABLE IF NOT EXISTS order_details (
        order_id varchar(40) NOT NULL PRIMARY KEY,
        user_id varchar(40) NOT NULL,
        item_id varchar(40) NOT NULL,
        quantity int(4) NOT NULL,
        order_date varchar(80) NOT NULL,
        deliver_date varchar(80) NOT NULL,
        status varchar(30) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (item_id) REFERENCES book(book_id)
      )`;

      const review = `CREATE TABLE IF NOT EXISTS review (
        review_id int(11) NOT NULL PRIMARY KEY,
        user_id varchar(40) DEFAULT NULL,
        book_id varchar(40) DEFAULT NULL,
        review varchar(500) DEFAULT NULL,
        rating double DEFAULT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (book_id) REFERENCES book(book_id)
      )`;

      const users = `CREATE TABLE IF NOT EXISTS users (
        user_id varchar(40) NOT NULL PRIMARY KEY,
        first_name varchar(20) NOT NULL,
        last_name varchar(20) NOT NULL,
        dob date NOT NULL,
        email varchar(30) NOT NULL,
        mobile bigint(12) NOT NULL,
        role varchar(20) NOT NULL,
        joining_date varchar(100) NOT NULL
      )`;

      const user_location = `CREATE TABLE IF NOT EXISTS user_location (
        user_id varchar(40) NOT NULL PRIMARY KEY,
        country varchar(20) DEFAULT NULL,
        state varchar(30) DEFAULT NULL,
        district varchar(30) DEFAULT NULL,
        town varchar(40) DEFAULT NULL,
        street varchar(30) DEFAULT NULL,
        house_no varchar(20) DEFAULT NULL,
        pin_no int(10) DEFAULT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      )`;

      con.query(users,(err,result)=>{
        if(err){
            console.log("Error in Creating Table users...");
            return
        }
        console.log("users Table created Successfully..");
      })
      con.query(book,(err,result)=>{
        if(err){
            console.log("Error in Creating Table book...");
            return
        }
        console.log("book Table created Successfully..");
      })
      con.query(login_details,(err,result)=>{
        if(err){
            console.log("Error in Creating Table login_details...");
            console.log(err);
            return
        }
        console.log("login_details Table created Successfully..");
      })
      con.query(login_history,(err,result)=>{
        if(err){
            console.log("Error in Creating Table login_history...");
            return
        }
        console.log("login_history Table created Successfully..");
      })
      con.query(user_location,(err,result)=>{
        if(err){
            console.log("Error in Creating Table user_location...");
            return
        }
        console.log("user_location Table created Successfully..");
      })
      con.query(order_details,(err,result)=>{
        if(err){
            console.log("Error in Creating Table order_details...");
            return
        }
        console.log("order_details Table created Successfully..");
      })
      con.query(review,(err,result)=>{
        if(err){
            console.log("Error in Creating Table review...");
            return
        }
        console.log("review Table created Successfully..");
      })
      con.query(cart,(err,result)=>{
        if(err){
            console.log("Error in Creating Table cart...");
            return
        }
        console.log("cart Table created Successfully..");
      })
}


module.exports = con;