document.addEventListener("DOMContentLoaded", () => {
    const bestSellers = document.querySelectorAll('.best-sellers__item');
    console.log(bestSellers)
    const selectedProducts = [];

    bestSellers.forEach(productElement => {
        const product = new Product(productElement);
        const allProducts = JSON.parse(productElement.dataset.variants);
        selectedProducts.push(product);

        productElement.querySelectorAll('#add_to_cart').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();

                const productId = button.dataset.productId;
                const quantity = button.dataset.quantity;
                const product = selectedProducts.find(p => p.id === productId);

                const variantId = product.variantData.find(v =>
                    v.size.toLowerCase() === product.sizeSelect.value.toLowerCase() &&
                    v.color.toLowerCase() === product.selectedColor.toLowerCase() &&
                    v.available
                );

                if (product) {
                    Cart.addToCart(variantId, quantity);
                }
            });
        });
    });


    initSwiper();
});