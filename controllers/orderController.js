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
        let data = { item: result[0] }
        res.status(200).render('order', data);
    });
};

const orderItemPost = (req, res) => {
    const itemid = req.params.itemid;
    let cmd = `INSERT INTO order_details(order_id, user_id, item_id, quantity, order_date, status) VALUES('${uuid.v4().toString()}', '${req.session.user}', '${itemid}', ${req.body.quantity}, '${new Date()}', 'Confirm')`;
    con.query(cmd, (err, result) => {
        if(err){
            res.status(400).send("Order Failed....");
            return;
        }
        res.redirect('/');
    });
};

module.exports = {orderItem,orderItemPost};