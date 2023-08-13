

const con = require('../config/mysqlDB');


const updateDetailsGet = (req, res) => {
    let cmd = `SELECT * FROM users WHERE user_id = '${req.session.user}'`;
    con.query(cmd,(err,result)=>{
        if(err){
            res.status(400).send(err);
            return;
        }
        let data = {title:'Update-Details',profile:result[0]};
        res.status(200).render('update_details', data);
    })
    
}

const updateDetailsPost = (req, res) => {
    console.log(req.body)
    let date = req.body.dob;
    console.log(date)
    res.send("complete..")
}

module.exports = {updateDetailsGet,updateDetailsPost}