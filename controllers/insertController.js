const con = require('../config/mysqlDB');


const insertItem = (req, res) => {
    if (req.file) {
        // res.send('File uploaded successfully!');
    } else {
        res.send('Error in uploading File.....');
        return;
    }
    let info = req.body;
    // let cmd = `INSERT INTO books(Id,Name, Category, Author, Price, Upload_by, Quantity) VALUES('${id}','${info.Name}', '${info.Category}', '${info.Author}', '${info.Price}', '${req.session.user}', ${info.Quantity})`
    let upload_date = new Date();
    let cmd = `INSERT INTO book(book_id, book_name, category, author,publisher, price, uploaded_by, quantity,upload_date) VALUES('${id}', '${info.Name}', '${info.Category}', '${info.Author}','${info.Publisher}' ,${info.Price}, '${req.session.user}', ${info.Quantity}, '${upload_date}')`;

    con.query(cmd, (err, result) => {
        if (err) throw err;
        // console.log("Item Inserted...")
        res.redirect(`/profile/${req.session.user}`);
    })

};


module.exports = insertItem;
