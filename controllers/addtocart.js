
const con = require('../config/mysqlDB');

const addtocartController = (req,res)=>{
    const book_id = req.params.book_id;
    const user_id = req.session.user;

    let cmd = `SELECT * FROM cart WHERE user_id='${user_id}' AND book_id='${book_id}'`;
    con.query(cmd,(error,results)=>{
        if(error){
            res.status(500).send("<h1>Server Error</h1>");
        }
        if(results.length){
            res.status(200).redirect(req.session.prevURL);
            return;
        }
        cmd = `INSERT INTO cart(book_id, user_id) VALUES ('${book_id}','${user_id}')`;
        con.query(cmd,(err,result)=>{
            if(err){
                res.status(500).send("<h1>Server Error</h1>");
            }
            res.status(200).redirect(req.session.prevURL)
        })
    })

    
}



module.exports = addtocartController;