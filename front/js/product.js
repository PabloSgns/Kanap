const idProduct = new URL(location.href).searchParams.get("id");
const buttonAddToCart = document.querySelector("#addToCart");


generateProduct();


// Récupération des données de l'API
async function getProduct(){
    const product = await fetch('http://localhost:3000/api/products/' + idProduct);
    return product.json();
}


// Génération du produit
function generateProduct() {
    getProduct().then((product) => {

            const productImg = document.createElement("img");
            document.querySelector(".item__img").appendChild(productImg);
            productImg.src = product.imageUrl;
            productImg.alt = product.altTxt;

            const productName = document.getElementById('title');
            productName.innerHTML = product.name;

            const productPrice = document.getElementById('price');
            productPrice.innerHTML = product.price;

            const productDescription = document.getElementById('description');
            productDescription.innerHTML = product.description;

            for (let i = 0; i < product.colors.length; i++){
                const productColor = document.createElement("option");
                document.querySelector("#colors").appendChild(productColor);
                productColor.value = product.colors[i];
                productColor.innerHTML = product.colors[i];
        }
    }
)}

// Ajout au panier
buttonAddToCart.addEventListener("click", addToCart);

function addToCart() {
    const quantityChosen = document.getElementById("quantity").value;
    const colorChosen = document.getElementById("colors").value;

    let productChosen = {
        id: idProduct,
        name: document.querySelector("#title").textContent,
        quantity: Number(quantityChosen),
        color: colorChosen,
        image: document.querySelector(".item__img img").src,
        altImg: document.querySelector(".item__img img").alt,
    }

    // Confirmation d'ajout au panier
    function Confirmation() {

        if(window.confirm(`Votre commande de ${quantityChosen} ${document.querySelector("#title").textContent} ${colorChosen} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
            window.location.href ="cart.html";
        }
    }
    
    if (quantityChosen > 0 && quantityChosen <=100 && colorChosen != "") {
    
        let storedCart = JSON.parse(localStorage.getItem("cart"));

        if (storedCart) {
            const resultFind = storedCart.find(
                (property) => property.id === idProduct && property.color === colorChosen);
            if(resultFind) {
                let updatedQuantity =
                parseInt(productChosen.quantity) + parseInt(resultFind.quantity);
                resultFind.quantity = updatedQuantity;
                localStorage.setItem("cart", JSON.stringify(storedCart));
            } else {
                storedCart.push(productChosen);
                localStorage.setItem("cart", JSON.stringify(storedCart));
            }

        } else {
            storedCart =[];
            storedCart.push(productChosen);
            localStorage.setItem("cart", JSON.stringify(storedCart));
            console.log ("");
        }
    
    Confirmation();
        
    }else{
        
        window.confirm(`Merci de bien vouloir choisir une couleur ET une quantité`)
    }
}