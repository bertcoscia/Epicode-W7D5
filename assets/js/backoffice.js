const params = new URLSearchParams(window.location.search);
const id = params.get("productId");

// se id esiste, URL sarà uguale all'endpoint più id, altrimenti URL sarà solo l'endpoint
const URL = id ? "https://striveschool-api.herokuapp.com/api/product/" + id : "https://striveschool-api.herokuapp.com/api/product/";

// se id esiste, il metodo della fetch sarà PUT per modificare il prodotto, altrimenti sarà POST per creare un nuovo prodotto
const method = id ? "PUT" : "POST";

const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjk5NzdjMjM5YzAwMTUyZjRiM2MiLCJpYXQiOjE3MTgzNTIyNzksImV4cCI6MTcxOTU2MTg3OX0.iqJ9iKifEmv4QneeBjeH2alL6rTwRy3dLqfFcopl1co ";

const handleSubmit = event => {
  event.preventDefault();

  // creo riferimento al form
  const form = event.target;

  // creo un oggetto con i valori inseriti nel form
  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("productImg").value,
    price: document.getElementById("price").value
  };
  console.log(newProduct);

  fetch(URL, {
    method,
    // metto l'oggetto creato nel body del fetch
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error in the creation of the product");
      }
    })
    .then(createdProduct => {
      if (id) {
        alert(`Product: ${createdProduct.name} has been modified. Product ID: ${createdProduct._id}`);
      } else {
        alert(`Product: ${createdProduct.name} has been created. Product ID: ${createdProduct._id}`);
      }
      form.reset();
    })
    .catch(error => console.log(error));

  /* chiusura dell'handle submission */
};

window.addEventListener("DOMContentLoaded", () => {
  console.log(id);
  const form = document.querySelector("form");
  form.onsubmit = handleSubmit;

  const pageHead = document.getElementById("pageHead");
  const btnContainer = document.getElementById("btnContainer");

  // se id esiste, popolo i campi del form con i dati del prodotto
  if (id) {
    pageHead.innerText = "Modify product";
    fetch(URL, {
      headers: {
        Authorization: auth
      }
    })
      .then(response => response.json())
      .then(selectedProduct => {
        console.log(selectedProduct);

        // destrutturo l'oggetto
        const { name, description, brand, imageUrl, price } = selectedProduct;

        // metto i valori dell'oggetto dentro i campi del form
        document.getElementById("name").value = name;
        document.getElementById("description").value = description;
        document.getElementById("brand").value = brand;
        document.getElementById("productImg").value = imageUrl;
        document.getElementById("price").value = price;
      })
      .catch(error => console.log(error));

    // creo il bottone modify
    const modifyBtn = document.createElement("button");
    modifyBtn.className = "btn btn-primary px-3";
    modifyBtn.innerText = "Modify";
    btnContainer.appendChild(modifyBtn);

    // creo il bottone delete
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger px-3";
    deleteBtn.innerText = "Delete";
    btnContainer.appendChild(deleteBtn);

    /* chiusura IF */
  } else {
    pageHead.innerText = "Create product";

    // creo il bottone salva
    const saveBtn = document.createElement("button");
    saveBtn.className = "btn btn-primary px-3";
    saveBtn.innerText = "Save";
    btnContainer.appendChild(saveBtn);
  }

  /* chiusura window.addEventListener */
});
