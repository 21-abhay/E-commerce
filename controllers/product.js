

const con = require('../config/mysqlDB');


const productController = async(req, res) => {
    let products = [];
    let user = {};
    let category;
    let classes = [1,2,3,4,5,6,7,8,9,10,11,12];
    
    if (req.session.user) {
        // let cmd = `SELECT * FROM abhay_users WHERE user_id='${req.session.user}'`;
        let cmd = `SELECT * FROM users WHERE user_id='${req.session.user}'`;
        await con.query(cmd, (err, result) => {
            if (err) throw err;
            user = result[0];
            return;
        });
    }

    con.query(`SELECT DISTINCT category FROM book`, (err, types)=>{
        if(err){
            res.send(err)
            return;
        }
        category = types;
    });

    const query = `SELECT b.category, GROUP_CONCAT(JSON_OBJECT('book_id', b.book_id,'book_name', b.book_name,'category', b.category,'price', b.price,'rating', (SELECT r.rating FROM review r WHERE r.book_id = b.book_id))SEPARATOR ',') as books FROM book b WHERE b.permission='Yes'  GROUP BY b.category`;

    await con.query(query,(err,results)=>{
        if(err){
            res.status(500).json({err});
            return;
        }
        products = results.map((result) => ({
            category: result.category,
            books: JSON.parse(`[${result.books}]`), // Parse the string into an array
        }));
        for(let i=0;i<products.length; i++){
            for(let j=0;j<products[i].books.length; j++){
                const name = 'product-' + products[i].books[j].book_id + '.jpeg';
                products[i].books[j].image = name;
            }
        }

        req.session.prevURL = req.originalUrl;
        let data = { title: 'Products', profile: user, products: products, categories:category,classes:[] };
        res.status(200).render('product', data);
    });
    
}

module.exports = productController;