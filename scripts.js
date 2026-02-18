// ===== FUNCIÓN PARA CAMBIAR PESTAÑAS (GLOBAL) =====
function showTab(tabId, saveHistory = true) {
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
        } else if (window.MathJax && window.MathJax.typeset) {
            window.MathJax.typeset();
        }
        
        // 4. Volver al inicio suavemente
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // 5. Gestión del Historial (BOTÓN ATRÁS)
        if (saveHistory) {
            history.pushState({ tabId: tabId }, "", "#" + tabId);
        }
    } else {
        console.warn("La pestaña '" + tabId + "' no existe en el HTML.");
    }
}

// ===== ESCUCHAR NAVEGACIÓN DEL NAVEGADOR (FLECHAS ATRÁS/ADELANTE) =====
window.onpopstate = function(event) {
    if (event.state && event.state.tabId) {
        showTab(event.state.tabId, false);
    } else {
        // Si no hay estado (ej. volvimos al inicio real), cargamos inicio
        const hash = window.location.hash.replace('#', '') || 'inicio';
        showTab(hash, false);
    }
};

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

    // 2. INICIALIZAR PESTAÑA SEGÚN URL O DEFECTO
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && document.getElementById(initialHash)) {
        showTab(initialHash, true);
    } else {
        showTab('inicio', true); // Cambié 'proyectos' por 'inicio' por ser lo estándar, cámbialo si prefieres
    }

    // 3. ANIMACIÓN DE BARRAS DE HABILIDADES
    const skillBars = document.querySelectorAll('.skill-level');
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
            
            if (isVisible && !bar.dataset.animated) {
                const styleAttr = bar.getAttribute('style');
                if (styleAttr && styleAttr.includes('width')) {
                    const match = styleAttr.match(/width:\s*(\d+%)/);
                    if (match) {
                        const finalWidth = match[1];
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = finalWidth;
                        }, 100);
                        bar.dataset.animated = 'true';
                    }
                }
            }
        });
    }

    window.addEventListener('scroll', animateSkillBars);
});
