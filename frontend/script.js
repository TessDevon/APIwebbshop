

/*------------------------------------------------------------------------------------------------
--------------------------- Skapa ny användare ---------------------------------------------------
------------------------------------------------------------------------------------------------*/ 

const newUserBtn = document.getElementById("new_user_btn");
const newName = document.getElementById("new_name");
const newEmail = document.getElementById("new_email");
const newPassword = document.getElementById("new_password");


newUserBtn.addEventListener("click", (event) => {
    event.preventDefault();
    //console.log("Called Handler");
    let user = {name: newName.value, email: newEmail.value, password:newPassword.value};
    console.log(user);

    fetch("http://localhost:3000/api/users/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
    });
    newName.value = ""
    newEmail.value = ""
    newPassword.value = ""
})



/*-------------------------------------------------------------------------------------------------
---------------------------- Logga in användare ---------------------------------------------------
-------------------------------------------------------------------------------------------------*/ 

const loginUserBtn = document.getElementById("login_user_btn");
const loginUserEmail = document.getElementById("login_email");
const loginUserPassword = document.getElementById("login_password");
const loginMessage = document.getElementById("login_message");

let userIdLocalStorage = JSON.parse(localStorage.getItem("userIdLocalStorage")) || {id:""};

let userId;
loginUserBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let sendUserData = {email: loginUserEmail.value, password: loginUserPassword.value};
    loginMessage.innerHTML = ""

    fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(sendUserData)
    })
    .then(res => {
        if(!res.ok) {
            throw new Error("Network response was not OK")
        }
            return res.json()
        })
    .then(data => {
        console.log(data);
        userId = data.id;
        token = data.token;
        localStorage.setItem("userIdLocalStorage", JSON.stringify({id:userId, token:token}))
        console.log(userId)
        
        //const serverMassage = document.getElementById("serverMassage");
        const okMessage = document.createTextNode("Välkommen till vår webshop!");
        loginMessage.style.color = "green";
        loginMessage.appendChild(okMessage);
    })  
    .catch((error) => {
        console.error("Error:", error);
        //const loginMassage = document.getElementById("login_massage");

        const errorMassege = document.createTextNode("Error! Fel användarnamn eller lösenord!");
        loginMessage.style.color = "red";
        loginMessage.appendChild(errorMassege);
    });
    loginUserEmail.value = ""
    loginUserPassword.value = ""
});



/*---------------------------------------------------------------------------------------------------
------------------------- Visa varorna utifrån kattegori --------------------------------------------
---------------------------------------------------------------------------------------------------*/

const productContainer = document.getElementById("product_container");

//Hämta alla produkter.
const allProducts = document.getElementById("all_products");
allProducts.addEventListener("click", findAllProduct);

function findAllProduct () {
    fetch("http://localhost:3000/api/products", {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
        },
        //body:JSON.stringify(sendUserData)
    })
    .then(res => {
        if(!res.ok) {
            throw new Error("Network response was not OK")
        }
            return res.json()
        })
    .then(data => {
        console.log(data);
        productContainer.innerHTML="";
        printProducts(data);
    })
    .catch((error) => {
        console.error("Error:", error);
        //const loginMassage = document.getElementById("login_massage");

        //const errorMassege = document.createTextNode("Error! Fel användarnamn eller lösenord!");
        loginMessage.style.color = "red";
        loginMessage.appendChild(errorMassege);

    });
}
findAllProduct();

function laodCategories () {
    fetch("http://localhost:3000/api/categories", {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
        },

    })
    .then(res => {
        if(!res.ok) {
            throw new Error("Network response was not OK")
        }
            return res.json()
        })
    .then(data => {
        const sortDiv = document.getElementById("sort_div");
        let categorys = data
        categorys.map(category => {

            const categoryRadio = document.createElement("INPUT"); 
            categoryRadio.setAttribute("type", "radio");
            categoryRadio.setAttribute("name","sort");
            categoryRadio.id = category._id;
            console.log(category)
            sortDiv.appendChild(categoryRadio);

            const categoryText = document.createElement("span");
            categoryText.class = "category_text";
            categoryText.id = "category_text";
            sortDiv.appendChild(categoryText);
            categoryText.innerHTML = category.name;

            categoryRadio.addEventListener("click", findAndWhriteCategory)
        })
    })
};
laodCategories();



