const URL = "https://striveschool-api.herokuapp.com/api/product/";
const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjk5NzdjMjM5YzAwMTUyZjRiM2MiLCJpYXQiOjE3MTgzNTIyNzksImV4cCI6MTcxOTU2MTg3OX0.iqJ9iKifEmv4QneeBjeH2alL6rTwRy3dLqfFcopl1co ";
const container = document.querySelector(".container");
const row = document.querySelector(".row");

const fetchProducts = () => {
  fetch(URL, {
    headers: {
      Authorization: auth
    }
  })
    .then(response => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Couldn't get data");
      }
    })
    .then(requestedProducts => {
      console.log(requestedProducts);
      // se il risultato è un array vuoto comparirà un messaggio che dice che non ci sono prodotti
      if (requestedProducts.length === 0) {
        console.log("There are no products");
      } else {
        // DOM MANIPULATION
        requestedProducts.forEach(product => {
          // creo il div .col
          const col = document.createElement("div");
          col.className = "col-md-4";

          // creo il div .card
          const card = document.createElement("div");
          card.className = "card mb-4";

          // creo la top image cap
          const cardImg = document.createElement("img");
          cardImg.src = product.imageUrl;

          // creo il card body
          const cardBody = document.createElement("div");
          cardBody.className = "card-body";

          // creo il card title
          const cardTitle = document.createElement("h5");
          cardTitle.innerText = product.name;

          // creo il card subtitle
          const cardSubTitle = document.createElement("h6");
          cardSubTitle.innerText = product.brand;

          // creo il card text
          const cardText = document.createElement("div");
          cardText.className = "card-text";
          cardText.innerText = product.description;

          // creo il prezzo
          const cardPrice = document.createElement("small");
          cardPrice.innerText = `$${product.price}`;

          // creo il button modifica
          const modifyBtn = document.createElement("button");
          modifyBtn.className = "btn btn-primary";
          modifyBtn.innerText = "Modify";

          cardBody.append(cardTitle, cardSubTitle, cardText, cardPrice, modifyBtn);
          card.append(cardImg, cardBody);
          col.appendChild(card);
          row.appendChild(col);
        });
      }
    })
    .catch(error => console.log(error));
};

window.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});
