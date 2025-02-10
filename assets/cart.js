class Cart {
    static async addToCart(variant, quantity) {
        console.log(variant)
        const data = {
            items: [
                {
                    id: variant.variantId,
                    quantity: +quantity,
                }
            ]
        };

        try {
            const response = await fetch('/cart/add.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                alert('No more items in stock');
                throw new Error('Network response was not ok')
            }

            const responseData = await response.json();
            console.log('Added to cart:', responseData);

            showMessage(responseData?.items[0], 'success');
            return responseData;
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }
}