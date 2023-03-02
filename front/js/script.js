generateProducts();

// Récupération des données de l'API
async function getProducts(){
    const response = await fetch('http://localhost:3000/api/products/');
    return response.json();
}

// Génération des produits
function generateProducts() {
    getProducts().then( (products) => {
        for (let i = 0; i < products.length; i++) {

            const productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink)
            productLink.href = `product.html?id=${products[i]._id}`;

            const productArticle = document.createElement("article");
            productLink.appendChild(productArticle);
    
            const productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = products[i].imageUrl;
            productImg.alt = products[i].altTxt;

            const productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.innerText = products[i].name;

            const productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.innerText = products[i].description;

        }
    })
}



