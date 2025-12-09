// Menú hamburguesa
document.addEventListener("DOMContentLoaded", () => {
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
});
