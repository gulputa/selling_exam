const navBar = document.querySelector("nav");
const menuIcon = document.querySelector(".menu i");
const cards = document.querySelector(".cards");
const header = document.querySelector(".header-bottom");
const BASE_URL = `http://localhost:8080`;

menuIcon.addEventListener("click", function () {
  navBar.classList.toggle("show");
  this.className === "fa-solid fa-bars"
    ? (this.className = "fa-solid fa-x")
    : (this.className = "fa-solid fa-bars");
});
let products = [];
async function getAllData() {
  try {
    const res = await axios(`${BASE_URL}/products`);
    console.log(res.data);
    products = res.data;
    drawCards(products);
  } catch (error) {
    console.log(error);
  }
}
getAllData();

function drawCards(data) {
  cards.innerHTML = "";
  data.forEach((element) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.innerHTML = `
        <img src="${element.imgUrl}" alt="">
        <h2>${element.title}</h2>
        <div class="card-icon">
            <i class="${element.iconStar}"></i>
            <p>${element.numberOne}</p>
            <i class="${element.iconHeart}"></i>
            <p>${element.numberTwo}</p>
        </div>
        <p>${element.desc}</p>
        <button class="cart">Cart</button>
        <button class="view">View</button>
        `;
    cards.append(cardElement);
  });
}

window.addEventListener("scroll", function () {
  header.classList.toggle("header-scroll", window.scrollY > 0);
});
