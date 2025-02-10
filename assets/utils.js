function showMessage(product) {
    const messageContainer = document.getElementById('response-message');
    if (!messageContainer) return;

    console.log(product)

    const options = product.options_with_values.reduce((acc, option) => {
        acc[option.name.toLowerCase()] = option.value;
        return acc;
    }, {});

    console.log(options);

    // Dinamički postavi podatke
    messageContainer.querySelector('.response-message__title').textContent = product.product_title;
    messageContainer.querySelector('.response-message__size').textContent = options.size
    messageContainer.querySelector('.response-message__color').style.backgroundColor = options.color === 'Clear' ? '#fff' : options.color;
    messageContainer.querySelector('.response-message__color').style.borderColor = options.color === 'Clear' ? '#ddd' : options.color;
    messageContainer.querySelector('.response-message__image').src = product.image;

    // Prikazivanje poruke
    messageContainer.style.display = 'flex';

    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 60000);
}