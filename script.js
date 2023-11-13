const acessKey = "E6MKEUkwiy8la-9FFTQbVOvB4d4wgE_jnJsDQzv9kaU";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("pesquisar-input");
const buscaResultados = document.querySelector(".busca-resultados");
const mostrarMais = document.getElementById("mostrar-mais-button");

let inputData = "";
let page = 1;

async function procurarImagens() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${acessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const resultados = data.results;

    if (page === 1) {
        buscaResultados.innerHTML = "";
    }

    resultados.map((resultado) => {
        const imagemColetor = document.createElement('div');
        imagemColetor.classList.add("busca-resultado");
        const image = document.createElement('img');
        image.src = resultado.urls.small;
        image.alt = resultado.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = resultado.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = resultado.alt_description;

        imagemColetor.appendChild(image);
        imagemColetor.appendChild(imageLink);
        buscaResultados.appendChild(imagemColetor);
    });

    page++;
    if (page > 1) {
        mostrarMais.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    procurarImagens();
});

mostrarMais.addEventListener("click", () => {
    procurarImagens();
});