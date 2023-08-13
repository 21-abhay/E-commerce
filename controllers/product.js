

const con = require('../config/mysqlDB');


const productController = (req, res) => {
    // console.log("URL : ",req.originalUrl)
    if (req.session.user) {
        // let cmd = `SELECT * FROM abhay_users WHERE user_id='${req.session.user}'`;
        let cmd = `SELECT * FROM users WHERE user_id='${req.session.user}'`;
        con.query(cmd, (err, result) => {
            if (err) throw err;
            // console.log(result[0]);
            let data = { title: 'Products', profile: result[0] };
            res.status(200).render('product', data);
        });
    }
    else {
        // console.log("Data is Fetched");
        let data = { title: 'Product', profile: {} };
        res.render('product', data);
    }
}

module.exports = productController;