const URL = "https://striveschool-api.herokuapp.com/api/product/";
const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjk5NzdjMjM5YzAwMTUyZjRiM2MiLCJpYXQiOjE3MTgzNTIyNzksImV4cCI6MTcxOTU2MTg3OX0.iqJ9iKifEmv4QneeBjeH2alL6rTwRy3dLqfFcopl1co ";

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
        /* DOM MANIPULATION */
      }
    })
    .catch(error => console.log(error));
};

window.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});
