document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.container.swiper', {
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 24,
        loop: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            480: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024:{ slidesPerView: 1 }
        }
    });
});