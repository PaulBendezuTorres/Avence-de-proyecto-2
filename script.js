// Menú hamburguesa
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector("header ul");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Reservas (demo)
  const form = document.getElementById("formReserva");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("¡Gracias por reservar! Te enviaremos un correo de confirmación 🍷✨");
    form.reset();
  });
});
