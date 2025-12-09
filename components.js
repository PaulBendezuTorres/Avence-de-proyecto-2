/**
 * Sistema de Componentes Reutilizables
 * Carga componentes HTML dinámicamente para evitar duplicación de código
 */

// Función para cargar un componente HTML
async function loadComponent(componentName, targetSelector) {
    try {
        const response = await fetch(`componentes/${componentName}.html`);

        if (!response.ok) {
            throw new Error(`Error al cargar ${componentName}: ${response.status}`);
        }

        const html = await response.text();
        const targetElement = document.querySelector(targetSelector);

        if (targetElement) {
            targetElement.innerHTML = html;
        } else {
            console.error(`Elemento objetivo no encontrado: ${targetSelector}`);
        }
    } catch (error) {
        console.error(`Error cargando componente ${componentName}:`, error);
    }
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    // Cargar header y footer
    await Promise.all([
        loadComponent('header', '#header-container'),
        loadComponent('footer', '#footer-container')
    ]);

    // Después de cargar el header, inicializar el menú hamburguesa
    initMobileMenu();
});

// Función para inicializar el menú móvil
function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelector("header nav ul");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        // Cerrar menú al hacer clic en un link
        const menuItems = navLinks.querySelectorAll("a");
        menuItems.forEach(item => {
            item.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }
}
