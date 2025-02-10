class Cart {
    static async addToCart(variantId, quantity) {
        const data = {
            items: [
                {
                    id: variantId,
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

            if (!response.ok) throw new Error('Network response was not ok');

            const responseData = await response.json();
            console.log('Added to cart:', responseData);
            return responseData;
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }
}