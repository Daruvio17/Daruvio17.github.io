// ===== NAVBAR MOBILE TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (navLinks && !event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
    
    // ===== ANIMACIÓN DE BARRAS DE HABILIDADES =====
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
            
            if (isVisible && !bar.dataset.animated) {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                bar.dataset.animated = 'true';
            }
        });
    }

    // Ejecutar animación al cargar y al hacer scroll
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();
});

// ===== FUNCIÓN PARA CAMBIAR PESTAÑAS (FUERA DE TODO) =====
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    const target = document.getElementById(tabId);
    if(target) {
        target.style.display = 'block';
        if (window.MathJax) { MathJax.typesetPromise(); }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
