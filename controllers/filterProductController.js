
const con = require('../config/mysqlDB');

const postFilterProduct = async(req,res)=>{
    let url=req.originalUrl + '?';
    let { category , price , classes} = req.body;
    category ? url+='category='+category : '';
    price ? url+='&price='+price : '';
    classes ? url+='&classes='+classes : '';

    console.log("POST URL : ",url);

    res.redirect(url);
}


const filterProduct = async(req,res)=>{
    // console.log("Filter : ",req.session.prevURL)
    let categories;
    let classess = [];
    let profile = {};
    let products;
    // let { category , price , classes} = req.body;
    console.log('GET URL : ',req.originalUrl);
    let filter = req.originalUrl.replace(['%20'],' ').replace('%3E','>').replace('%3C','<').split('?')[1].split('&');
    category = filter[0].split('=')[1];
    price = filter[1].split('=')[1];
    console.log("array of category : ",filter)
    let arr={category : category,price : price};
    let condition='';
    category!="all" || price != "all" ? condition = ' AND ': console.log("Price : ",price);
    category!="all"  ? condition += `category = '${category}'` :"";
    category!="all"  & price!="all"  ? condition += ` AND ` : "";
    price =='500>' ? condition += ` price < 500` : price =='500-800' ? condition = condition + `price >= 500 AND price <= 800` : price =='800<' ? condition = condition + `price > 800` :"";


    con.query(`SELECT DISTINCT category FROM book`, (err, types)=>{
        if(err){
            res.send(err)
            return;
        }
        categories = types;
    });

    if(req.session.user){
        cmd = `SELECT * FROM users WHERE user_id='${req.session.user}'`;
        con.query(cmd, async(err, user) =>{
            if (err) throw err;
            profile = user[0];
        })
    }

    console.log("Condition : ",condition)
    con.query(`SELECT * FROM book WHERE permission='Yes' ${condition}`, (err, books) =>{
        if (err) {
            console.error('Error fetching data from the database:', err);
            return;
        }
        for (let i = 0; i < books.length; i++) {
            let name = 'product-' + books[i].book_id + '.jpeg';
            books[i].image = name;
        }
        products = books;
        let data = { title: 'filter', products: products, profile: profile , categories:categories, classes:classess, condition:arr};
        
        req.session.prevURL = req.originalUrl;
        console.log("Prev URL : ",req.session.prevURL)
        res.status(200).render('filter', data);
    });
    
}

module.exports = {postFilterProduct,filterProduct};