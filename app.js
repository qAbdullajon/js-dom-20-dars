let searchProduct = document.getElementById('searchProduct')
let prev = document.getElementById('prev')
let next = document.getElementById('next')
let data = []
let page = 1
let str = ""
let castum_per_page = 8

document.addEventListener('DOMContentLoaded', () => {
  getProduct()
})

async function getProduct() {
  let API = `https://fakestoreapi.com/products/?page=${page}&limit=${castum_per_page}`
  let response = await fetch(API)
  data = await response.json()
  displayFroduct()
}

let result = document.getElementById('result')
function displayFroduct() {
  result.innerHTML = ""
  let filteredData = data.filter(item => item.title.toUpperCase().includes(str))

  filteredData.forEach((item) => {
    result.innerHTML += `
        <div onclick="singleProduct(${item.id})" class="w-[23%] h-fit cursor-pointer overflow-hidden bg-[#2b3745] rounded-lg">
          <img class="" src="${item.image}" alt="">
          <div class="p-3 pt-2 pb-6">
            <h1 class="text-lg">${item.title}</h1>
            <p class="pt-2 text-lg">Price: $${item.price}</p>
          </div>
        </div>
    `
  })
}

searchProduct.addEventListener('input', (e) => {
  str = e.target.value.trim().toUpperCase()
  displayFroduct()
})

function singleProduct(id) {
  let main = document.getElementById('main')
  main.innerHTML = `
    <a href="./index.html" class="w-fit shadow-[0_0_10px_rgba(0,0,0,0.3)] px-3 py-1 text-xl text-white flex gap-3 items-center">
      <i class="fa-solid pt-1 fa-arrow-left-long"></i>
      <span>Back</span>
    </a>
    <div class="pt-7 flex gap-[3%] text-xl text-white items-center">
      <div class="w-[30%]">
        <img class="w-full" src="${data[id - 1].image}" alt="">
      </div>
      <div class="w-[67%]">
        <h2 class="text-4xl pb-4">${data[id - 1].title}</h2>
        <p class="text-sm">${data[id - 1].description[0].toUpperCase() + data[id - 1].description.slice(1)}</p>
        <p class="pt-8">Price: $${data[id - 1].price}</p>
        <p>Category: ${data[id - 1].category[0].toUpperCase() + data[id - 1].category.slice(1)}</p>
        <p>Rating rate: ${data[id - 1].rating.rate}</p>
        <p>Rating count: ${data[id - 1].rating.count}</p>
      </div>
    </div>
  `
}

prev.addEventListener('click', () => {
  if (page !== 1) {
    page--
    getProduct()
  }
})
next.addEventListener('click', () => {
  API = `https://fakestoreapi.com/products/?page=${page}&limit=${castum_per_page}`
  page++
  getProduct()
})
