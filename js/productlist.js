const params = new URLSearchParams(window.location.search);
const mycategory = params.get("category");
console.log(mycategory);

const listURL = `https://kea-alt-del.dk/t7/api/products?category=${mycategory}`;
const listContainer = document.querySelector(".card_productlist_grid");
const showAllBtn = document.querySelector("#showAllBtn");
const filterWomenBtn = document.querySelector("#filterWomenBtn");
const filterMenBtn = document.querySelector("#filterMenBtn");
function getProducts() {
  fetch(listURL)
    .then((res) => res.json())
    .then((products) => showProducts(products));
}

function showProducts(products) {
  // Tøm container først
  listContainer.innerHTML = "";

  // products er et array af objekter
  products.forEach((product) => {
    listContainer.innerHTML += `
      <div class="card_productlist ${product.discount > 0 ? "onSale" : ""} ${product.soldout === 1 ? "soldOut" : ""}">
          
          ${product.discount > 0 ? `<p class="badge">Tilbud</p>` : ""}
          ${product.soldout === 1 ? `<p class="badge soldout_badge">Udsolgt</p>` : ""}

          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}" class="img">
          
          <div class="container">
              <h3>${product.brandname ? product.brandname : "Ukendt brand"}</h3>
              <p>${product.productdisplayname}</p>
              <p>${product.price} kr.</p>
              
              <p class="stock_status">
                ${product.soldout === 1 ? "Udsolgt" : "På lager"}
              </p>

              <a href="product.html?id=${product.id}" class="button">
                  Læs mere
              </a>
          </div>
      </div>
    `;
  });
}

const sortByPriceBtn = document.querySelector("#sortByPriceBtn");
let allProducts = [];

function getProducts() {
  fetch(listURL)
    .then((res) => res.json())
    .then((products) => {
      allProducts = products;
      showProducts(allProducts);
    });
}

function sortByPriceAsc() {
  const sorted = [...allProducts].sort((a, b) => a.price - b.price);
  showProducts(sorted);
}

sortByPriceBtn.addEventListener("click", sortByPriceAsc);

function filterByGender(targetGender) {
  const filtered = allProducts.filter(
    (product) =>
      (product.gender || "").toLowerCase() === targetGender.toLowerCase(),
  );

  showProducts(filtered);
}

filterWomenBtn.addEventListener("click", () => filterByGender("Women"));

filterMenBtn.addEventListener("click", () => filterByGender("Men"));
showAllBtn.addEventListener("click", () => showProducts(allProducts));
getProducts();
