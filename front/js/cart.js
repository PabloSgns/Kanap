let storedCart = JSON.parse(localStorage.getItem("cart"));


async function getProductPrices() {
    let prices = [];
    for (let i = 0; i < storedCart.length; i++) {
      const product = await fetch('http://localhost:3000/api/products/' + storedCart[i].id);
      const response = await product.json();
      prices[storedCart[i].id] = response.price;
    }
    return prices;
  }


const orderButton = document.getElementById("order");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const addressInput = document.getElementById("address");
const cityInput = document.getElementById("city");
const emailInput = document.getElementById("email");

const firstNameError = document.getElementById("firstNameErrorMsg");
const lastNameError = document.getElementById("lastNameErrorMsg");
const addressError = document.getElementById("addressErrorMsg");
const cityError = document.getElementById("cityErrorMsg");
const emailError = document.getElementById("emailErrorMsg");


getProductPrices().then((prices) => {

    getCart(prices);

    getTotals(prices);

    deleteItem();

    changeQuantity();

});

validateOrder();

// Génération du panier
function getCart (prices) {

    if (storedCart === null || storedCart.length === 0) {

        const titleCart = document.querySelector("h1");
        titleCart.innerHTML = "Votre panier est vide";

        sectionCart = document.querySelector(".cart");
        sectionCart.style.display = "none";

    }else{

        for (let i=0; i < storedCart.length; i++) {

            const productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute("data-id", storedCart[i].id);
            productArticle.setAttribute("data-color", storedCart[i].color);

            const productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";

            const productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src = storedCart[i].image;
            productImg.alt = storedCart[i].altImg;

            const productDivContent = document.createElement("div");
            productArticle.appendChild(productDivContent);
            productDivContent.className = "cart__item__content";
            
            const productDescription = document.createElement("div");
            productDivContent.appendChild(productDescription);
            productDescription.className = "cart__item__content__description";
            
            const productTitle = document.createElement("h2");
            productDescription.appendChild(productTitle);
            productTitle.innerHTML = storedCart[i].name;

            const productColor = document.createElement("p");
            productDescription.appendChild(productColor);
            productColor.innerHTML = storedCart[i].color;
            productColor.style.fontSize = "20px";

            const productPrice = document.createElement("p");
            productDescription.appendChild(productPrice);
            productPrice.className = "itemPrice";
            productPrice.innerHTML = prices[storedCart[i].id] + " €";
    
            const productSettings = document.createElement("div");
            productDivContent.appendChild(productSettings);
            productSettings.className = "cart__item__content__settings";

            const productSettingsQuantity = document.createElement("div");
            productSettings.appendChild(productSettingsQuantity);
            productSettingsQuantity.className = "cart__item__content__settings__quantity";
            
            const productQuantity = document.createElement("p");
            productSettingsQuantity.appendChild(productQuantity);
            productQuantity.innerHTML = "Qté : ";

            const productQuantityInput = document.createElement("input");
            productSettingsQuantity.appendChild(productQuantityInput);
            productQuantityInput.className = "itemQuantity";
            productQuantityInput.setAttribute("type", "number");
            productQuantityInput.setAttribute("min", "1");
            productQuantityInput.setAttribute("max", "100");
            productQuantityInput.setAttribute("name", "itemQuantity");
            productQuantityInput.value = storedCart[i].quantity;

            const productSettingsDelete = document.createElement("div");
            productSettings.appendChild(productSettingsDelete);
            productSettingsDelete.className = "cart__item__content__settings__delete";

            const productDelete = document.createElement("p");
            productSettingsDelete.appendChild(productDelete);
            productDelete.className = "deleteItem";
            productDelete.innerText = "Supprimer"
        }
    }
}

