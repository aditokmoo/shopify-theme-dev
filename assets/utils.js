const messageTimeouts = new Map();

function showMessage(product) {
    const messageContainer = document.getElementById('response-message');
    if (!messageContainer) return;

    const options = product.options_with_values.reduce((acc, option) => {
        acc[option.name.toLowerCase()] = option.value;
        return acc;
    }, {});

    messageContainer.querySelector('.response-message__title').textContent = product.product_title;
    messageContainer.querySelector('.response-message__size').textContent = options.size || '';
    messageContainer.querySelector('.response-message__color').style.backgroundColor = options.color === 'Clear' ? '#fff' : options.color;
    messageContainer.querySelector('.response-message__color').style.borderColor = options.color === 'Clear' ? '#ddd' : options.color;
    messageContainer.querySelector('.response-message__image').src = product.image;

    messageContainer.style.display = 'flex';

    if (messageTimeouts.has(messageContainer)) {
        clearTimeout(messageTimeouts.get(messageContainer));
    }

    const newTimeout = setTimeout(() => {
        messageContainer.style.display = 'none';
        messageTimeouts.delete(messageContainer);
    }, 3000);

    messageTimeouts.set(messageContainer, newTimeout);
}