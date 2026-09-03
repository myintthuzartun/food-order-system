let cart = [];

// ===============================
// ADD TO CART
// ===============================

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


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    // Safety check
    if (!cartItems || !cartCount || !cartTotal) {
        return;
    }


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartCount.textContent = "0";

        cartTotal.textContent = "$0.00";

        return;
    }


    let total = 0;
    let quantity = 0;


    cart.forEach(function(item, index) {

        total +=
            item.price * item.quantity;

        quantity += item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

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

            </div>

        `;
    });


    cartCount.textContent = quantity;

    cartTotal.textContent =
        "$" + total.toFixed(2);
}


// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();
}


// ===============================
// REMOVE ITEM
// ===============================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// ===============================
// OPEN CART
// ===============================

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


// ===============================
// CLOSE CART
// ===============================

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


// ===============================
// FILTER FOOD
// ===============================

function filterFood(category) {

    const foods =
        document.querySelectorAll(".food-card");


    foods.forEach(function(food) {

        const foodCategory =
            food.getAttribute("data-category");


        if (
            category === "all" ||
            foodCategory === category
        ) {

            food.style.display = "block";

        } else {

            food.style.display = "none";

        }

    });
}


// ===============================
// SEARCH FOOD
// ===============================

function searchFood() {

    const input =
        document.getElementById("search-input");


    if (!input) {
        return;
    }


    const search =
        input.value.toLowerCase();


    const foods =
        document.querySelectorAll(".food-card");


    foods.forEach(function(food) {

        const name =
            food.querySelector("h3")
                .textContent
                .toLowerCase();


        if (name.includes(search)) {

            food.style.display = "block";

        } else {

            food.style.display = "none";

        }

    });
}


// ===============================
// GO TO CHECKOUT
// ===============================

function goToCheckout() {

    // Check cart
    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    // Save cart
    localStorage.setItem(
        "foodieCart",
        JSON.stringify(cart)
    );


    // Go checkout page
    window.location.href = "checkout.html";
}


// ===============================
// INITIALIZE
// ===============================

updateCart();