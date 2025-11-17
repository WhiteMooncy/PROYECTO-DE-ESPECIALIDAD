// index-page.js - Inicialización de la página principal

// AOS Animation
AOS.init({ 
    once: true,
    duration: 800,
    offset: 100
});

// Splide Carousel
if(document.querySelector('#projectsCarousel')){
    new Splide('#projectsCarousel', {
        type: 'loop',
        perPage: 2,
        gap: '2rem',
        autoplay: true,
        pauseOnHover: true,
        breakpoints: {
            768: { perPage: 1 }
        }
    }).mount();
}

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
