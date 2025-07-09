const cartItems = {};
const cartList = document.getElementById("cart-items");
const cartTotal = document.querySelector(".cart-total");

function getPrice(name, quantity) {
  if (name === "Hash Dry") {
    // Prix dégressif : 6€/g jusqu'à 5g, 5€/g au-delà
    return quantity <= 5 ? quantity * 6 : (5 * 6) + ((quantity - 5) * 5);
  }
  if (name === "Weed OG") {
    // 80€ les 10g -> prix au gramme arrondi
    return Math.ceil((quantity / 10) * 80);
  }
  // Pour autres produits, prix fixe exemple : 10€/g (à adapter)
  return quantity * 10;
}

function updateCart() {
  cartList.innerHTML = '';
  let total = 0;

  for (const name in cartItems) {
    const item = cartItems[name];
    const itemTotal = getPrice(name, item.quantity);
    total += itemTotal;

    const li = document.createElement("li");

    const itemText = document.createElement("span");
    itemText.className = "item-text";
    itemText.textContent = `${name} × ${item.quantity}g = ${itemTotal}€`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "🗑️";
    removeBtn.onclick = () => {
      item.quantity--;
      if (item.quantity <= 0) delete cartItems[name];
      updateCart();
    };

    li.appendChild(itemText);
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  }

  cartTotal.textContent = `Total : ${total}€`;
}

function copyCart() {
  let text = "🛒 Commande :\n";
  for (const name in cartItems) {
    const item = cartItems[name];
    const itemTotal = getPrice(name, item.quantity);
    text += `- ${name} × ${item.quantity}g = ${itemTotal}€\n`;
  }
  navigator.clipboard.writeText(text.trim());
  alert("Commande copiée 📋");
}

document.querySelectorAll(".add-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const product = btn.closest(".product");
    const name = product.dataset.name;
    const quantity = parseInt(product.querySelector(".quantity-select").value);

    if (!cartItems[name]) {
      cartItems[name] = { quantity };
    } else {
      cartItems[name].quantity += quantity;
    }

    updateCart();
  });
});