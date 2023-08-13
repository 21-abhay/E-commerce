
const con = require('../config/mysqlDB');

const aboutController = (req, res) => {
    if (req.session.user) {
        let cmd = `SELECT * FROM users WHERE user_id='${req.session.user}'`;
        con.query(cmd, (err, result) => {
            if (err) throw err;
            let data = { title: 'About', profile: result[0] };
            res.status(200).render('about', data);
        });
    }
    else {
        const data = { title: "About", profile: {} }
        res.status(200).render('about', data);
    }
}


module.exports = aboutController;