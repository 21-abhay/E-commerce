
const con = require('../config/mysqlDB');
const bcrypt = require('bcrypt');



const loginGet = (req, res) => {
    // if (req.session.user) {
    //     window.location.replace('/home');
    //     return;
    // }
    const data = { title: "Login", profile: {} }
    res.status(200).render('login', data);
};


const loginPost = (req, res) => {
    let info = req.body;
    let cmd = `SELECT users.email, users.user_id, login_details.password, login_details.hash_password FROM users,login_details WHERE users.user_id=login_details.user_id AND users.email='${info.Email}' AND users.role='${info.Role}'`;
    con.query(cmd, function (err, result) {
        if (err) throw err;

        if (result.length == 0) {
            let data = { title: "Login", message: "Login Failed please fill correct details", profile: {} }
            res.status(200).render('login', data);
            return;
        }

        bcrypt.compare(info.Password, result[0].hash_password, (err, match) => {
            if (err) {
                let data = { title: "Login", message: "Login Again Please Some Error in Fetching Your Account..", profile: {} }
                res.status(200).render('login', data);
                return;
            }
            if (!match) {
                let data = { title: "Login", message: "Login Failed please fill correct details", profile: {} }
                res.status(200).render('login', data);
                return;
            }
            req.session.user = result[0].user_id;
            let login_time = new Date();
            let plateform = req.headers['user-agent'];
            let ip = req.ip;
            cmd = `INSERT INTO login_history(user_id, login_time, plateform, ipaddress) VALUES('${req.session.user}', '${login_time}', '${plateform}', '${ip}')`;
            con.query(cmd, (err, result) => {
                if (err) throw err;
                return;
            });
            req.session.save(function (err) {
                if (err) return next(err)
                res.redirect(req.session.prevURL);
            });
        });
    });
};


module.exports = { loginGet, loginPost };

