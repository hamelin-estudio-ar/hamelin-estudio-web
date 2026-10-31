
document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("menu");
toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  }
});

// Animaciones de entrada
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.classList.add("visible");
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Formulario de contacto -> Formspree
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

function setStatus(msg, cls) {
  formStatus.textContent = msg;
  formStatus.className = cls || "";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  setStatus("Enviando...");
  try {
    const response = await fetch("https://formspree.io/f/xbggaqyy", {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error(`Formspree respondió ${response.status}`);
    form.reset();
    setStatus("¡Gracias por tu consulta! Te responderemos a la brevedad.", "ok");
  } catch (err) {
    console.error(err);
    setStatus("No pudimos enviar tu consulta. Intentá de nuevo o escribinos a contacto.hamelinestudio@gmail.com.", "err");
  } finally {
    submitBtn.disabled = false;
  }
});