//Hämta produkter från en kategori och skriv ut

function findAndWhriteCategory (event) {

    const selectedCategory = event.target.id
    console.log(selectedCategory);

    fetch("http://localhost:3000/api/products/category/" + selectedCategory, {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res => {
        if(!res.ok) {
            throw new Error("Network response was not OK")
        }
            return res.json()
        })
    .then(data => {
        console.log(data);
        productContainer.innerHTML="";
        printProducts(data)
    })
    .catch((error) => {
        console.error("Error:", error);
        loginMessage.style.color = "red";
        loginMessage.appendChild(errorMassege);

    });
}



//Namn, pris och bild ska loopas ut. 

function printProducts(products) {

    const productContainer = document.getElementById("product_container");

    products.map(product => {
        
        const productArticle = document.createElement("article");
        productArticle.class = "product_article ";
        productArticle.id = "product_article";
        productContainer.appendChild(productArticle);  

        const productImg = document.createElement("img");
        productImg.class = "product_img";
        productImg.id = "product_img";
        productImg.setAttribute("src", "src/img/Exempelbild.jpg");   
        productImg.setAttribute("width", "304");
        productImg.setAttribute("height", "228");
        productImg.setAttribute("alt", "Varan");

        productArticle.appendChild(productImg);

        const productNameH4 = document.createElement("h4");
        productNameH4.class = "product_name";
        productNameH4.id = "product_name";
        productArticle.appendChild(productNameH4);
        productNameH4.innerHTML = product.name;

        const productPrice = document.createElement("p");
        productPrice.class = "product_price";
        productPrice.id = "product_price";
        productArticle.appendChild(productPrice);
        productPrice.innerHTML = product.price + "kr";

        const buyProductBtn = document.createElement("button");
        buyProductBtn.id = product._id
        buyProductBtn.innerHTML = "Köp"
        productArticle.appendChild(buyProductBtn);

        buyProductBtn.addEventListener("click", addProductToBasket)

    });
};



/*---------------------------------------------------------------------------------------------------------
------------------------------------- Kundvagnen ----------------------------------------------------------
---------------------------------------------------------------------------------------------------------*/

/*---------------- Lägga till varan i kundvagnen som sparas på localhost. --------------------------------*/

function addProductToBasket (event) {
    let Basket = JSON.parse(localStorage.getItem("Basket")) || [];

    const addProductId = event.target.id

    const itemInBasket = Basket.find(basketProduct => basketProduct.productId === addProductId)
    if (itemInBasket) {
        itemInBasket.quantity ++;
    } else {
        const updatedBasket = [...Basket, {productId:addProductId, quantity: 1}]
        Basket = updatedBasket;   
    }
    localStorage.setItem("Basket", JSON.stringify(Basket))
    whriteBasket();
}


/*------------------ Kundvagnen skrivs ut genom att hämta lista från lokahost ------------------------------------------*/

function whriteBasket () {
    let updatedBasket = JSON.parse(localStorage.getItem("Basket")) || []

    const shopBasketContainer = document.getElementById("shop_basket_container");

    shopBasketContainer.innerHTML= "";

    updatedBasket.forEach(basketProduct => 
        {
        fetch("http://localhost:3000/api/products/" + basketProduct.productId, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            if(!res.ok) {
                throw new Error("Network response was not OK")
            }
                return res.json()
            })
        .then(product => {
            const basketArticle = document.createElement("article");
            basketArticle.class = "basket_product_article";
            basketArticle.id = "basket_product_article";
            shopBasketContainer.appendChild(basketArticle); 

            const basketProductImg = document.createElement("img");
            basketProductImg.class = "basket_product_img";
            basketProductImg.id = "basket_product_img";
            basketProductImg.setAttribute("src", "src/img/Exempelbild.jpg");   
            basketProductImg.setAttribute("width", "304");
            basketProductImg.setAttribute("height", "228");
            basketProductImg.setAttribute("alt", "Varan");
            basketArticle.appendChild(basketProductImg);

            const productNameBasket = document.createElement("h4");
            productNameBasket.class = "basket_product_name";
            productNameBasket.id = "basket_product_name";
            basketArticle.appendChild(productNameBasket);
            productNameBasket.innerHTML = product.name;

            const productPriceInBasket = document.createElement("p");
            productPriceInBasket.class = "product_price_basket";
            productPriceInBasket.id = "product_price_basket";
            basketArticle.appendChild(productPriceInBasket);
            productPriceInBasket.innerHTML = product.price + "kr";

            const productQuantity = document.createElement("p");
            productQuantity.class = "product_price_basket";
            productQuantity.id = "product_price_basket";
            basketArticle.appendChild(productQuantity);
            productQuantity.innerHTML = basketProduct.quantity + "st";
        })
        .catch((error) => {
        console.error("Error:", error);
        });
    });
 };

