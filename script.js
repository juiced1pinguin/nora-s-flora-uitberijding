const productGrid = document.getElementById('producten');

function toonPlanten() {
  productGrid.innerHTML = "";

  planten.forEach(plant => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    
    if (plant.groot) {
      productDiv.classList.add('product-large');
    }

    productDiv.innerHTML = `
      <img src="${plant.afbeelding}" alt="Foto van ${plant.naam}" loading="lazy">
      <p>${plant.naam}<br />${plant.prijs}</p>
      <button class="cart-button" onclick="voegToe(${plant.id})">
        🛒 Bestellen
      </button>
    `;

    productGrid.appendChild(productDiv);
  });
}

toonPlanten();

function voegToe(id) {
    console.log("Plant met ID " + id + " is toegevoegd!");
}