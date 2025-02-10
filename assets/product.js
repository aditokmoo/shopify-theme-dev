class Product {
    constructor(element) {
        this.element = element;
        this.id = element.id;
        this.sizeSelect = element.querySelector('select');
        this.colorSelects = element.querySelectorAll('.product-color-filter__input');
        this.variantData = JSON.parse(element.dataset.variants);
        this.selectedColor = this.initColor();
        this.initEventListeners();
        this.updateSizeOptions(this.selectedColor);
    }

    initColor() {
        if (this.colorSelects.length > 0) {
            this.colorSelects[0].checked = true;
            this.colorSelects[0].closest('label').classList.add('active');
            return this.colorSelects[0].value;
        }
        return null;
    }

    updateSizeOptions(selectedColor) {
        const availableSizes = this.variantData.filter(v => v.color.toLowerCase() === selectedColor.toLowerCase() && v.available === 'true');

        this.sizeSelect.querySelectorAll("option").forEach(option => {
            const isAvailable = availableSizes.some(sizeObj =>
                sizeObj.size.toLowerCase() === option.value.toLowerCase()
            );
            option.disabled = !isAvailable;
        });

        if (!availableSizes.some(sizeObj => sizeObj.size === this.sizeSelect.value)) {
            this.sizeSelect.value = availableSizes[0]?.size || "";
        }

        if (availableSizes.length === 0) {
            this.sizeSelect.innerHTML = `<option value="">None</option>`;
            this.sizeSelect.disabled = true;
        }
    }

    initEventListeners() {
        this.sizeSelect.addEventListener("change", () => {
            this.selectedSize = this.sizeSelect.value;
        });

        this.colorSelects.forEach(colorSelect => {
            colorSelect.addEventListener("change", () => {
                if (colorSelect.checked) {
                    this.colorSelects.forEach(cs => cs.closest('label').classList.remove('active'));
                    colorSelect.closest('label').classList.add('active');
                    this.selectedColor = colorSelect.value;
                    this.updateSizeOptions(this.selectedColor);
                }
            });
        });
    }
}