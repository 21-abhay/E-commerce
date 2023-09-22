
const otpGenerator = require('otp-generator');

const otpGenerate = ()=>{
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    
    return otp;
}