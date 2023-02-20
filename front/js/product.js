const idProduct = new URL(location.href).searchParams.get("id");

async function getProduct(){
    const product = await fetch('http://localhost:3000/api/products/' + idProduct);
    return product.json();
}

function generateProduct() {
    getProduct().then( (product) => {

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

        
    })
}

const buttonAddToCart = document.querySelector("#addToCart");
buttonAddToCart.addEventListener("click", (event) => {

    const quantityChosen = document.getElementById("quantity").value;
    const colorChosen = document.getElementById("colors").value;

    let productChosen = {
        id: idProduct,
        quantity: quantityChosen,
        color: colorChosen,
    }

    let storedCart = JSON.parse(localStorage.getItem("cart"));

    if (storedCart) {
        const resultFind = storedCart.find(
            (property) => property.id === idProduct && property.color === colorChosen);
        if(resultFind) {
            let updatedQuantity =
            parseInt(productChosen.quantityChosen) + parseInt(resultFind.quantityChosen);
            resultFind.quantityChosen = updatedQuantity;
            localStorage.setItem("cart", JSON.stringify(storedCart));
        } else {
            storedCart.push(productChosen);
            localStorage.setItem("cart", JSON.stringify(storedCart));
        }

    } else {
        storedCart =[];
        storedCart.push(productChosen);
        localStorage.setItem("cart", JSON.stringify(storedCart));
    }

});
    
    




getProduct();

generateProduct();