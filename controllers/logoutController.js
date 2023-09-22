

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
    const prevURL = req.session.prevURL;
    req.session.destroy();
    // req.session.prevURL = prevURL;
    // console.log("About : ",prevURL);
    res.redirect(prevURL);
};

module.exports = logout;