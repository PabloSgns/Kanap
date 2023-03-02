// Récupération de l'ID de commande et affichage dans la page de confirmation
function getOrderId(){
    const orderId = document.getElementById("orderId");
    orderId.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}

getOrderId();