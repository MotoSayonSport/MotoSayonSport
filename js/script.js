// Script para la interactividad y animaciones

// 1. Menú responsivo para móviles
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// 2. Cambio de estilo de la barra de navegación al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 5%';
        navbar.style.background = 'rgba(255, 255, 255, 1)';
    } else {
        navbar.style.padding = '1rem 5%';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// 3. Animación de aparición al hacer scroll (Scroll Reveal)
// Detecta cuando los elementos entran en la pantalla
const revealElements = document.querySelectorAll('.scroll-reveal');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85; // Dispara cuando el elemento está al 85% de la altura

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('visible');
        } else {
            // Opcional: quitar la clase si quieres que se anime cada vez que haces scroll arriba/abajo
            // element.classList.remove('visible'); 
        }
    });
}

// Escuchar el evento scroll
window.addEventListener('scroll', checkReveal);

// Llamar una vez al inicio por si ya hay elementos visibles
checkReveal();

// 4. Smooth Scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Cerrar menú móvil si está abierto
        const navLinks = document.querySelector('.nav-links');
        if(navLinks.classList.contains('active')) {
             navLinks.classList.remove('active');
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Modal de Catálogo
const catalogButtons = document.querySelectorAll('.catalog-open');
const catalogModal = document.getElementById('catalogModal');
const closeCatalog = document.getElementById('closeCatalog');
const modalOverlay = document.getElementById('modalOverlay');

function openCatalogModal() {
    if (catalogModal) {
        catalogModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeCatalogModal() {
    if (catalogModal) {
        catalogModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

catalogButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCatalogModal();
    });
});

if (closeCatalog) closeCatalog.addEventListener('click', closeCatalogModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeCatalogModal);

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCatalogModal();
});

// ----- Modal de Detalles de Moto (Ficha Técnica) -----
const motoModal = document.getElementById('motoModal');
const closeMotoModalBtn = document.getElementById('closeMotoModal');
const motoModalOverlay = document.getElementById('motoModalOverlay');

function openMotoModal(name, img, specsText) {
    if(!motoModal) return;
    document.getElementById('motoDetailName').innerText = name;
    document.getElementById('motoDetailImg').src = img;
    
    // Transformar los specs (|) en HTML
    let specsHtml = "";
    const specsArray = specsText.split('|');
    specsArray.forEach(spec => {
        let parts = spec.split(':');
        if(parts.length === 2) {
            specsHtml += "<p><strong>" + parts[0].trim() + ":</strong> " + parts[1].trim() + "</p>";
        } else {
            specsHtml += "<p>" + spec + "</p>";
        }
    });

    document.getElementById('motoDetailSpecs').innerHTML = specsHtml;
    
    motoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeMotoModal() {
    if (motoModal) {
        motoModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// Asignar eventos a los botones de "Detalles"
document.querySelectorAll('.moto-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const name = this.getAttribute('data-name');
        const img = this.getAttribute('data-img');
        const specs = this.getAttribute('data-specs');
        openMotoModal(name, img, specs);
    });
});

if (closeMotoModalBtn) closeMotoModalBtn.addEventListener('click', closeMotoModal);
if (motoModalOverlay) motoModalOverlay.addEventListener('click', closeMotoModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMotoModal();
});
