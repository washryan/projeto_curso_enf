let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function() {
    nextImage();
}, 10000)

function nextImage() {
    count++;
    if(count>6){
        count = 1;
    }
    document.getElementById("radio"+count).checked = true;
}

const chk = document.getElementById('chk');
const logoImg = document.querySelector('.logo img'); // Corrigido para selecionar a imagem diretamente

chk.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    
    // Adiciona um delay para a troca da imagem para sincronizar com a animação
    setTimeout(() => {
        if (document.body.classList.contains('dark')) {
            logoImg.src = 'img/logodark.png'; // Caminho da logo no modo dark
        } else {
            logoImg.src = 'img/logo.png'; // Caminho da logo no modo claro
        }
    }, 250); // 500ms de atraso para dar a ilusão de transição suave
});

VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5
});
