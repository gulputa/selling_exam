const navBar = document.querySelector("nav");
const menuIcon = document.querySelector(".menu i");
const cards = document.querySelector(".cards");
const BASE_URL = `http://localhost:8080`;

menuIcon.addEventListener("click", function () {
  navBar.classList.toggle("show");
  this.className === "fa-solid fa-bars"
    ? (this.className = "fa-solid fa-x")
    : (this.className = "fa-solid fa-bars");
});
let products=[]
async function getAllData() {
  try {
    const res = await axios(`${BASE_URL}/products`);
    console.log(res.data);
    products=res.data
    drawCards(products)
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
        cards.append(cardElement)
  });
}



// async function deleteCard(id, btn) {
//     try {
//       if (confirm("silmek isdeyirsen")) {
//         await axios.delete(`${BASE_URL}/${id}`);
//         btn.closest(".gym-card").remove();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   search.addEventListener("input", async function (e) {
//     try {
//       console.log(e.target.value);
//       const res = await axios(`${BASE_URL}`);
//       let filtered = res.data.filter((item) => {
//         return item.name
//           .toLocaleLowerCase()
//           .includes(e.target.value.toLocaleLowerCase());
//       });
//       drawCards(filtered);
//     } catch (error) {
//       console.log(error);
//     }
//   });
//   sort.addEventListener("click", function () {
//     let sorted;
//     if (this.innerText === "Ascending") {
//       sorted = productsData.sort((a, b) => a.price - b.price);
//       this.innerText = "Descending";
//     } else if (this.innerText === "Descending") {
//       sorted = productsData.sort((a, b) => b.price - a.price);
//       this.innerText = "Default";
//     } else {
//       sorted = copyProductsData;
//       this.innerText = "Ascending";
//     }
//     //   console.log(sorted);
//     drawCards(sorted);
//   });