document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container.swiper');
    if (!container) return; // no hay carrusel en esta página

    if (typeof Swiper === 'undefined') {
        console.warn('Swiper no está cargado. Asegúrate de incluir la librería antes de este script.');
        return;
    }

    new Swiper(container, {
        slidesPerView: 1,
        centeredSlides: false,
        spaceBetween: 24,
        loop: true,
        navigation: {
            nextEl: container.querySelector('.swiper-button-next'),
            prevEl: container.querySelector('.swiper-button-prev'),
        },
        pagination: {
            el: container.querySelector('.swiper-pagination'),
            clickable: true,
        },
        breakpoints: {
            768: { slidesPerView: 2, centeredSlides: false, spaceBetween: 24 },
            1024:{ slidesPerView: 2, centeredSlides: false, spaceBetween: 32 }
        }
    });
});