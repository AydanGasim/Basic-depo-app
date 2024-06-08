onload = () =>{
    getProducts();
}
const addProduct = ()=>{
    const myModal = new bootstrap.Modal(document.getElementById('add'));

    const name = document.getElementById("name").value;
    const stock = document.getElementById("stock").value;
    const buy_price = document.getElementById("buy_price").value;
    const sale_price = document.getElementById("sale_price").value;
    let Stock = JSON.parse(localStorage.getItem('Stock'));

    Stock.productName.push(name);
    Stock.productCount.push(stock);
    Stock.productBuyPrice.push(buy_price);
    Stock.productSalePrice.push(sale_price);
    localStorage.setItem("Stock",JSON.stringify(Stock));
    myModal.hide();
    getProducts();
}


const getProducts = ()=>{
    let Stock = JSON.parse(localStorage.getItem('Stock'));
    let productsTable = '';

    for (let i = 0; i < Stock.productName.length; i++){
        productsTable += `
            <tr>
                <td>${Stock.productName[i]}</td>
                <td>${Stock.productCount[i]}</td>
                <td>${Stock.productBuyPrice[i]} $</td>
                <td>${Stock.productSalePrice[i]} $</td>
                <td>
                    <button onclick="sellProductView(${i})" class="btn btn-outline-danger btn-sm">Sell</button>
                    <button onclick="buyProductView(${i})" class="btn btn-outline-success btn-sm">Buy</button>
                </td>
            </tr>
        `;
    }
    document.getElementById("products").innerHTML = productsTable;
};


const sellProductView = (i)=>{
    const myModal = new bootstrap.Modal(document.getElementById('sell'));
    let Stock = JSON.parse(localStorage.getItem('Stock'));
    document.getElementById('product_name_sell').value = Stock.productName[i];
    document.getElementById('product_count_sell').setAttribute('max',Stock.productCount[i]);
    document.getElementById('product_id').value = i;

    myModal.show();
}

const sellProduct = ()=>{
    const count = document.getElementById('product_count_sell').value;
    const i = document.getElementById('product_id').value;
    let Stock = JSON.parse(localStorage.getItem('Stock'));

    if(count<=Stock.productCount[i]){
        Stock.productCount[i]-=count;
        localStorage.setItem("Stock",JSON.stringify(Stock));
    }else{
        alert("Not available number in stock");
    }
    getProducts();
    const myModalEl = document.getElementById('sell')
    myModalEl.addEventListener('hidden.bs.modal', event => {
        myModalEl.hide();
    })
}

const buyProductView = (i)=>{
    const myModal = new bootstrap.Modal(document.getElementById('buy'));
    let Stock = JSON.parse(localStorage.getItem('Stock'));
    document.getElementById('product_name_buy').value = Stock.productName[i];
    document.getElementById('product_buy_id').value = i;

    myModal.show();

}


const buyProduct = ()=>{
    const count = document.getElementById('product_count_buy').value;
    const i = document.getElementById('product_buy_id').value;
    let Stock = JSON.parse(localStorage.getItem('Stock'));

    if(count>0){
        Stock.productCount[i]+=Number(count);
        localStorage.setItem("Stock",JSON.stringify(Stock));
    }else{
        alert("Invalid number");

    }
    getProducts();
}