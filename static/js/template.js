
let profile = document.getElementById("profile-btn");
let profile_link = document.getElementById("profile-link");
let signup = document.getElementById("sign-up-btn");
let signup_link = document.getElementById("sign-up-link");

if(profile.innerHTML){
    signup_link.style.display = "none";
    profile_link.style.display = 'inline-block';
}

// profile.innerHTML = 'profile'