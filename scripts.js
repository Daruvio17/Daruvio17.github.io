// ===== CONTROL DE CARGA INICIAL Y NAVEGACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // 1. MENU MOBILE TOGGLE
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

    // 2. INICIALIZAR PESTAÑA POR DEFECTO
    // Esto evita que la página cargue en blanco
    showTab('proyectos'); 

    // 3. ANIMACIÓN DE BARRAS DE HABILIDADES
    const skillBars = document.querySelectorAll('.skill-level');
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
            
            if (isVisible && !bar.dataset.animated) {
                const finalWidth = bar.getAttribute('style').match(/width:\s*(\d+%)/)[1];
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = finalWidth;
                }, 100);
                bar.dataset.animated = 'true';
            }
        });
    }

    window.addEventListener('scroll', animateSkillBars);
});

// ===== FUNCIÓN PARA CAMBIAR PESTAÑAS (GLOBAL) =====
function showTab(tabId) {
    // 1. Ocultar todas las pestañas
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
        tab.style.display = 'none';
    });

    // 2. Mostrar la pestaña seleccionada
    const target = document.getElementById(tabId);
    if(target) {
        target.style.display = 'block';
        // Pequeño delay para que la transición de opacidad del CSS funcione
        setTimeout(() => {
            target.classList.add('active');
        }, 10);
        
        // 3. Renderizar fórmulas matemáticas (MathJax)
        if (window.MathJax && window.MathJax.typesetPromise) { 
            window.MathJax.typesetPromise(); 
        }
        
        // 4. Volver al inicio suavemente
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.warn("La pestaña '" + tabId + "' no existe en el HTML.");
    }
}
