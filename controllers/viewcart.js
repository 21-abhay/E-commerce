
const con = require('../config/mysqlDB');

const viewcart = (req,res)=>{
    let cmd = `SELECT * from users WHERE user_id = '${req.session.user}'`;
    let profile;
    con.query(cmd,(err,user)=>{
        if(err){
            res.status(500).send("<h1>Internal Sever Error..</h1>")
        }
        profile = user[0];
    });


    cmd = `SELECT book.* FROM cart INNER JOIN book ON cart.book_id = book.book_id WHERE cart.user_id = '${req.session.user}'`;
    con.query(cmd,(error,books)=>{
        if(error){
            res.status(500).send("<h1>Internal Sever Error..</h1>")
        }
        for (let i = 0; i < books.length; i++) {
            let name = 'product-' + books[i].book_id + '.jpeg';
            books[i].image = name;
        }
        let key;
        books.length ? key='Product in Your Cart' : key='Nothing'
        let data = { title: 'Cart',key:key, products: books, profile: profile };
        req.session.prevURL = req.originalUrl;
        res.status(200).render('viewcart',data);
    })


}



module.exports = viewcart;