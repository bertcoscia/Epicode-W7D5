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
        // rendo visibile l'alert
        const failedSaveAlertPlaceholder = document.getElementById("failedSaveAlertPlaceholder");
        failedSaveAlertPlaceholder.classList.remove("d-none");
        // quando chiudo l'alert applico d-none
        const failedSaveAlertBtn = document.getElementById("failedSaveAlertBtn");
        failedSaveAlertBtn.onclick = () => {
          failedSaveAlertPlaceholder.classList.add("d-none");
        };
        throw new Error("Error in the creation of the product");
      }
    })
    .then(createdProduct => {
      if (id) {
        alert(`Product: ${createdProduct.name} successfully edited.`);
        window.location.assign("./backoffice.html");
      } else {
        // rendo visibile l'alert
        const successCreateAlert = document.getElementById("successCreateAlert");
        successCreateAlert.classList.remove("d-none");

        // genero il messaggio dell'alert
        const successCreateAlertText = document.getElementById("successCreateAlertText");
        successCreateAlertText.innerText = `Product "${createdProduct.name}" successfully created!`;

        // avvio il countdown per resettare il form e refreshare la pagina
        let seconds = 4;
        const successCreateAlertTimer = document.querySelector("#successCreateAlertTimer span");
        setInterval(() => {
          successCreateAlertTimer.innerText = seconds;
          seconds--;
          if (seconds < 0) {
            form.reset();
            location.reload();
          }
        }, 1000);
      }
    })
    .catch(error => console.log(error));

  /* chiusura dell'handle submission */
};

const deleteProduct = () => {
  fetch(URL, {
    method: "DELETE",
    headers: {
      Authorization: auth
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Couldn't delete the item");
      }
    })
    .then(deletedProduct => {
      // rendo visibile l'alert
      const successDeleteAlert = document.getElementById("successDeleteAlert");
      successDeleteAlert.classList.remove("d-none");

      // genero il messaggio dell'alert
      const successDeleteAlertText = document.getElementById("successDeleteAlertText");
      successDeleteAlertText.innerText = `Product "${deletedProduct.name}" successfully deleted.`;

      // avvio il countdown per reindirizzare l'utente alla homepage
      let seconds = 4;
      const successDeleteAlertTimer = document.querySelector("#successDeleteAlertTimer span");
      setInterval(() => {
        successDeleteAlertTimer.innerText = seconds;
        seconds--;
        if (seconds < 0) {
          window.location.assign("./");
        }
      }, 1000);
    })
    .catch(error => console.log(error));
};

window.addEventListener("DOMContentLoaded", () => {
  console.log(id);
  const form = document.querySelector("form");
  form.onsubmit = handleSubmit;

  const pageHead = document.getElementById("pageHead");
  const btnContainer = document.getElementById("btnContainer");

  // se id esiste, popolo i campi del form con i dati del prodotto
  if (id) {
    pageHead.innerText = "Edit product";
    fetch(URL, {
      headers: {
        Authorization: auth
      }
    })
      .then(response => response.json())
      .then(selectedProduct => {
        console.log(selectedProduct);

        // salvo il prodotto selezionato nell'oggetto
        selectedProductObj = selectedProduct;

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

    // creo il bottone delete
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger px-3";
    deleteBtn.innerText = "Delete";
    deleteBtn.setAttribute("id", "deleteBtn");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.addEventListener("click", () => {
      // rendo visibile l'alert
      const deleteAlertPlaceholder = document.getElementById("deleteAlertPlaceholder");
      deleteAlertPlaceholder.classList.remove("d-none");
      const deleteAlertBtn = document.getElementById("deleteAlertBtn");
      const deleteAlertDismissBtn = document.getElementById("deleteAlertDismissBtn");
      deleteAlertDismissBtn.addEventListener("click", () => {
        deleteAlertPlaceholder.classList.add("d-none");
      });

      // aggiungo onclick al btn delete per fare il submit
      deleteAlertBtn.onclick = () => {
        deleteAlertPlaceholder.classList.add("d-none");
        deleteProduct();
      };
    });
    btnContainer.appendChild(deleteBtn);

    // creo il bottone edit
    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-primary px-3";
    editBtn.innerText = "Edit";
    editBtn.setAttribute("id", "editBtn");
    editBtn.setAttribute("type", "button");

    editBtn.addEventListener("click", () => {
      // rendo visibile l'alert
      const editAlertPlaceholder = document.getElementById("editAlertPlaceholder");
      editAlertPlaceholder.classList.remove("d-none");

      // aggiungo onclick al btn edit per nascondere l'alert e modificare il prodotto
      const editAlertBtn = document.getElementById("editAlertBtn");
    });
    btnContainer.appendChild(editBtn);

    /* chiusura IF */
  } else {
    pageHead.innerText = "Create product";

    // creo il bottone reset
    const resetBtn = document.createElement("button");
    resetBtn.className = "btn btn-warning px-3";
    resetBtn.innerText = "Reset";
    resetBtn.setAttribute("id", "resetBtn");
    resetBtn.setAttribute("type", "button");

    resetBtn.addEventListener("click", () => {
      // rendo visibile l'alert
      const resetAlertPlaceholder = document.getElementById("resetAlertPlaceholder");
      resetAlertPlaceholder.classList.remove("d-none");

      // aggiungo onclick al btn reset per nascondere l'alert e resettare il form
      const resetAlertBtn = document.getElementById("resetAlertBtn");
      resetAlertBtn.onclick = () => {
        resetAlertPlaceholder.classList.add("d-none");
        form.reset();
      };
      const resetAlertDismissBtn = document.getElementById("resetAlertDismissBtn");

      // nascondo l'alert quando si clicca il pulsante dismiss
      resetAlertDismissBtn.onclick = () => {
        resetAlertPlaceholder.classList.add("d-none");
      };
    });
    btnContainer.appendChild(resetBtn);

    // creo il bottone salva
    const saveBtn = document.createElement("button");
    saveBtn.className = "btn btn-success px-3";
    saveBtn.innerText = "Save";
    saveBtn.setAttribute("id", "saveBtn");
    saveBtn.setAttribute("type", "button");
    saveBtn.addEventListener("click", () => {
      // rendo visibile l'alert
      const saveAlertPlaceholder = document.getElementById("saveAlertPlaceholder");
      saveAlertPlaceholder.classList.remove("d-none");
      const saveAlertBtn = document.getElementById("saveAlertBtn");

      // aggiungo onclick al btn save per fare il submit
      saveAlertBtn.onclick = () => {
        saveAlertPlaceholder.classList.add("d-none");
        form.requestSubmit();
      };

      const saveAlertDismissBtn = document.getElementById("saveAlertDismissBtn");

      // nascondo l'alert quando si clicca il pulsante dismiss
      saveAlertDismissBtn.onclick = () => {
        resetAlertPlaceholder.classList.add("d-none");
      };
    });
    btnContainer.appendChild(saveBtn);
  }

  /* chiusura window.addEventListener */
});
