

const con = require('../config/mysqlDB');



const logout = (req, res) => {
    user = null;
    let logout = new Date();
    let cmd= `UPDATE login_history SET logout_time='${logout}' WHERE user_id='${req.session.user.id}'`; 
    con.query(cmd, (err, result)=>{
        if(err){
            res.send(err);
            throw err;
            return;
        }
    })
    req.session.destroy();
    res.redirect('/');
};

module.exports = logout;