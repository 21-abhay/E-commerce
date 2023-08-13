let signup_sub_div =document.getElementsByClassName("sign-up-sub-div");

let count=0;

signup_sub_div[count].style.display="block";
function show_next(){
    signup_sub_div[count].style.display="none";
    count=count+1;
    signup_sub_div[count].style.display="block";
}
function show_back(){
    signup_sub_div[count].style.display="none";
    count=count-1;
    signup_sub_div[count].style.display="block";
}