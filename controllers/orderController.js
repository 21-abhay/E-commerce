// const { uuid } = require('uuidv4');
const uuid = require('uuid');
const con = require('../config/mysqlDB');



const orderItem = (req, res) => {
    const itemid = req.params.itemid;
    // res.send("<h2>Order Place Successfully...</h2>");
    let cmd = `SELECT * FROM book WHERE book_id='${itemid}'`;
    con.query(cmd, (err, result) => {
        if(err){
            res.send(err);
            return;
        }
        let data = {quantity:'one', item: result[0], items:result }
        req.session.prevURL = req.originalUrl;
        res.status(200).render('order', data);
    });
};

const orderItemPost = (req, res) => {
    const itemid = req.params.itemid;
    let cmd = `INSERT INTO order_details(order_id, user_id, item_id, quantity, order_date, status) VALUES('${uuid.v4().toString()}', '${req.session.user}', '${itemid}', ${req.body.quantity}, '${new Date()}', 'Confirm')`;
    con.query(cmd, (err, result) => {
        req.session.prevURL = req.originalUrl;
        if(err){
            res.status(400).send("Order Failed....");
            return;
        }
        // res.redirect('/');
        res.send("<div><h2>Order Place Successfully...</h2><a href='/'><button>Back To Home</button></a></div>");
    });
};

const orderAllitemsGet = (req,res)=>{
    const user_id = req.session.user;
    let cmd = `SELECT book_id from cart WHERE user_id='${user_id}'`;
    con.query(cmd,(err,books)=>{
        if(err){
            res.status(500).send('<h1>Internal Server Error</h1>');
        }
        if(books.length){
            for (let i = 0; i < books.length; i++) {
                books[i]= books[i].book_id
            }
            cmd = `SELECT * FROM book WHERE book_id IN (?)`
            con.query(cmd,[books], (err,results)=>{
                if(err){
                    res.status(500).send('<h1>Internal Server Error</h1>');
                }
                let a='';
                results.length>1 ? a='multiple' : a='one';
                let data = {quantity:a, item: results[0], items:results }
                req.session.prevURL = req.originalUrl;
                res.status(200).render('order', data);

            });
        }
        else{
            res.status(200).send('<h1>Please add Books to cart or select any book to buy</h1>')
        }
    });
}



const orderAllitemsPost = (req,res)=>{
    const user = req.session.user;
    const {book_id,book_quantity} = req.body;
    let cmd = `INSERT INTO order_details(order_id, user_id, item_id, quantity, order_date, status) VALUES`;
    for (let i = 0; i < book_id.length; i++) {
        if(i==0){
            cmd += `('${uuid.v4().toString()}', '${user}', '${book_id[i]}', ${book_quantity[i]}, '${new Date()}', 'Confirm')`;
        }
        else{
            cmd += `,('${uuid.v4().toString()}', '${user}', '${book_id[i]}', ${book_quantity[i]}, '${new Date()}', 'Confirm')`;
        }
    }

    con.query(cmd,(err,result)=>{
        if(err){
            res.status(500).send('<h1>Internal Server Error</h1>');
        }
        cmd= `DELETE FROM cart WHERE user_id='${user}'`;
        con.query(cmd,(error,results)=>{
            if(err){
                res.status(500).send('<h1>Internal Server Error</h1>');
            }
            res.status(200).send("<div><h2>Order Place Successfully...</h2><a href='/'><button>Back To Home</button></a></div>");
        })
        
    })
}

module.exports = {orderItem,orderItemPost,orderAllitemsGet,orderAllitemsPost};