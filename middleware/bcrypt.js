const bcrypt = require('bcrypt');
async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {throw error;}
}
async function verifyPassword(password, hash){
  try{
    return await bcrypt.compare(password, hash);
  }
  catch(err) {throw err;}
}
module.exports={hashPassword, verifyPassword};