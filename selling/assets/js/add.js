const form = document.querySelector("form");
const search = document.querySelector(".search");
const sort = document.querySelector(".sort ");
const tBody = document.querySelector("tbody");
const inputs = document.querySelectorAll("input");
const id = new URLSearchParams(window.location.search).get("id");
const BASE_URL = `http://localhost:8080`;

let products = [];
let copyProduct = [];
async function getAllData() {
  try {
    const res = await axios(`${BASE_URL}/products`);
    console.log(res.data);
    products = res.data;
    copyProduct = [...res.data];
    drawTable(products);
  } catch (error) {
    console.log(error);
  }
}
getAllData();

async function fillForm() {
  const res = await axios(`${BASE_URL}/products/${id}`);
  inputs[0].value = res.data.title;
  inputs[1].value = res.data.desc;
  inputs[2].value = res.data.imgUrl;
}
if (id) {
  fillForm();
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let obj = {
    title: inputs[0].value,
    desc: inputs[1].value,
    imgUrl: `../image${inputs[2].value.split("\\"[1])}`,
  };
  if (!id) {
    console.log(obj);
    axios.post(`${BASE_URL}/products`, obj);
  }
  inputs.forEach((item) => (item.value = ""));
});

function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    const trElement = document.createElement("tr");
    trElement.innerHTML = `
    <td><img src="${element.imgUrl}" ></td>
    <td>${element.title}</td>
    <td>${element.desc}</td>
   <td><i class="fa-solid fa-trash" onclick=deleteTr("${element.id}",this)></i></td>
    `;
    tBody.append(trElement);
  });
}

async function deleteTr(id, btn) {
  console.log(id);
  try {
    if (confirm("silmek isdeyirsen??")) {
      await axios.delete(`${BASE_URL}/products/${id}`);
    }
  } catch (error) {
    console.log(error);
  }
}

search.addEventListener("input", async function (e) {
  try {
    console.log(e.target.value);
    const res = await axios(`${BASE_URL}/products`);
    let filtered = res.data.filter((item) => {
      return item.title
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    });
    drawTable(filtered);
  } catch (error) {
    console.log(error);
  }
});

sort.addEventListener("click", function () {
  let sorted;
  if (this.innerText === "Ascending") {
    sorted = products.sort((a, b) =>
      a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase())
    );
    this.innerText = "Descending";
  } else if (this.innerText === "Descending") {
    sorted = products.sort((a, b) =>
      b.title.toLocaleLowerCase().localeCompare(a.title.localeCompare())
    );
    this.innerText = "Default";
  } else {
    sorted = copyProduct;
    this.innerText = "Ascending";
  }
  //   console.log(sorted);
  drawTable(sorted);
});
