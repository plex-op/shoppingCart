const btnCart = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const btnclose = document.querySelector("#cart-close");

btnCart.addEventListener("click", () => {
  cart.classList.add("cart-active");
});
btnclose.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

document.addEventListener("DOMContentLoaded", loadDress);

function loadDress() {
  loadContent();
}

function loadContent() {
  //remove items from cart
  let btnRemove = document.querySelectorAll(".cart-remove");
  btnRemove.forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });

  //Product item change event
  let qtyElement = document.querySelectorAll(".cart-quantity");
  qtyElement.forEach((input) => {
    input.addEventListener("change", changeQty);
  });

  //product cart

  let btnAddCart = document.querySelectorAll(".dress-price");
  // console.log(btnAddCart);
  btnAddCart.forEach((btn) => {
    btn.addEventListener("click", addCart);
  });

  updateTotal();
}

//remove item

function removeItem() {
  //   console.log("click");
  if (confirm("Are Your sure to Remove Cart Item")) {
    let title = this.parentElement.querySelector(".cart-dress-title").innerHTML;
    itemList = itemList.filter((el) => el.title != title);
    this.parentElement.remove();
    loadContent();
  }
}

//change qty

function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}

// add items only 1timme in cart

let itemList = [];
//product cart itemsAdded

function addCart() {
  let dress = this.parentElement;
  let title = dress.querySelector(".dress-title").innerHTML;
  let price = dress.querySelector(".dress-price").innerHTML;
  let imgSrc = dress.querySelector(".dress-img").src;

  // console.log(title, price, imgSrc);

  let newProduct = { title, price, imgSrc };

  //check product already exist in cart

  if (itemList.find((el) => el.title == newProduct.title)) {
    alert("product already in cart");
    return;
  } else {
    itemList.push(newProduct);
  }

  let newProductElement = createCartProduct(title, price, imgSrc);
  let element = document.createElement("div");
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector(".cart-content");

  cartBasket.append(element);
  loadContent();
}

function createCartProduct(title, price, imgSrc) {
  return `
  <div class="cart-box">
    <img src="${imgSrc}" alt="" class="cart-img" />
    <div class="details-box">
      <div class="cart-dress-title">${title}</div>
      <div class="price-box">
        <div class="cart-price">${price}</div>
        <div class="cart-amt">${price}</div>
      </div>
      <input type="number" value="1" class="cart-quantity" />
    </div>
    <i class="fa-solid fa-trash cart-remove" name="trash"></i>
  </div>`;
}

function updateTotal() {
  const cartItems = document.querySelectorAll(".cart-box");
  const totalValue = document.querySelector(".total-title");

  let total = 0;

  cartItems.forEach((product) => {
    let priceElement = product.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("₹", ""));
    let qty = product.querySelector(".cart-quantity").value;
    total += price * qty;
    product.querySelector(".cart-amt").innerText = "₹" + price * qty;
  });

  totalValue.innerHTML = "₹" + total;
}
