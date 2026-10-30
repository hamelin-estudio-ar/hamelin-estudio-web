import { firebaseConfig, isConfigured } from "./firebase-config.js";

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

// Formulario -> Firestore (SDK cargado bajo demanda)
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
let dbPromise;

function getDb() {
  dbPromise ??= (async () => {
    const base = "https://www.gstatic.com/firebasejs/10.14.1";
    const { initializeApp } = await import(`${base}/firebase-app.js`);
    const fs = await import(`${base}/firebase-firestore.js`);
    return { db: fs.getFirestore(initializeApp(firebaseConfig)), fs };
  })();
  return dbPromise;
}

function setStatus(msg, cls) {
  status.textContent = msg;
  status.className = cls || "";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if (data.website) return; // honeypot anti-spam

  const nombre = data.nombre.trim();
  const email = data.email.trim();
  const mensaje = data.mensaje.trim();
  if (!nombre || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !mensaje) {
    setStatus("Completá todos los campos con un email válido.", "err");
    return;
  }
  if (!isConfigured) {
    setStatus("El formulario aún no está configurado. Escribinos por email.", "err");
    return;
  }

  const btn = form.querySelector("button");
  btn.disabled = true;
  setStatus("Enviando…");
  try {
    const { db, fs } = await getDb();
    await fs.addDoc(fs.collection(db, "consultas"), {
      nombre, email, mensaje,
      createdAt: fs.serverTimestamp(),
      origen: location.hostname
    });
    form.reset();
    setStatus("¡Gracias! Recibimos tu consulta y te responderemos pronto.", "ok");
  } catch (err) {
    console.error(err);
    setStatus("No pudimos enviar tu consulta. Probá por email.", "err");
  } finally {
    btn.disabled = false;
  }
});
