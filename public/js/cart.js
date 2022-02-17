const cartDiv = document.getElementById("cart");
const listDiv = document.getElementById("cart-list");

const cartItems = localStorage.getItem("USER_CART");
if (cartItems) {
  const buyForm = document.createElement("form");
  buyForm.id = "cart-submit";
  buyForm.addEventListener("submit", clearCart);

  const buyBtn = document.createElement("button");
  buyBtn.type = "submit";
  buyBtn.innerHTML = "Buy Now!";

  buyForm.appendChild(buyBtn);

  const cartData = JSON.parse(cartItems);

  cartData.forEach((cartItem) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cartItem");
    cartItemDiv.id = cartItem._id;

    const titleSpan = document.createElement("span");
    titleSpan.innerText = cartItem.title;

    const endDiv = document.createElement("div");
    endDiv.id = "cart-item-end";

    const quantitySpan = document.createElement("span");
    quantitySpan.id = "quantity";
    quantitySpan.innerText = cartItem.quantity;

    const priceSpan = document.createElement("span");
    priceSpan.id = "price";
    priceSpan.innerText = `${cartItem.price}$`;

    const itemForm = document.createElement("form");
    itemForm.addEventListener("submit", () => removeCartItem(cartItem._id));

    const itemBtn = document.createElement("button");
    itemBtn.type = "submit";
    itemBtn.innerText = "X";

    itemForm.appendChild(itemBtn);

    endDiv.appendChild(quantitySpan);
    endDiv.appendChild(priceSpan);
    endDiv.appendChild(itemForm);

    cartItemDiv.appendChild(titleSpan);
    cartItemDiv.appendChild(endDiv);

    listDiv.appendChild(cartItemDiv);
  });

  listDiv.appendChild(buyForm);
} else {
  listDiv.innerHTML = "<h1>Your Cart is Empty!</h1>";
}

function clearCart(e) {
  e.preventDefault();
  listDiv.remove();
  cartDiv.innerText = "Thank you for buying our books!";
  localStorage.removeItem("USER_CART");
}

function removeCartItem(id) {
  const localData = localStorage.getItem("USER_CART");

  const cartItems = JSON.parse(localData);
  const cartItemToRemoveIndex = cartItems.findIndex((book) => {
    return book._id.toString() === id.toString();
  });

  const updatedCartItems = [...cartItems];
  updatedCartItems.splice(cartItemToRemoveIndex, 1);
  localStorage.setItem("USER_CART", JSON.stringify(updatedCartItems));
  document.getElementById(id).remove();
  if (updatedCartItems.length === 0) {
    localStorage.removeItem("USER_CART");
    listDiv.innerHTML = "<h1>Your Cart is Empty!</h1>";
  }
}
