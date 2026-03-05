console.log("hentet");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("id:", id);

//const id = 1528;
const productURL = "https://kea-alt-del.dk/t7/api/products/" + id;
const productcontainer = document.querySelector("#productContainer");

function getData() {
  fetch(productURL).then((res) => res.json().then((data) => show(data)));
}

function show(data) {
  productcontainer.innerHTML = `

       <div class="container_card">
            <div class="card_product">
                <img src="https://kea-alt-del.dk/t7/images/webp/640/${id}.webp" alt="billede af sko" class="img_product">
                <div class="container">
                    <h3>${data.brandname}</h3>
                    <p>${data.productdisplayname}</p>
                    <p>${data.price} kr.</p>
                    <a href="product.html" class="button">

                        Læg i kurv
                    </a>
                    
                </div>
            </div>

        </div>

  `;
}

getData();
