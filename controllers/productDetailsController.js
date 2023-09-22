

const con = require('../config/mysqlDB');


const productDetails = (req, res) => {
    const productid = req.params.productId;
    let cmd = `SELECT *, b.book_id FROM book b LEFT JOIN review r ON b.book_id=r.book_id WHERE b.book_id='${productid}'`;
    req.session.prevURL = req.originalUrl;
    con.query(cmd, (err, results) => {
        if (err) {
            throw err;
        }
        else {
            const view=results[0].views+1
            con.query(`UPDATE book SET views=${view} WHERE book_id='${productid}'`, (err)=>{
                if(err) throw err;
            });
            results[0].image = 'product-' + results[0].book_id + '.jpeg';
            if (req.session.user) {
                let cmd = `SELECT * FROM users WHERE user_id='${req.session.user}'`;
                con.query(cmd, (err, result) => {
                    if (err) throw err;
                    let data = { title: 'home', product: results[0], profile: result[0] };
                    res.status(200).render('product_details', data);
                });
            }
            else {
                let data = { title: 'home', product: results[0], profile: {} };
                res.render('product_details', data);
            }
        }
    })
};


module.exports = productDetails;

