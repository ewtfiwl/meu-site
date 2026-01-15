// =========================
// SCROLL ANIMATIONS
// =========================

// Elementos gerais (seções menores)
const elementos = document.querySelectorAll(
  ".scroll-animado:not(.projeto-card)"
);

// Cards de projeto (elementos altos)
const projetos = document.querySelectorAll(".projeto-card");

// Observer geral: anima entrada e saída suave
// Usa thresholds diferentes para evitar oscilações em scroll lento
const observerGeral = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.3) {
        entry.target.classList.add("ativo");
      } else if (entry.intersectionRatio < 0.05) {
        entry.target.classList.remove("ativo");
      }
    });
  },
  {
    threshold: [0, 0.05, 0.3],
  }
);

// Observer específico para projetos
// Anima apenas uma vez para evitar delay e bugs com scrollbar
const observerProjetos = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("ativo");
        observerProjetos.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

projetos.forEach((card) => observerProjetos.observe(card));

elementos.forEach((el) => observerGeral.observe(el));

// Animação inicial do Hero e da foto (executa no load)
document
  .querySelectorAll(".hero .conteudo, .foto")
  .forEach((el) => el.classList.add("ativo"));

// =========================
// TOUCH NO MOBILE PARA PROJETOS
// =========================

// Seleciona todas as imagens dos projetos
const projetoImgs = document.querySelectorAll(".projeto-card img");

projetoImgs.forEach((img) => {
  // Quando toca na imagem
  img.addEventListener("touchstart", () => {
    // Remove a classe 'ativo' de todas
    projetoImgs.forEach((i) => i.classList.remove("ativo"));
    // Adiciona a classe 'ativo' na imagem tocada
    img.classList.add("ativo");
  });

  // Quando solta o dedo (opcional, para efeito temporário)
  img.addEventListener("touchend", () => {
    setTimeout(() => {
      img.classList.remove("ativo");
    }, 300); // 0.3s igual ao cooldown do efeito
  });
});
