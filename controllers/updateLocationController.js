

const con = require('../config/mysqlDB');


const updateLocationGet = (req, res) => {
    let cmd = `SELECT * FROM users u LEFT JOIN user_location ul ON u.user_id=ul.user_id WHERE u.user_id = '${req.session.user}'`;
    con.query(cmd,(err,result)=>{
        if(err){
            res.status(400).send(err);
            return;
        }
        let data = {title:'Update-Details',profile:result[0]};
        res.status(200).render('update_location', data);
    })
}
const updateLocationPost = (req, res) => {
    
}

module.exports={updateLocationGet, updateLocationPost}