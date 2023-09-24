const key = document.getElementById('key');
const viewcart = document.getElementById('view-cart-container');

if(key.innerHTML=='Nothing'){
    viewcart.style.display = 'none'
}
else{
    viewcart.style.display = 'block'
}