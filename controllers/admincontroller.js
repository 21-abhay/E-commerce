

const con = require('../config/mysqlDB');



const adminControllerGet = (req, res) => {
    let data = { title: 'Admin-Login', profile: {}};
    res.status(200).render('AdminLogin', data)
}


const adminControllerPost = (req,res)=>{
    const {Email,Password}=req.body;
    if(Email == process.env.admin_email && Password == process.env.admin_password){
        req.session.admin='logged'
        res.redirect('/admin/portal')
    }
    else{
        res.redirect('/admin/login/admin')
    }
}

const adminLogout = (req,res)=>{
    req.session.admin = 'Not-Logged'
    res.redirect('/admin/login/admin')
}

const adminPortal = (req,res)=>{
    console.log('Admin Portal...');
    if(req.session.admin=='logged'){
        let cmd = `SELECT * FROM book b INNER JOIN users u ON b.uploaded_by=u.user_id WHERE b.permission='Yes'`;
        con.query(cmd,(err,listed)=>{
            if(err){
                throw err
                return res.status(500).send("<div><h1>Internal Sever Error</h1></div>");
            }
            cmd = `SELECT * FROM book b INNER JOIN users u ON b.uploaded_by=u.user_id WHERE b.permission='No'`;
            con.query(cmd,(error,unlisted)=>{
                if(error){
                    throw error
                    return res.status(500).send("<div><h1>Internal Sever Error</h1></div>");
                }
                let data = { title: 'Admin-Portal', profile: {},listed:listed,unlisted:unlisted};
                res.status(200).render('AdminPortal', data)
            })
        })
        
    }
    else{
        res.redirect('/admin/login/admin')
    }
}

const removeItem = (req,res)=>{
    const book_id = req.params.book_id
    console.log('Remove Book - Id : ',book_id);
    let cmd = `DElETE FROM book WHERE book_id='${book_id}'`;
    con.query(cmd,(err,result)=>{
        if(err){
            throw err
            return res.status(500).send("<div><h1>Internal Sever Error</h1></div>");
        }
        res.redirect('/admin/portal')
    });
}

const addItem = (req,res)=>{
    const book_id = req.params.book_id
    console.log('Add Book - Id : ',book_id);
    let cmd = `UPDATE book SET permission='Yes' WHERE book_id='${book_id}'`;
    con.query(cmd,(err,result)=>{
        if(err){
            throw err
            return res.status(500).send("<div><h1>Internal Sever Error</h1></div>");
        }
        res.redirect('/admin/portal')
    });
}


module.exports = {adminControllerGet,adminControllerPost,adminLogout,adminPortal,removeItem,addItem};