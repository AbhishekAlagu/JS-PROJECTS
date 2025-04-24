document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 69.99 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productlist = document.getElementById("product-list");
  const emptycart = document.getElementById("empty-cart");
  const carttotal = document.getElementById("cart-total");
  const totalprice = document.getElementById("total-price");
  const checkoutbtn = document.getElementById("checkout-btn");
  const cartitems = document.getElementById("cart-items");

  // Display products
  products.forEach((product) => {
    const productdiv = document.createElement("div");
    productdiv.classList.add("product");
    productdiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productlist.appendChild(productdiv);
  });

  // Event listener for adding products to cart (placed outside the loop)
  productlist.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productid = parseInt(e.target.getAttribute("data-id"));
      const selectedProduct = products.find((p) => p.id === productid);
      if (selectedProduct) addtocart(selectedProduct);
    }
  });

  function addtocart(product) {
    cart.push(product);
    savecart();
    rendercart();
  }

  function savecart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function rendercart() {
    cartitems.innerText = "";
    let total = 0;

    if (cart.length > 0) {
      emptycart.classList.add("hidden");
      carttotal.classList.remove("hidden");

      cart.forEach((item, index) => {
        total += item.price;
        const cartitem = document.createElement("div");
        cartitem.innerHTML = `<span>${item.name} - $${item.price.toFixed(
          2
        )}</span> 
        <button class="remove-btn" data-index="${index}">Remove</button>`;
        cartitems.appendChild(cartitem);
      });

      cartitems.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
          const index = parseInt(e.target.getAttribute("data-index"));
          cart.splice(index, 1);
          savecart();
          rendercart();
        }
      });

      totalprice.textContent = `$${total.toFixed(2)}`;
    } else {
      emptycart.classList.remove("hidden");
      carttotal.classList.add("hidden");
      totalprice.textContent = "$0.00";
    }
  }

  checkoutbtn.addEventListener("click", () => {
    cart.length = 0;
    savecart();
    alert("Checked out successfully!");
    rendercart();
  });
  rendercart();
});
