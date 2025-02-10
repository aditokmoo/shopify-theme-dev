function showMessage(message, type = "success") {
    const messageContainer = document.createElement('div');
    messageContainer.className = `message message--${type}`;
    messageContainer.textContent = message;
    document.body.appendChild(messageContainer);

    setTimeout(() => {
        messageContainer.remove();
    }, 3000);
}
