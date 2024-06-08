
onload = () =>{
    checkStockStorage();
};

const checkStockStorage = ()=>{
    const stockCheck = localStorage.getItem('Stock');
    if(!stockCheck){
        const stock = {
            userId:generateString(),
            productName:[],
            productCount:[],
            productSalePrice:[],
            productBuyPrice:[],
        };
        localStorage.setItem("Stock",JSON.stringify(stock));
    }
};

const generateString = ()=>{
    return '_' + Math.random().toString(36).substr(2, 9);
};