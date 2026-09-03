// ========================================
// FOOD ORDERING SYSTEM
// ========================================

let cart = [];


// ========================================
// ADD TO CART
// ========================================

function addToCart(name, price, image) {

    const existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    updateCart();
    openCart();
}


// ========================================
// UPDATE CART
// ========================================

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    // Check HTML elements
    if (!cartItems || !cartCount || !cartTotal) {
        console.error("Cart elements not found!");
        return;
    }

    // Clear cart
    cartItems.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;


    // ========================================
    // EMPTY CART
    // ========================================

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your cart is empty.
            </div>
        `;

        cartCount.textContent = "0";
        cartTotal.textContent = "$0.00";

        return;
    }


    // ========================================
    // DISPLAY CART ITEMS
    // ========================================

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        totalQuantity += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `
            <div class="cart-item-image">
                ${item.image}
            </div>

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    $${item.price.toFixed(2)}
                </p>

                <div class="quantity">

                    <button
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${index})">
                        Remove
                    </button>

                </div>

            </div>
        `;


        cartItems.appendChild(cartItem);

    });


    // ========================================
    // UPDATE TOTAL
    // ========================================

    cartCount.textContent = totalQuantity;

    cartTotal.textContent =
        "$" + total.toFixed(2);
}


// ========================================
// INCREASE QUANTITY
// ========================================

function increaseQuantity(index) {

    if (cart[index]) {

        cart[index].quantity++;

        updateCart();
    }
}


// ========================================
// DECREASE QUANTITY
// ========================================

function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    updateCart();
}


// ========================================
// REMOVE ITEM
// ========================================

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }

    cart.splice(index, 1);

    updateCart();
}


// ========================================
// OPEN CART
// ========================================

function openCart() {

    const sidebar =
        document.getElementById("cart-sidebar");

    const overlay =
        document.getElementById("cart-overlay");


    if (sidebar) {
        sidebar.classList.add("open");
    }

    if (overlay) {
        overlay.classList.add("show");
    }
}


// ========================================
// CLOSE CART
// ========================================

function closeCart() {

    const sidebar =
        document.getElementById("cart-sidebar");

    const overlay =
        document.getElementById("cart-overlay");


    if (sidebar) {
        sidebar.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("show");
    }
}


// ========================================
// CATEGORY FILTER
// ========================================

function filterCategory(category, button) {

    const cards =
        document.querySelectorAll(".food-card");

    const buttons =
        document.querySelectorAll(".category-btn");


    // Remove active class
    buttons.forEach(btn => {
        btn.classList.remove("active");
    });


    // Add active class
    if (button) {
        button.classList.add("active");
    }


    // Filter food
    cards.forEach(card => {

        const cardCategory =
            card.getAttribute("data-category");


        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }

    });
}


// ========================================
// SEARCH FOOD
// ========================================

function searchFood() {

    const searchInput =
        document.getElementById("search-input");


    if (!searchInput) {
        return;
    }


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(".food-card");


    cards.forEach(card => {

        const titleElement =
            card.querySelector("h3");

        const descriptionElement =
            card.querySelector(".food-info p");


        const foodName =
            titleElement
                ? titleElement.textContent.toLowerCase()
                : "";


        const description =
            descriptionElement
                ? descriptionElement.textContent.toLowerCase()
                : "";


        if (
            foodName.includes(search) ||
            description.includes(search)
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }

    });
}


// ========================================
// PLACE ORDER
// ========================================

function placeOrder() {

    // Check empty cart
    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add some food first."
        );

        return;
    }


    // Calculate total
    let total = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;

    });


    // Order success
    alert(
        "Order placed successfully!\n\n" +
        "Total: $" + total.toFixed(2)
    );


    // Clear cart
    cart = [];


    // Update cart
    updateCart();


    // Close cart
    closeCart();
}


// ========================================
// INITIALIZE
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    updateCart();

});