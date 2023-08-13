
// let insert_btn = document.getElementById("insert-btn");
// let view_btn = document.getElementById("view-items-btn");
// let profile_button = document.getElementById("profile-button");

let insert_msg = document.getElementById("insert-message");
let count=1;
function insert_message(){
    // insert_msg.innerHTML=`<strong>Success!</strong> ${count} is inserted successfully...`
    insert_msg.style.display = 'flex';
    // count=cont+1;
}


let role=document.getElementById("role");
let user_container = document.getElementById("user");  
let admin_container = document.getElementById("admin"); 
if(role.innerHTML=="User"){
    user_container.style.display = 'block';
    admin_container.style.display = 'none';
}
else if(role.innerHTML=="Admin"){
    user_container.style.display = 'none';
    admin_container.style.display = 'block';

}

let insert_container = document.getElementById("insert-items-container");
let view_container = document.getElementById("show-items-container");
let profile_container = document.getElementById("profile-container");
function show_insert(){
    view_container.style.display = 'none';
    insert_container.style.display = 'flex';
    profile_container.style.display = 'none';
}
function show_view(){
    view_container.style.display = 'flex';
    insert_container.style.display = 'none';
    profile_container.style.display = 'none';
}
function show_profile(){
    view_container.style.display = 'none';
    insert_container.style.display = 'none';
    profile_container.style.display = 'block';
}


let profile_btn_container = document.getElementById("profile-btn-container"); 
function show_profile_btn_container(){
    if(profile_btn_container.style.display == 'none'){
        profile_btn_container.style.display = 'block';
    }
    else{
        profile_btn_container.style.display = 'none';
    }
}


let my_detail_container = document.getElementById("my-details-container");
let my_location_container = document.getElementById("my-location-container");
let my_order_container = document.getElementById("my-order-container");
let my_accounts_container = document.getElementById("my-accounts-container");

function show_my_details(){
    my_detail_container.style.display = 'flex';
    my_location_container.style.display = 'none';
    my_order_container.style.display = 'none';
    my_accounts_container.style.display = 'none';
}
function show_my_location(){
    my_detail_container.style.display = 'none';
    my_location_container.style.display = 'block';
    my_order_container.style.display = 'none';
    my_accounts_container.style.display = 'none';
}
function show_my_order(){
    my_detail_container.style.display = 'none';
    my_location_container.style.display = 'none';
    my_order_container.style.display = 'block';
    my_accounts_container.style.display = 'none';
}
function show_my_accounts(){
    my_detail_container.style.display = 'none';
    my_location_container.style.display = 'none';
    my_order_container.style.display = 'none';
    my_accounts_container.style.display = 'block';
}
function show_update_my_details(){
    my_detail_container.style.display = 'none';
    my_location_container.style.display = 'none';
    my_order_container.style.display = 'none';
    my_accounts_container.style.display = 'none';
}
function show_update_my_location(){
    my_detail_container.style.display = 'none';
    my_location_container.style.display = 'none';
    my_order_container.style.display = 'none';
    my_accounts_container.style.display = 'none';
}
function show_update_my_accounts(){
    my_detail_container.style.display = 'none';
    my_location_container.style.display = 'none';
    my_order_container.style.display = 'none';
    my_accounts_container.style.display = 'none';
}



let category_none = document.getElementById("category-none");
let category_input = document.getElementById("category-input");
let category = document.getElementById("category");

value=category.value;
if(value=='none'){
    category_input.style.display="inline-block";
    category_none.setAttribute("value",category_input.value);
}