// Récupération du total des quantités et du prix total
function getTotals(prices){

    // Récupération du total des quantités
    let productQuantity = document.getElementsByClassName('itemQuantity');
    
    let totalQuantity = 0;

    for (let i = 0; i < productQuantity.length; i++) {
        totalQuantity += productQuantity[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQuantity;

    // Récupération du prix total
    let totalPrice = 0;

    for (let i = 0; i < productQuantity.length; i++) {
        totalPrice += (productQuantity[i].valueAsNumber * prices[storedCart[i].id]);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}

// Suppression d'un article du panier
function deleteItem(){

    let productDelete = document.querySelectorAll('.deleteItem');

    for (let i = 0; i < productDelete.length; i++) {

        productDelete[i].addEventListener("click", (event) => {
        

            if(window.confirm(`Cet article sera supprimé de votre panier, voulez-vous continuer ?`)){

                storedCart.splice(i, 1);
                localStorage.setItem('cart', JSON.stringify(storedCart));
                location.reload();;
            }       
        })
    }
}

// Modification de la quantité d'un article
function changeQuantity() {
    let quantityChanged = document.querySelectorAll(".itemQuantity");

    for (let i=0; i < quantityChanged.length; i++){

        
        quantityChanged[i].addEventListener("change" , (event) => {
            event.preventDefault();

            if (quantityChanged[i].valueAsNumber < 1 || quantityChanged[i].valueAsNumber > 100) {

                alert("Veuillez saisir une quantité entre 1 et 100");
                quantityChanged[i].valueAsNumber = storedCart[i].quantity; 

            }else{

            storedCart[i].quantity = quantityChanged[i].valueAsNumber;
            localStorage.setItem('cart', JSON.stringify(storedCart));
            location.reload();
            }

        })
    }
}

// Validation du formulaire
function validateOrder() {

    const nameRegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ -][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/;
    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const addressRegExp = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
    const cityRegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:[ -][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/;


    firstNameInput.addEventListener("change" , (event) => {
        if (nameRegExp.test(firstNameInput.value) || firstNameInput.value == "") {
            firstNameError.innerHTML = "";    
        } else {
            firstNameError.innerHTML = "Le prénom n'est pas valide.";
        }
    });

    lastNameInput.addEventListener("change" , (event) => {
        if (nameRegExp.test(lastNameInput.value) || lastNameInput.value == "") {
            lastNameError.innerHTML = "";
        } else {
            lastNameError.innerHTML = "Le nom n'est pas valide.";
        }
    });

    addressInput.addEventListener("change" , (event) => {
        if (addressRegExp.test(addressInput.value) || addressInput.value == "") {
            addressError.innerHTML = "";
        } else {
            addressError.innerHTML = "L'addresse n'est pas valide.";
        }
    });

    cityInput.addEventListener("change" , (event) => {
        if (cityRegExp.test(cityInput.value) || cityInput.value == "") {
            cityError.innerHTML = "";
        } else {
            cityError.innerHTML = "La ville n'est pas valide.";
        }
    });

    emailInput.addEventListener("change" , (event) => {
        if (emailRegExp.test(emailInput.value) || emailInput.value == "") {
            emailError.innerHTML = "";
        } else {
            emailError.innerHTML = "L'adresse email n'est pas valide.";
        }
    });

    orderButton.addEventListener("click", (event) => {
        event.preventDefault();

        if (nameRegExp.test(firstNameInput.value) && nameRegExp.test(lastNameInput.value) && addressRegExp.test(addressInput.value) && cityRegExp.test(cityInput.value) && emailRegExp.test(emailInput.value)) {
            sendOrder();
        } else {
            alert("Veuillez remplir correctement tous les champs du formulaire.");
        }
    });
}

// Envoi des données au serveur
function sendOrder() {

    let contact = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        address: addressInput.value,
        city: cityInput.value,
        email: emailInput.value
    }

    let products = [];

    for (let i = 0; i < storedCart.length; i++) {
        products.push(storedCart[i].id);
    }

    let order = {
        contact,
        products
    }

    let options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch("http://localhost:3000/api/products/order", options)
    .then(response => response.json())
    .then(data => {
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);
        window.location.href = "confirmation.html";
    })
    .catch(error => {
        alert("Une erreur est survenue lors de la validation de votre commande. Veuillez réessayer ultérieurement.");
    });
}


