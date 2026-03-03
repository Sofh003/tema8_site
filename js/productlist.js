const params = new URLSearchParams(window.location.search);
const mycategory = params.get("category");
console.log(mycategory);

const listURL = `https://kea-alt-del.dk/t7/api/products?category=${mycategory}`;
const listContainer = document.querySelector(".card_productlist_grid");

function getProducts() {
  fetch(listURL).then((res) =>
    res.json().then((products) => showProducts(products)),
  );
}

function showProducts(products) {
  // Start med tom container
  listContainer.innerHTML = "";

  // products er et array af objekter
  products.forEach((product) => {
    listContainer.innerHTML += `
     
                <div class="card_productlist">
                    <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Avatar" class="img">
                    <div class="container">
                        <h3>${product.brandname}</h3>
                        <p>${product.productdisplayname}</p>
                        <p>${product.price} kr.</p>
                        <a href="product.html?id=${product.id}" class="button">
                            <p>Læs mere</p>
                        </a>
                    </div>
                </div>
    `;
  });
}

getProducts();
