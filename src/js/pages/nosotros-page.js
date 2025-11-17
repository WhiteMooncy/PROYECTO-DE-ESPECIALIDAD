// nosotros-page.js - Inicialización de la página "Nosotros"

// AOS Animation
AOS.init({ 
    once: true,
    duration: 800,
    offset: 100
});

// Team Carousel
document.addEventListener('DOMContentLoaded', () => {
    const teamCarousel = document.getElementById('teamCarousel');
    
    if (teamCarousel) {
        new Splide('#teamCarousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            pagination: true,
            arrows: true,
            autoplay: false,
            breakpoints: {
                1024: {
                    perPage: 2,
                    gap: '1.5rem',
                },
                768: {
                    perPage: 1,
                    gap: '1rem',
                }
            }
        }).mount();
    }
});

// Navbar Toggle
const navbarToggler = document.getElementById('navbar-toggler');
const navbarMenu = document.getElementById('navbar-menu');

if(navbarToggler){
    navbarToggler.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        navbarToggler.classList.toggle('active');
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-modern');
    if(navbar){
        if(window.scrollY > 50){
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});
