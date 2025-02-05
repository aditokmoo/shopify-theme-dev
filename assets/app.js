document.addEventListener("DOMContentLoaded", function () {
    const bestSellers = document.querySelectorAll('.best-sellers__item');
    const selectedProducts = [];

    bestSellers.forEach(product => {
        const productId = product.id;
        const sizeSelect = product.querySelector('select');
        const colorSelects = product.querySelectorAll('.product-color-filter__input');
        const variantData = JSON.parse(product.dataset.variants); // Čita JSON s varijantama

        let defaultColor = null;
        if (colorSelects.length > 0) {
            defaultColor = colorSelects[0].value;
            colorSelects[0].checked = true;
            colorSelects[0].closest('label').classList.add('active')
            console.log(colorSelects)
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
                .filter(v => v.color.toLowerCase() === selectedColor.toLowerCase())
                .map(v => v.size);

            sizeSelect.querySelectorAll("option").forEach(option => {
                if (availableSizes.includes(option.value)) {
                    option.disabled = false;
                } else {
                    option.disabled = true;
                }
            });

            // Postavi default size ako je trenutni disabled
            if (!availableSizes.includes(sizeSelect.value)) {
                sizeSelect.value = availableSizes[0] || "";
            }
        }

        updateSizeOptions(defaultColor);

        sizeSelect.addEventListener("change", function () {
            selectedProducts[productIndex].size = this.value;
            console.log("Updated selectedProducts:", selectedProducts);
        });

        colorSelects.forEach(colorSelect => {
            colorSelect.addEventListener("change", function () {
                if (this.checked) {
                    colorSelects.forEach(cs => cs.closest('label').classList.remove('active'));
                    const checked = this.closest('label')
                    checked.classList.add('active')
                    selectedProducts[productIndex].color = this.value;
                    updateSizeOptions(this.value);
                    console.log("Updated selectedProducts:", selectedProducts);
                }
            });
        });
    });

    console.log("Initial selectedProducts:", selectedProducts);

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
            750: { slidesPerView: 3 },
            400: { slidesPerView: 2 },
            300: { slidesPerView: 1 },
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

});
