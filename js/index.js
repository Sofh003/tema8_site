const listURL = "https://kea-alt-del.dk/t7/api/categories";
const listContainer = document.querySelector(".cards_grid_forside");

function getCategories() {
  fetch(listURL)
    .then((res) => res.json())
    .then((data) => showCategories(data));
}

function showCategories(categories) {
  listContainer.innerHTML = "";

  categories.forEach((category) => {
    listContainer.innerHTML += `
      <a class="card_forside" href="productlist.html?category=${category.category}" >${category.category}</a>
    `;
  });
}

getCategories();
