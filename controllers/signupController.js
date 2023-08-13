

const con = require('../config/mysqlDB');
const  hashPassword  = require('../middleware/bcrypt');

const signupGet = (req, res) => {
    const data = { title: "Sign-up", profile: {} }
    res.status(200).render('Signup', data);
};


const signupPost = async(req, res) => {
    if (req.file) {
        // res.send('File uploaded successfully!');
    } else {
        res.status(200).render('signup', { profile: {}, message: 'Signup Failed! Please Insert Image' });
        return;
    }
    let info = req.body;
    con.query(`SELECT * FROM users WHERE email='${info.Email}'`, (err,output)=>{
        if(err){
            res.send(err);
            return;
        }
        if(output){
            let data = { title: "Signup", message: "Already Registered with this email..", profile: {} };
            res.status(200).render('signup', data);
            return;
        }
    })
    hash = await hashPassword(info.Password);
    console.log("Password : ",info.Password);
    console.log("Hash Password : ",hash);
    if (info.Password == info.Confirm_Password) {
        let join_date = new Date().toISOString();
        let cmd = `INSERT INTO users (first_name, last_name,user_id, role, mobile, email, dob, joining_date) VALUES('${info.FirstName}', '${info.LastName}', '${id}', '${info.Role}', ${info.Mobile}, '${info.Email}', '${info.DOB}', '${join_date}')`;
        con.query(cmd, function (err) {
            if (err) {
                res.status(400).render('signup', { title: "Sign-up", message: err });
                return;
            }
        });

        cmd = `INSERT INTO login_details(user_id, name, email, mobile, password, hash_password) VALUES('${id}', '${info.FirstName}', '${info.Email}', ${info.Mobile}, '${info.Password}', '${hash}')`;
        con.query(cmd, (err,result)=>{
            if(err){
                res.status(400).render('signup', { title: "Sign-up", message: err });
                return;
            }
        });

        cmd = `INSERT INTO user_location(user_id,country,state,district,town,house_no,pin_no) VALUES('${id}','${info.country}','${info.state}','${info.district}','${info.town}','${info.house_no}',${info.pin_no})`;
        con.query(cmd, (err,result)=>{
            if(err){
                res.status(400).render('signup', { title: "Sign-up", message: err });
                return;
            }
        });
        let data = { title: "Login", message: "Now Login with your account", profile: {} };
        res.status(200).render('login', data);
    }
    else {
        let data = { title: "Sign-up", message: "Please fill Info. Correctly", profile: {} }
        res.status(200).render('signup', data);
    }
};

module.exports = {signupGet, signupPost};
