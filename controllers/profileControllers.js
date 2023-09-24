
const con = require('../config/mysqlDB');



const viewProfile = (req, res) => {
    const profileid = req.params.profileid;
    if (req.session.user == profileid) {
        let cmd = `SELECT * FROM users u LEFT JOIN user_location ul ON u.user_id=ul.user_id WHERE u.user_id='${profileid}'`;
        con.query(cmd, (err, results) => {
            if (err) throw err;
            results[0].image = 'user-' + results[0].user_id + '.jpeg';
            results[0].Location = results[0].house_no + " , " + results[0].town + " , " + results[0].district + " , " + results[0].state + " , " + results[0].country + " , " + results[0].pin_no
            cmd = `SELECT * FROM book WHERE uploaded_by='${req.session.user}'`;
            con.query(cmd, (err, result) => {
                if (err) throw err;
                cmd = `SELECT *,o.item_id FROM order_details o LEFT JOIN book b ON o.item_id=b.book_id WHERE user_id = '${profileid}'`;
                con.query(cmd, (err,output)=>{
                    if(err){
                        res.status(400).send('Reload please..');
                        return;
                    }
                    let data = { title: results[0].first_name, profile: results[0], items: result, role: results[0].role, orders: output };
                    res.status(200).render('profile', data);
                })
            })
        })
    }
    else {
        res.status(404).send("<h1>What are You Doing Human...</h1><h2>Please! Login First </h2> ");
    }
};



module.exports = viewProfile;