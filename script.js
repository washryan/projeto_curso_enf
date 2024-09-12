// Controle do carrossel de imagens
let count = 1;
document.getElementById("radio1").checked = true;

setInterval(nextImage, 10000);

function nextImage() {
  count = (count % 6) + 1;
  document.getElementById(`radio${count}`).checked = true;
}

// Controle do modo escuro
const chk = document.getElementById("chk");
const logoImg = document.querySelector(".logo img");

chk.addEventListener("change", () => {
  document.body.classList.toggle("dark");

  setTimeout(() => {
    logoImg.src = document.body.classList.contains("dark")
      ? "img/logodark.png"
      : "img/logo.png";
  }, 250);
});

// Inicializa o efeito de inclinação das cartas
VanillaTilt.init(document.querySelectorAll(".card"), {
  max: 25,
  speed: 400,
  glare: true,
  "max-glare": 0.5,
});

// Controle do botão de voltar ao topo
window.onscroll = function () {
  const btn = document.getElementById("backToTopBtn");
  btn.style.display =
    document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
      ? "block"
      : "none";
};

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
