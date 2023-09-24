
const type = document.getElementById('buy-type');
const single = document.getElementById('single-item');
const multiple = document.getElementById('multiple-item');
const total = document.getElementById('total');
const quantityInput = multiple.querySelectorAll('input');
const price = document.getElementsByClassName('total-price');
// const quantityInput = document.getElementsByClassName('quantity');

if(type.innerHTML == 'one'){
    multiple.style.display = 'none';
}
else{
    single.style.display = 'none';
}
// total.innerHTML = "sdafdsfds fs"

function countTotal(){
    let a=0
    console.log("Start Count  ");
    for (let index = 0; index < price.length; index++) {
        a= a + parseInt(price[index].getAttribute("data-custom"))
        console.log("Total Price : ",a);
    }
    console.log("Stop Count  ");
    total.innerHTML = a
}
countTotal();

function onchangehandler(e){
    if(e.value > 0){
        const element = e.getAttribute("data-custom").replace('`',"").replace('`',"");
        // element = element.replace('`',"")
        const totalprice = document.getElementById('total-'+element);
        const singleprice = document.getElementById(element);
        const cost = e.value * singleprice.getAttribute("data-custom")
        totalprice.innerHTML = '&#8377; '+cost;
        totalprice.setAttribute("data-custom", cost);
        countTotal();
        // total.innerHTML = `${element}`
    }
    else{
        e.value = 1
    }
    
}


