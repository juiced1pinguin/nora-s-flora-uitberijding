
const productGrid = document.getElementById('producten');

function toonPlanten() {
  if (!productGrid) return; 
  
  productGrid.innerHTML = "";

  planten.forEach(plant => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    
    if (plant.groot) {
      productDiv.classList.add('product-large');
    }

    productDiv.innerHTML = `
      <img src="${plant.afbeelding}" alt="Foto van ${plant.naam}" loading="lazy">
      <p>${plant.naam}<br />€${plant.prijs.toFixed(2)}</p>
      <button class="cart-button" onclick="voegToe(${plant.id})">
        🛒 Bestellen
      </button>
    `;

    productGrid.appendChild(productDiv);
  });
}


if (productGrid) {
  toonPlanten();
}

function voegToe(id) {
  console.log("Plant met ID " + id + " is toegevoegd!");
  addToCart(id);
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = planten.find(p => p.id === id); // gemaakt was eerst plantjes
  
  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) {
    cartCountElement.innerText = `(${cart.length})`;
  }
}


function initializeCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;

  cart.forEach(item => {
    total += item.prijs;
  });

  console.log("Cart total: €" + total.toFixed(2));
  updateCartCount();
}


initializeCart();

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}


function displayCart() {
  const cartContainer = document.getElementById("cartItems");
  if (!cartContainer) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Je winkelmandje is leeg</p>";
    return;
  }

  let cartHTML = "<table><tr><th>Product</th><th>Prijs</th><th>Actie</th></tr>";
  let total = 0;

  cart.forEach((item, index) => {
    cartHTML += `
      <tr>
        <td>${item.naam}</td>
        <td>€${item.prijs.toFixed(2)}</td>
        <td><button onclick="removeFromCart(${index})">Verwijderen</button></td>
      </tr>
    `;
    total += item.prijs;
  });

  cartHTML += `</table><p><strong>Totaal: €${total.toFixed(2)}</strong></p>`;
  cartContainer.innerHTML = cartHTML;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', displayCart);
} else {
  displayCart();
}