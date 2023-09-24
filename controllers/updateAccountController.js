

const con = require('../config/mysqlDB');


const updateAccountGet = (req, res) => {
    let cmd = `SELECT * FROM users u LEFT JOIN login_details l ON u.user_id=l.user_id WHERE u.user_id = '${req.session.user}'`;
    con.query(cmd,(err,result)=>{
        if(err){
            res.status(400).send(err);
            return;
        }
        console.log("Update Accountt : ",result)
        let data = {title:'Update-Details',profile:result[0]};
        res.status(200).render('update_account', data);
    })
}

const updateAccountPost = (req, res) => {
    
    
}


module.exports = {updateAccountGet, updateAccountPost}