const toggleBtn = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const menuLinks = menu.querySelectorAll('a');

toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    menu.classList.toggle('active');
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleBtn.classList.remove('active');
        menu.classList.remove('active');
    });
});

document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const offset = document.querySelector('nav').offsetHeight; // altura da navbar
    const position = target.offsetTop - offset;

    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  });
});

function randomInt(max) {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      return array[0] % max;
    }

    function gerar() {
      const tamanho = parseInt(document.getElementById("tamanho").value);

      let letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
      let letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let numeros = "0123456789";
      let simbolos = "!@#$%^&*()-_=+[]{};:,.<>?/\\|~";

      let pool = "";
      if (document.getElementById("minusculas").checked) pool += letrasMinusculas;
      if (document.getElementById("maiusculas").checked) pool += letrasMaiusculas;
      if (document.getElementById("numeros").checked) pool += numeros;
      if (document.getElementById("simbolos").checked) pool += simbolos;

      if (pool === "") {
        document.getElementById("senha").textContent = "Selecione pelo menos uma opção!";
        return;
      }

      let senha = "";
      for (let i = 0; i < tamanho; i++) {
        const indice = randomInt(pool.length);
        senha += pool[indice];
      }

      document.getElementById("senha").textContent = senha;
    }