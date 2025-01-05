let cart = [];
const products = [
    { name: 'Product 1', price: 29.99 },
    { name: 'Product 2', price: 49.99 }
];

// Event listeners for adding products to the cart
document.getElementById('addToCart1').addEventListener('click', function() {
    const quantity = parseInt(document.getElementById('quantity1').value);
    addToCart(products[0], quantity);
});

document.getElementById('addToCart2').addEventListener('click', function() {
    const quantity = parseInt(document.getElementById('quantity2').value);
    addToCart(products[1], quantity);
});

// Function to add products to the cart
function addToCart(product, quantity) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name: product.name, price: product.price, quantity: quantity });
    }
    updateCart();
    showNotification(`${product.name} added to cart!`);
}

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
        
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.style.width = '50px';
        quantityInput.onchange = () => updateQuantity(item.name, parseInt(quantityInput.value));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(item.name);
        
        li.appendChild(quantityInput);
        li.appendChild(removeButton);
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    document.getElementById('totalPrice').textContent = `Total: $${total.toFixed(2)}`;
}


function updateQuantity(productName, newQuantity) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity = newQuantity;
        if (newQuantity <= 0) {
            removeFromCart(productName);
        } else {
            updateCart();
        }
    }
}


function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}


function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'notification';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A1'];
let currentColorIndex = 0;

function changeBackgroundColor() {
    document.querySelector('.background').style.backgroundColor = colors[currentColorIndex];
    currentColorIndex = (currentColorIndex + 1) % colors.length;
}


setInterval(changeBackgroundColor, 3000);
