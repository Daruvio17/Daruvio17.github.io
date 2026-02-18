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

        // 5. GESTIÓN DEL HISTORIAL
        if (saveHistory) {
            // Reemplazamos el estado actual si es la primera carga, o añadimos uno nuevo
            if (!history.state) {
                history.replaceState({ tabId: tabId }, "", "#" + tabId);
            } else if (history.state.tabId !== tabId) {
                history.pushState({ tabId: tabId }, "", "#" + tabId);
            }
        }
    } else {
        console.warn("La pestaña '" + tabId + "' no existe.");
        // Si la pestaña no existe (por un link roto), nos asegura de ir a inicio
        if (tabId !== 'inicio') showTab('inicio', false);
    }
}

// ===== ESCUCHAR NAVEGACIÓN DEL NAVEGADOR (FLECHAS ATRÁS/ADELANTE) =====
window.onpopstate = function(event) {
    // Si hay un estado guardado en el historial, mostramos esa pestaña
    if (event.state && event.state.tabId) {
        showTab(event.state.tabId, false);
    } else {
        // Si volvemos al punto cero del sitio, forzamos la carga de 'inicio'
        showTab('inicio', false);
    }
};

// ===== CONTROL DE CARGA INICIAL Y NAVEGACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // 1. MENU MOBILE TOGGLE (Tu código original)
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
    
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // 2. INICIALIZAR PESTAÑA SEGÚN URL (IMPORTANTE PARA EL BOTÓN ATRÁS)
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && document.getElementById(initialHash)) {
        // history.replaceState asegura que el punto de partida sea el hash actual
        history.replaceState({ tabId: initialHash }, "", "#" + initialHash);
        showTab(initialHash, false);
    } else {
        showTab('inicio', true);
    }

    // 3. ANIMACIÓN DE BARRAS DE HABILIDADES (Tu código original)
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
                        setTimeout(() => { bar.style.width = finalWidth; }, 100);
                        bar.dataset.animated = 'true';
                    }
                }
            }
        });
    }
    window.addEventListener('scroll', animateSkillBars);
});
