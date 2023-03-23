

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
//Namn, pris och bild ska loopas ut. 



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