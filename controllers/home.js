
const con = require('../config/mysqlDB');


const homeController = async(req, res) => {
    let category;
    let classes = [1,2,3,4,5,6,7,8,9,10,11,12];
    let profile;
    let products;
    await con.query(`SELECT DISTINCT category FROM book`, (err, types)=>{
        if(err){
            res.send(err)
            return;
        }
        category = types;
    });

    await con.query(`SELECT * FROM book WHERE permission='Yes'`, (err, books) =>{
        if (err) {
            console.error('Error fetching data from the database:', err);
            return;
        }
        for (let i = 0; i < books.length; i++) {
            let name = 'product-' + books[i].book_id + '.jpeg';
            books[i].image = name;
        }
        products = books;
    });
    req.session.prevURL = req.originalUrl;

    cmd = `SELECT * FROM users WHERE user_id='${req.session.user}'`;
    await con.query(cmd, async(err, user) => {
        if (err) throw err;
        // let dob = user[0].dob;
        // user[0].dob = dob.getDate() + '-' + dob.getMonth() + '-' + dob.getFullYear();
        profile = user[0];
        if(req.session.user){
            let data = { title: 'home', products: products, profile: profile , categories:category, classes:classes};
            res.status(200).render('home', data);
        }
        else{
            let data = { title: 'home', products: products, profile: {} , categories:category, classes:classes};
            req.session.prevURL = req.originalUrl;
            res.render('home', data);
        }
    });

}

module.exports = homeController;