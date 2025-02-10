document.addEventListener("DOMContentLoaded", () => {
    const bestSellers = document.querySelectorAll('.best-sellers__item');
    const selectedProducts = [];

    bestSellers.forEach(productElement => {
        const product = new Product(productElement);
        selectedProducts.push(product);

        productElement.querySelectorAll('#add_to_cart').forEach(button => {
            button.addEventListener('click', async (event) => {
                event.preventDefault();

                const productId = button.dataset.productId;
                const quantity = button.dataset.quantity;
                const product = selectedProducts.find(p => p.id === productId);

                const variant = product.variantData.find(v =>
                    v.size.toLowerCase() === product.sizeSelect.value.toLowerCase() &&
                    v.color.toLowerCase() === product.selectedColor.toLowerCase() &&
                    v.available
                );

                Cart.addToCart(variant, quantity);

            });
        });
    });


    initSwiper();
});