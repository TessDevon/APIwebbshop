

/*----------------------------------------------------------------------------
------------ Skapa ny användare ----------------------------------------------
----------------------------------------------------------------------------*/ 
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
//        printUsers(data);
        console.log(data);
    });
    newName.value = ""
    newEmail.value = ""
    newPassword.value = ""
})

/*----------------------------------------------------------------------------
------------ Logga in användare ----------------------------------------------
----------------------------------------------------------------------------*/ 
const loginUserBtn = document.getElementById("login_user_btn");
const loginUserEmail = document.getElementById("login_email");
const loginUserPassword = document.getElementById("login_password");
const loginMessage = document.getElementById("login_message");

let userId;
loginUserBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let sendUserData = {email: loginUserEmail.value, password: loginUserPassword.value};
    
    // logIn.reset();
    loginMessage.innerHTML = ""

    // console.log(user);

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
        userId = data;
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

/*-----------------------------------------------------------------------------
------------ Visa varorna utifrån kattegori ---------------------------------
----------------------------------------------------------------------------*/
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


//Hämta alla pruduker med kategori Kökstextil 

const kitchenProducts = document.getElementById("sort_kitchen");
kitchenProducts.addEventListener("click", findAllProductByKitchen);

function findAllProductByKitchen () {
    fetch("http://localhost:3000/api/products/category/64199abf6b236bee1295fcc2", {
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
        printProducts(data)
    })
    .catch((error) => {
        console.error("Error:", error);
        //const loginMassage = document.getElementById("login_massage");

        //const errorMassege = document.createTextNode("Error! Fel användarnamn eller lösenord!");
        loginMessage.style.color = "red";
        loginMessage.appendChild(errorMassege);

    });
}


//Hämta alla produkter med kategori Badtextil 

const bathroomProducts = document.getElementById("sort_bathroom");
bathroomProducts.addEventListener("click", findAllProductBathroom);

function findAllProductBathroom () {
    fetch("http://localhost:3000/api/products/category/64199acf6b236bee1295fcc4", {
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
        printProducts(data)
    })
    .catch((error) => {
        console.error("Error:", error);
        //const loginMassage = document.getElementById("login_massage");
       // const errorMassege = document.createTextNode("Error! Fel användarnamn eller lösenord!");
        loginMessage.style.color = "red";
        loginMessage.appendChild(errorMassege);

    });
}


//Hämta alla produkter med kategori Sovrum 
const bedroomProducts = document.getElementById("sort_bedroom");
bedroomProducts.addEventListener("click", findAllProductBedroom);

function findAllProductBedroom () {
    fetch("http://localhost:3000/api/products/category/64199adc6b236bee1295fcc6", {
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
        printProducts(data)
    })
    .catch((error) => {
        console.error("Error:", error);
        //const loginMassage = document.getElementById("login_massage");
        //const errorMassege = document.createTextNode("Error! Fel användarnamn eller lösenord!");
        loginMessage.style.color = "red";
        loginMessage.appendChild(errorMassege);
    });
}


//Namn, pris och bild ska loopas ut. 
function printProducts(products) {

    const productContainer = document.getElementById("product_container");



    products.map(product => {
        
        const productArticle = document.createElement("article");
        productArticle.class = "product";
        productArticle.id = "product";
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

        const numberOfGoods = document.createElement("INPUT"); 
        numberOfGoods.setAttribute("type", "number");
        numberOfGoods.className = "number_of_goods";
        numberOfGoods.id = "number_of_goods";
        productArticle.appendChild(numberOfGoods);

        const byProductBtn = document.createElement("button");
        byProductBtn.id = product.id
        byProductBtn.innerHTML = "Köp"
        productArticle.appendChild(byProductBtn);

        byProductBtn.addEventListener("click", (event) => {
            //root.innerHTML="";
            //showBook(event);
        }); 
    });
};


/*----------------------------------------------------------------------------
------------ Kundvagnen ------------------------------------------------------
----------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------
------------ Skicka order och uppdatera saldor i DB -------------------------
----------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------
------------ Visa användarens ordrarna på ny sida ---------------------------------------
----------------------------------------------------------------------------*/


//Spara inloggning och kundvagn i Localhost