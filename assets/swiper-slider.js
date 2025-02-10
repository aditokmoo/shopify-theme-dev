const initSwiper = () => {
    new Swiper('.swiper', {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: false,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        pagination: { el: ".swiper-pagination", clickable: true },
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
};