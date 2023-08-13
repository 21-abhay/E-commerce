

const con = require('../config/mysqlDB');


const updateAccountGet = (req, res) => {
    let cmd = `SELECT * FROM users WHERE user_id = '${req.session.user}'`;
    con.query(cmd,(err,result)=>{
        if(err){
            res.status(400).send(err);
            return;
        }
        let data = {title:'Update-Details',profile:result};
        res.status(200).render('update_account', data);
    })
}

const updateAccountPost = (req, res) => {
    
    
}


module.exports = {updateAccountGet, updateAccountPost}