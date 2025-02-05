document.addEventListener("DOMContentLoaded", function () {
    const bestSellers = document.querySelectorAll('.best-sellers__item');
    const selectedProducts = [];

    bestSellers.forEach(product => {
        const productId = product.id;
        const sizeSelect = product.querySelector('select');
        const colorSelects = product.querySelectorAll('.product-color-filter__input');
        const variantData = JSON.parse(product.dataset.variants);

        let defaultColor = null;
        if (colorSelects.length > 0) {
            defaultColor = colorSelects[0].value;
            colorSelects[0].checked = true;
            colorSelects[0].closest('label').classList.add('active')
        }

        let productIndex = selectedProducts.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            selectedProducts.push({
                id: productId,
                size: sizeSelect.value,
                color: defaultColor
            });
            productIndex = selectedProducts.length - 1;
        }

        function updateSizeOptions(selectedColor) {
            const availableSizes = variantData
                .filter(v => v.color.toLowerCase() === selectedColor.toLowerCase() && v.available === 'true');

            sizeSelect.querySelectorAll("option").forEach(option => {
                const isAvailable = availableSizes.some(sizeObj =>
                    sizeObj.size.toLowerCase() === option.value.toLowerCase() && sizeObj.available
                );

                option.disabled = !isAvailable;
            });

            if (!availableSizes.includes(sizeSelect.value)) sizeSelect.value = availableSizes[0]?.size;
            if (availableSizes.length === 0) {
                sizeSelect.innerHTML = `<option value="">None</option>`;
                sizeSelect.disabled = true;
            }
        }

        updateSizeOptions(defaultColor);

        sizeSelect.addEventListener("change", function () {
            selectedProducts[productIndex].size = this.value;
        });

        colorSelects.forEach(colorSelect => {
            colorSelect.addEventListener("change", function () {
                if (this.checked) {
                    colorSelects.forEach(cs => cs.closest('label').classList.remove('active'));
                    const checked = this.closest('label')
                    checked.classList.add('active')
                    selectedProducts[productIndex].color = this.value;
                    updateSizeOptions(this.value);
                }
            });
        });
    });

    new Swiper('.swiper', {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: false,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        breakpoints: {
            1200: { slidesPerView: 4 },
            850: { slidesPerView: 3 },
            450: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});