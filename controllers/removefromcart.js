
const con = require('../config/mysqlDB');

const removefromcartController = (req,res)=>{
    
    const book_id = req.params.book_id;
    const user_id = req.session.user;

    let cmd = `DELETE FROM cart WHERE user_id='${user_id}' AND book_id='${book_id}'`;
    con.query(cmd,(err,result)=>{
        if(err){
            res.status(500).send("<h1>Server Error</h1>");
        }
        res.status(200).redirect(req.session.prevURL)
    })
    

}


module.exports = removefromcartController;