// Seleciona todos os elementos animados
const elementos = document.querySelectorAll(".scroll-animado");

// WeakMap para controlar cooldown e evitar repetição rápida
const lastAnimated = new WeakMap();
const COOLDOWN = 300; // 0.3s entre animações

// Função para animar o elemento
function toggleAtivo(entry) {
  const now = Date.now();
  const last = lastAnimated.get(entry.target) || 0;

  if (now - last <= COOLDOWN) return; // ainda no cooldown

  if (entry.isIntersecting) {
    entry.target.style.transitionDelay = "0s"; // remove delay extra
    entry.target.classList.add("ativo");
  } else {
    entry.target.classList.remove("ativo");
  }

  lastAnimated.set(entry.target, now);
}

// Configura o observer
const observer = new IntersectionObserver(
  (entries) => entries.forEach(toggleAtivo),
  { threshold: 0.1 }
);

// Observa cada elemento
elementos.forEach((el) => observer.observe(el));

// Animação inicial do Hero e da foto
document
  .querySelectorAll(".hero .conteudo, .foto")
  .forEach((el) => el.classList.add("ativo"));
