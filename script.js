document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("productForm");
    const productList = document.getElementById("productList");
    let editMode = false;
    let currentProductElement;

    // Productos de ejemplo predefinidos con precios
    const initialProducts = [
        { name: "Manzanas", price: 2.50 },
        { name: "Leche", price: 1.30 },
        { name: "Pan", price: 0.85 },
        { name: "Huevos", price: 1.99 },
        { name: "Arroz", price: 3.20 }
    ];

    // Mostrar productos iniciales al cargar la página
    initialProducts.forEach(product => {
        addProduct(product.name, product.price);
    });

    productForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const productName = document.getElementById("productName").value;
        const productPrice = parseFloat(document.getElementById("productPrice").value);

        if (editMode) {
            currentProductElement.querySelector("span").textContent = productName;
            currentProductElement.querySelector(".price").textContent = `$${productPrice.toFixed(2)}`;
            document.getElementById("productName").value = '';
            document.getElementById("productPrice").value = '';
            editMode = false;
        } else {
            addProduct(productName, productPrice);
        }
        productForm.reset();
    });

    function addProduct(name, price) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${name}</span> <span class="price">$${price.toFixed(2)}</span>
            <div>
                <button class="edit">Editar</button>
                <button class="delete">Eliminar</button>
            </div>
        `;
        productList.appendChild(li);

        const editButton = li.querySelector(".edit");
        const deleteButton = li.querySelector(".delete");

        editButton.addEventListener("click", function () {
            document.getElementById("productName").value = li.querySelector("span").textContent;
            document.getElementById("productPrice").value = parseFloat(li.querySelector(".price").textContent.replace('$', ''));
            editMode = true;
            currentProductElement = li;
        });

        deleteButton.addEventListener("click", function () {
            li.remove();
        });
    }
});
