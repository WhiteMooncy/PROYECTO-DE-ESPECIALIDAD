<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nosotros</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
    <link rel="stylesheet" href="../assets/css/nosotros.css?v=2">
</head>
<body ID="index-page" data-theme="represa">
    <?php include "../includes/header.php";?>
    <div class="presentationSection" data-aos="fade-right">
        <div class="presentationTextBox customFont whiteText">
            <div class="upperTextBox">
            <h2 class="title1 presentationTitle">¿Quiénes Somos?</h2>
            <p class="text1 presentationText">
                Somos el equipo responsable de la gestión, operación y mantenimiento de la Represa Valle Azul. Nuestra labor combina ingeniería, monitoreo ambiental y trabajo comunitario para garantizar suministro hídrico, generación de energía y protección del entorno.
            </p>
            </div>
            <div class="dam-stats" aria-label="Datos rápidos de la represa">
                <div class="dam-stat">
                    <span class="value">1,200 hm³</span>
                    <span class="label">Capacidad máxima</span>
                </div>
                <div class="dam-stat">
                    <span class="value">95 m</span>
                    <span class="label">Altura de muro</span>
                </div>
                <div class="dam-stat">
                    <span class="value">1987</span>
                    <span class="label">Inauguración</span>
                </div>
            </div>
            <div class="bottomTextBox" style="margin-top:1.25rem;">
            <h2 class="title1 presentationTitle">¿A quienes ayudamos?</h2>
            <p class="text1 presentationText">
                Proveemos agua para consumo humano, riego agrícola e industria, además de suministrar energía hidroeléctrica local. Trabajamos con comunidades aledañas para fortalecer resiliencia frente a sequías e inundaciones y preservar la biodiversidad del embalse.
            </p>
            </div>
        </div>
        <div class="presentationImg" aria-hidden="true">
            <img src="../assets/sources/img/represa.webp" alt="Vista aérea de la represa" style="width:100%; border-radius:8px;">
        </div>
    </div>
    <div class="teamSection" data-aos="fade-up">
    <h2 class="title1 presentationTitle">Nuestro equipo</h2>
    <div class="container swiper">
        <div class="card-wrapper">
            <ul class="card-list swiper-wrapper">
                <li class="card-item swiper-slide">
                    <img src="../assets/sources/img/example.jpg" alt="Foto - Director de Operaciones" class="card-image">
                    <p class="card-text text1 customFont whiteText">María López</p>
                    <p class="card-text text1 customFont whiteText">Directora de Operaciones</p>
                </li>
                <li class="card-item swiper-slide">
                    <img src="../assets/sources/img/example.jpg" alt="Foto - Jefe de Mantenimiento" class="card-image">
                    <p class="card-text text1 customFont whiteText">Carlos Reyes</p>
                    <p class="card-text text1 customFont whiteText">Jefe de Mantenimiento</p>
                </li>
                <li class="card-item swiper-slide">
                    <img src="../assets/sources/img/example.jpg" alt="Foto - Ingeniera Ambiental" class="card-image">
                    <p class="card-text text1 customFont whiteText">Ana Martínez</p>
                    <p class="card-text text1 customFont whiteText">Ingeniera Ambiental</p>
                </li>
                <li class="card-item swiper-slide">
                    <img src="../assets/sources/img/example.jpg" alt="Foto - Operador de Planta" class="card-image">
                    <p class="card-text text1 customFont whiteText">Luis Fernández</p>
                    <p class="card-text text1 customFont whiteText">Operador de Planta</p>
                </li>
                <li class="card-item swiper-slide">
                    <img src="../assets/sources/img/example.jpg" alt="Foto - Relaciones Comunitarias" class="card-image">
                    <p class="card-text text1 customFont whiteText">Sofía Gómez</p>
                    <p class="card-text text1 customFont whiteText">Relaciones Comunitarias</p>
                </li>
            </ul>
            <div class="swiper-pagination"></div>
            <div class="swiper-slide-button swiper-button-prev"></div>
            <div class="swiper-slide-button swiper-button-next"></div>
        </div>
    </div>
    <div class="valuesSection customFont whiteText" data-aos="fade-up">
        <div class="valuesTextWrapper">
            <div class="missionTextBox">
                <h2 class="title2">Misión</h2>
                <p class="text1">
                    Gestionar la represa con estándares de seguridad y sostenibilidad, garantizando agua y energía para la región mientras protegemos el entorno natural y fortalecemos a las comunidades locales.
                </p>
            </div>
            <div class="valuesTextBox">
                <h2 class="title2">Visión</h2>
                <p class="text1">
                    Ser reconocidos como un referente regional en gestión hídrica y generación responsable de energía, innovando en tecnología y prácticas ambientales para las próximas décadas.
                </p>
            </div>
        </div>
    </div>
    <!-- Footer -->
    <footer class="mainFooter">
        <div class="footerContent">
            <div class="footerSection">
                <h3 class="customFont whiteText">Empresa</h3>
                <p style="text-align: start;" class="customFont text2 whiteText">Somos la empresa encargada de gestionar y operar la infraestructura hidroeléctrica del valle.</p>
            </div>
            <div class="footerSection">
                <h4 class="customFont whiteText">Informativos</h4>
                <ul>
                    <li><a href="index.html" class="customFont text2 whiteText">Lugares de pago</a></li>
                    <li><a href="views/nosotros.html" class="customFont text2 whiteText">Oficinas de atención</a></li>
                    <li><a href="views/servicios.html" class="customFont text2 whiteText">Necesito ayuda</a></li>
                    <li><a href="views/contacto.html" class="customFont text2 whiteText">Preguntas Frecuentes</a></li>
                    <li><a href="views/contacto.html" class="customFont text2 whiteText">Regulación Vigente</a></li>
                    <li><a href="views/contacto.html" class="customFont text2 whiteText">Políticas de Privacidad</a></li>
                    <li><a href="views/contacto.html" class="customFont text2 whiteText">Regulación Vigente</a></li>
                </ul>
            </div>
            <div class="footerSection">
                <h4 class="customFont whiteText">Contacto</h4>
                <p class="emailNPhoneText">Email: info@empresa.com</p>
                <p class="emailNPhoneText">Tel: +51 000 000 000</p>
            </div>
            <div class="footerSection footerSectionLast">
                <h4 class="customFont whiteText">Redes Sociales</h4>
                <div class="socialLinks">
                    <ul>
                    <li><a href="#" class="customFont text2 whiteText">Facebook</a></li>
                    <li><a href="#" class="customFont text2 whiteText">Instagram</a></li>
                    <li><a href="#" class="customFont text2 whiteText">YouTube</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footerBottom">
            <p class="customFont text2 whiteText">&copy; 2025 DataSAvers. Todos los derechos reservados.</p>
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script src="../../BackEnd/js/swiperInitIndex.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
    <script>
        AOS.init({
        duration: 250,
        easing: "ease-in-out",
        once: false,
        });
    </script>
</body>
</html>