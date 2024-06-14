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
          card.className = "card mb-4 shadow h-100";

          // genero il linkImg per i dettagli
          const cardImgAnchor = document.createElement("a");
          cardImgAnchor.setAttribute("href", `./details.html?productId=${product._id}`);
          cardImgAnchor.className = "border-bottom border-light-subtle";

          // creo la top image cap
          const cardImg = document.createElement("img");
          cardImg.src = product.imageUrl;
          cardImg.style.width = "100%";
          cardImg.style.height = "300px";
          cardImg.style.objectFit = "contain";

          // creo il card body
          const cardBody = document.createElement("div");
          cardBody.className = "card-body d-flex flex-column";

          // creo il card title
          const cardTitle = document.createElement("a");
          cardTitle.innerText = product.name;
          cardTitle.setAttribute("href", `./details.html?productId=${product._id}`);
          cardTitle.className = "text-decoration-none link-dark h5";

          // creo il card subtitle
          const cardSubTitle = document.createElement("h6");
          cardSubTitle.innerText = product.brand;
          cardSubTitle.className = "text-secondary mt-2";

          // creo il card text
          const cardText = document.createElement("div");
          cardText.className = "card-text mb-2 line-clamp";
          cardText.innerText = product.description;

          // creo il card footer
          const cardFooter = document.createElement("div");
          cardFooter.className = "d-flex justify-content-between align-items-center mt-auto";

          // creo il prezzo
          const cardPrice = document.createElement("h6");
          cardPrice.innerText = `$${product.price}`;
          cardPrice.className = "border border-secondary-subtle rounded-pill text-center bg-warning px-3 py-1";

          // creo il button modifica
          const modifyBtn = document.createElement("a");
          modifyBtn.className = "btn btn-primary px-4";
          modifyBtn.innerText = "Edit";
          modifyBtn.setAttribute("href", `./backoffice.html?productId=${product._id}`);

          cardImgAnchor.appendChild(cardImg);
          cardFooter.append(modifyBtn, cardPrice);
          cardBody.append(cardTitle, cardSubTitle, cardText, cardFooter);
          card.append(cardImgAnchor, cardBody);
          col.appendChild(card);
          row.appendChild(col);
        });
      }
    })
    .catch(error => console.log(error));
};

const redirectCardImg = product => {
  window.location.assign(`./details.html/?productId=${product._id}`);
};

const redirectModifyBtn = product => {
  window.location.assign(`./backoffice.html/?productId=${product._id}`);
};

window.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});
