document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. Navbar Glass Effect */
    // Añade la clase 'scrolled' cuando se baja más de 50px
    const navbar = document.getElementById("navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        });
    }

    /* 2. Menú Móvil (Drawer Lateral) */
    // Lógica completa para abrir/cerrar el menú lateral
    const menuBtn = document.querySelector(".mobile-toggle");
    const closeBtn = document.querySelector(".close-drawer");
    const drawer = document.querySelector(".mobile-drawer");
    const overlay = document.querySelector(".mobile-menu-overlay");
    const links = document.querySelectorAll(".drawer-links a");

    // Función para manejar el estado del menú
    const toggleMenu = (isOpen) => {
        if (!drawer || !overlay) return; // Protección por si no existen elementos
        
        if (isOpen) {
            drawer.classList.add("active");
            overlay.classList.add("active");
            document.body.style.overflow = "hidden"; // Bloquea el scroll del body
        } else {
            drawer.classList.remove("active");
            overlay.classList.remove("active");
            document.body.style.overflow = ""; // Restaura el scroll
        }
    };

    // Event Listeners para el menú
    if (menuBtn) menuBtn.addEventListener("click", () => toggleMenu(true));
    if (closeBtn) closeBtn.addEventListener("click", () => toggleMenu(false));
    if (overlay) overlay.addEventListener("click", () => toggleMenu(false));
    
    // Cerrar el menú automáticamente al hacer clic en un enlace interno
    links.forEach(link => {
        link.addEventListener("click", () => toggleMenu(false));
    });

    /* 3. Carrusel de Modelos (Scroll Horizontal) */
    const track = document.getElementById('modelCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            // Calcula el ancho de la tarjeta dinámicamente + el gap (24px)
            const card = track.querySelector('.property-card');
            const scrollAmount = card ? card.offsetWidth + 24 : 320;
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            const card = track.querySelector('.property-card');
            const scrollAmount = card ? card.offsetWidth + 24 : 320;
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    /* 4. Animaciones al hacer Scroll (Intersection Observer) */
    // Detecta cuando los elementos con clase .fade-up entran en pantalla
    const observerOptions = {
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px" // Margen inferior para activar un poco antes
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});