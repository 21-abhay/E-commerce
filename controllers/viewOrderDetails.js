

const con = require('../config/mysqlDB');


const viewOrderDetails = (req,res)=>{
    let orderId = req.params.orderId;
    let cmd = `SELECT *,o.item_id FROM order_details o LEFT JOIN book b ON o.item_id=b.book_id WHERE o.order_id='${orderId}'`;
    con.query(cmd, (err,result)=>{
        if(err){
            res.send("Reload Page....")
            throw err;
            return;
        }
        res.status(200).json(result[0]);
    })
}

module.exports = viewOrderDetails;