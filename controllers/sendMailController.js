
const con = require('../config/mysqlDB');

const aboutController = (req, res) => {
    if (req.session.user) {
        let cmd = `SELECT * FROM users WHERE user_id='${req.session.user}'`;
        con.query(cmd, (err, result) => {
            if (err) throw err;
            let data = { title: 'Mail', profile: result[0] };
            req.session.prevURL = req.originalUrl;
            res.status(200).render('sendMail', data);
        });
    }
    else {
        const data = { title: "Mail", profile: {} }
        req.session.prevURL = req.originalUrl;
        res.status(200).render('sendMail', data);
    }
}


module.exports = aboutController;