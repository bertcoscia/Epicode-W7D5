const URL = "https://striveschool-api.herokuapp.com/api/product/";
const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjk5NzdjMjM5YzAwMTUyZjRiM2MiLCJpYXQiOjE3MTgzNTIyNzksImV4cCI6MTcxOTU2MTg3OX0.iqJ9iKifEmv4QneeBjeH2alL6rTwRy3dLqfFcopl1co ";
const params = new URLSearchParams(window.location.search);
const id = params.get("productId");
const row = document.querySelector(".row");

console.log(id);

const fetchRequestedProduct = () => {
  fetch(URL + id, {
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
    .then(product => {
      console.log("requested product", product);

      // DOM MANIPULATION

      // creo il div .col che contiene l'immagine
      const colImg = document.createElement("div");
      colImg.className = "col-md-4";

      // creo img del prodotto
      const productImg = document.createElement("img");
      productImg.src = product.imageUrl;
      productImg.style.width = "100%";

      // creo il div .col che contiene il testo
      const colText = document.createElement("div");
      colText.className = "col-md-8 d-flex flex-column justify-content-evenly";

      // creo il titlo
      const title = document.createElement("h2");
      title.className = "mb-3";
      title.innerText = product.name;

      //creo il sub title
      const subTitle = document.createElement("small");
      subTitle.innerText = product.brand;

      // creo il testo della descrizione
      const descriptionText = document.createElement("p");
      descriptionText.innerText = product.description;

      // creo il prezzo
      const price = document.createElement("h5");
      price.innerText = `$${product.price}`;

      colText.append(title, subTitle, descriptionText, price);
      colImg.appendChild(productImg);
      row.append(colImg, colText);
    })
    .catch(error => console.log(error));
};

window.addEventListener("DOMContentLoaded", () => {
  fetchRequestedProduct();
});