whriteBasket();



/*----------------------------------------------------------------------------------------------------------------
------------------------------------ Skicka order och uppdatera saldor i DB --------------------------------------
----------------------------------------------------------------------------------------------------------------*/

const orderBtn = document.getElementById("order_btn");

orderBtn.addEventListener("click", sendOrder);

function sendOrder() {
    let userIdLocalStorage = JSON.parse(localStorage.getItem("userIdLocalStorage")) || {id:""};
    let orderBasket = JSON.parse(localStorage.getItem("Basket")) || []

    fetch("http://localhost:3000/api/orders/add", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({user: userIdLocalStorage.id, products: orderBasket})
        })
        .then(res => {
            if(!res.ok) {
                throw new Error("Network response was not OK")
            }
                return res.json()
            })
        .then(res => {
            localStorage.setItem("Basket", JSON.stringify([]));
            whriteBasket();
        })

        .catch((error) => {
            console.error("Error:", error);
        });
};



/*--------------------------------------------------------------------------------------------------------------
----------------------------------- Visa användarens ordrarna på ny sida ---------------------------------------
--------------------------------------------------------------------------------------------------------------*/

const showOrderBtn = document.getElementById("show_Order_btn");

showOrderBtn.addEventListener("click", getUserOrders)

function getUserOrders (event) {

    let userIdLocalStorage = JSON.parse(localStorage.getItem("userIdLocalStorage")) || {id:""};

    fetch("http://localhost:3000/api/orders/user", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({user: userIdLocalStorage.id, token:userIdLocalStorage.token})
    })
    .then(res => {
        if(!res.ok) {
            throw new Error("Network response was not OK")
        }
            return res.json()
        })
    .then(orders => {
        whriteOrders(orders);
    })

    .catch((error) => {
        console.error("Error:", error);
    });
};

const showOrders = document.getElementById("user-order_container");

function whriteOrders(orders) {
    showOrders.style.visibility = "visible";
    const hideMain = document.getElementsByName("main");
    const userOrderContainer = document.getElementById("user-order_container");
    console.log(orders);

    orders.forEach(order => {
        const orderArticle = document.createElement("article");
        orderArticle.class = "order_article";
        orderArticle.id = "order_article";
        userOrderContainer.appendChild(orderArticle);  

        const orderNumber = document.createElement("h2");
        orderNumber.class = "order_number";
        orderNumber.id = "order_number";
        orderArticle.appendChild(orderNumber);
        orderNumber.innerHTML = order._id;

        order.products.forEach(product =>{
            const orderProductImg = document.createElement("img");
            orderProductImg.class = "order_product_img";
            orderProductImg.id = "order_product-img";
            orderProductImg.setAttribute("src", "src/img/Exempelbild.jpg");   
            orderProductImg.setAttribute("width", "304");
            orderProductImg.setAttribute("height", "228");
            orderProductImg.setAttribute("alt", "Varan");
            orderArticle.appendChild(orderProductImg);

            const productNameOrder = document.createElement("h4");
            productNameOrder.class = "product_name_order";
            productNameOrder.id = "product_name_order";
            orderArticle.appendChild(productNameOrder);
            productNameOrder.innerHTML = product.productId;

            const numberOfGoodsBasket = document.createElement("p"); 
            numberOfGoodsBasket.className = "number_of_goods_basket";
            numberOfGoodsBasket.id = "number_of_goods_basket";
            orderArticle.appendChild(numberOfGoodsBasket);
            numberOfGoodsBasket.innerHTML = product.quantity + "st";
        });   
    });
};

const closeOrderView = document.getElementById("close_order_view");
closeOrderView.addEventListener("click", () => {
    showOrders.style.visibility = "hidden";

})