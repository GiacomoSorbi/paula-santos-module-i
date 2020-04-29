
// We ensure that the HTML is parsed when we attach listeners 

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', attachListeners)
} else {
    attachListeners()
}

function attachListeners() {

    // We want to listen to remove item from cart buttons so keep the cart updated

    const removeCartItemButtons = document.querySelectorAll('.btn-danger')

    removeCartItemButtons.forEach(button => button.addEventListener('click', removeCartItem))

    // We need to know if the user has typed a new quantity so we update the cart acordingly 

    const quantityInputs = document.querySelectorAll('.cart-quantity-input')

    quantityInputs.forEach(input => input.addEventListener('change', quantityChanged))

    //If the user clicks on the add to  cart button the cart list is updated 

    const addToCartButtons = document.querySelectorAll('.shop-item-button')

    addToCartButtons.forEach(button => button.addEventListener('click', addToCartClicked))


    // We want to let users know if the purchase has been done when they clicks on the purchase button

    const purchaseButton = document.querySelector('.btn-purchase')
    purchaseButton.addEventListener('click', purchaseClicked)
}

function purchaseClicked() {

    // Purchase notification for users

    alert('Thank you for your purchase')

    // Then empty the basquet/cart

    emptyTheCart()

    // And update the basquet/cart total amount

    updateCartTotal()
}

function emptyTheCart() {

    // We then remove all items that were listed in the basquet/cart

    const cartItems = document.querySelector('.cart-items')
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }

}

function removeCartItem(event) {

    // Removal of items from the basquet/cart when 'remove' button is clicked 

    const buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()

    // After this the basquet/cart amount is updated

    updateCartTotal()
}

function quantityChanged(event) {
    const input = event.target

    // If the input is not valid we just set it to one 

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }

    // If the quantity of any item changes, the total amount of the cart changes accordingly 

    updateCartTotal()
}

function addToCartClicked(event) {

    // Get the info of the item that has been added 

    const button = event.target
    const shopItem = button.parentElement.parentElement
    const title = shopItem.querySelector('.shop-item-title').innerText
    const price = shopItem.querySelector('.shop-item-price').innerText
    const imageSrc = shopItem.querySelector('.shop-item-image').src

    // Then send the info over this function so it can be created and added

    addItemToCart(title, price, imageSrc)

    // We update the total amount of the cart 

    updateCartTotal()
}

function itemAlreadyExists(title) {

    // We get the list of items already in the cart 

    const cartItems = document.getElementsByClassName('cart-items')[0]
    const cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    // And iterate over them to see if the parameter of the function already exists 

    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            return true
        }
    }
    return false
}

function addItemToCart(title, price, imageSrc) {

    // We use the helper function we just defined to avoid duplicates 

    if (itemAlreadyExists(title)) {
        alert('This item is already added to the cart')
        return
    }

    // We create the node that we'll insert in the DOM 

    const cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    const cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents

    // We get the cart and insert in it the new item 

    const cartItems = document.getElementsByClassName('cart-items')[0]
    cartItems.append(cartRow)

    // We also add buttons so the quantity can be changed and can be removed

    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {

    // We get the cart 

    const cartItemContainer = document.getElementsByClassName('cart-items')[0]

    // We need the items in the cart to sum their prices 

    const cartRows = cartItemContainer.getElementsByClassName('cart-row')

    // Variable in which we'll acumulate the prices 

    let total = 0

    // We iterate over the items 

    for (let i = 0; i < cartRows.length; i++) {

        // We store the quantity and price of each item

        const cartRow = cartRows[i]
        const priceElement = cartRow.getElementsByClassName('cart-price')[0]
        const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]

        // We need to calculate the raw price without the pound character

        const price = parseFloat(priceElement.innerText.replace('£', ''))

        // We can compute the total of each item using its price and quantity 

        const quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100

    // Finally we convert it into a string again 
    document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total
}



// Clear textarea of comment box on click
function clearContents(element) {
    element.value = '';
}

// Thank you message on Contact form
function FormJS() {
    let jFirst = document.getElementById("fname").value;
    alert("Thank you for getting in touch with us " + jFirst);
}
