const form = document.querySelector("form");
const search = document.querySelector(".search input");
const sort = document.querySelector(".sort button");
const tBody = document.querySelector("tbody");
const inputs = document.querySelectorAll("input");
const id = new URLSearchParams(window.location.search).get("id");
const BASE_URL = `http://localhost:8080`;

async function getAllData() {
  try {
    const res = await axios(`${BASE_URL}/products`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}
getAllData();

async function fillForm() {
  const res = await axios(`${BASE_URL}/products/${id}`);
  inputs[0].value = res.data.name;
  inputs[1].value = res.data.desc;
  inputs[2].value = res.data.imgUrl;
}
if (id) {
  fillForm();
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let obj = {
    name: inputs[0].value,
    desc: inputs[1].value,
    imgUrl: `../img${inputs[2].value.split("\\"[1])}`,
  };
  if (!id) {
    console.log(obj);
    axios.post(`${BASE_URL}`, obj);
  }
  inputs.forEach((item) => (item.value = ""));
});

function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach(element => {
    const trElement=document.createElement("tr")
    trElement.innerHTML=`
    <td><img src="${element.imgUrl}" ></td>
    <td>${element.title}</td>
    <td>${element.desc}</td>
    <td><i class="fa-solid fa-trash onclick=deleteTr"></i></td>
    `
  });
}
