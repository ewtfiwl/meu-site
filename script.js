const elementos = document.querySelectorAll(".scroll-animado");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("ativo");
      } else {
        entry.target.classList.remove("ativo");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

elementos.forEach((el) => observer.observe(el));
