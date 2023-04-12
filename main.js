const categoryList = document.querySelector(".categories");
const productList = document.querySelector(".products");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const modal = document.getElementById("modal-wrappers");
const modalList = document.querySelector(".modal-list");



document.addEventListener("DOMContentLoaded", () => {
    fetchCategories();
    fetchProducts();
})

function fetchCategories() {
    fetch("https://api.escuelajs.co/api/v1/categories")
        .then(response => response.json())
        .then(data => data.slice(0, 5).forEach((category) => {
            const categoryDiv = document.createElement("div")
            categoryDiv.className = ("category");
            categoryDiv.innerHTML = ` <img src="${category.image}" , alt="">
           <span>${category.name}</span>`;
            categoryList.appendChild(categoryDiv);
        }))
        .catch(error => console.log(error));
}

function fetchProducts() {
    fetch("https://api.escuelajs.co/api/v1/products")
        .then(response => response.json())
        .then(data => data.slice(1, 50).forEach((product) => {
            const productDiv = document.createElement("div")
            productDiv.className = ("product");
            productDiv.innerHTML = `<img src="${product.images[0]}" alt="">
        <p class="product-title">${product.title}</p>
        <p class="product-category">${product.category.name}</p>
        <div class="product-action">
            <p>${product.price}$</p> 
            <button onclick="sepeteEkle({id:'${product.id}',name:'${product.title}',fiyat:'${product.price}',İmage:'${product.images[0]}', amount:1})">Sepete Ekle</button>`
            productList.appendChild(productDiv)


        }))
        .catch();

}

const basket = []

const addList = () => {
    basket.forEach((product) => {
        const listItem = document.createElement("div");
        listItem.className = ("list-item");
        listItem.innerHTML = `<img id="delete" src="./img/Close-item.png"
    <div><img src="${product.İmage}" alt=""></div>
    <h3>${product.name}</h3>
    <h3>${product.fiyat}</h3>
    <p>Miktar: ${product.amount}</p>
    `;
        modalList.appendChild(listItem)


    });

};

modalList.addEventListener("click", handleClick);

function handleClick(e) {
    const element = e.target;
    const del = element.parentElement

    del.remove();




}


openBtn.addEventListener("click", () => {
    toggleModal();
    addList();
});


closeBtn.addEventListener("click", () => {
    toggleModal();
    modalList.innerHTML = ""
});





function toggleModal() {
    modal.classList.toggle("active");
}



function sepeteEkle(product) {
    const findItem = basket.find((i) => i.id === product.id);
    if (findItem) {
        findItem.amount += 1;
    } else {
        basket.push(product);

    }
}

