const produtos = [
    {
    nome: "Caneca personalizada com Nome e Frase",
    codigo: "cn01",
    categoria: "caneca",
    preco: "$40,00",
    imagens: [
      "img/produtos/canecas/cn0101.png",
      "img/produtos/canecas/cn0102.png",
    ],
  },

    {
    nome: "Caneca personalizada com Nome e Frase",
    codigo: "sq01",
    categoria: "squeez",
    preco: "$40,00",
    imagens: [
      "img/produtos/canecas/cn0101.png",
      "img/produtos/canecas/cn0102.png",
    ],
  },
];

const container = document.getElementById("produtosContainer");
const filtro = document.getElementById("filtroCategoria");

function renderizarProdutos(filtroSelecionado) {
  container.innerHTML = "";

  const filtrados = filtroSelecionado === "todas"
    ? produtos
    : produtos.filter(p => p.categoria === filtroSelecionado);

  filtrados.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const carousel = document.createElement("div");
    carousel.classList.add("carousel");

    let index = 0;

    // --- Imagens ---
    p.imagens.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      if (i === 0) img.classList.add("active");
      carousel.appendChild(img);
    });

    // --- Botões (para desktop) ---
    const btnPrev = document.createElement("button");
    btnPrev.textContent = "‹";
    btnPrev.classList.add("prev");

    const btnNext = document.createElement("button");
    btnNext.textContent = "›";
    btnNext.classList.add("next");

    carousel.appendChild(btnPrev);
    carousel.appendChild(btnNext);

    // --- Dots (sempre renderizados, mas visíveis só no celular via CSS) ---
    const dotsContainer = document.createElement("div");
    dotsContainer.classList.add("dots");

    p.imagens.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => mudarImagem(i));
      dotsContainer.appendChild(dot);
    });

    // --- Função de troca de imagem ---
    function mudarImagem(novoIndex) {
      const imagens = carousel.querySelectorAll("img");
      const dots = dotsContainer.querySelectorAll(".dot");
      imagens[index].classList.remove("active");
      dots[index].classList.remove("active");
      index = novoIndex;
      imagens[index].classList.add("active");
      dots[index].classList.add("active");
    }

    // --- Botões (desktop) ---
    btnPrev.addEventListener("click", () => {
      mudarImagem((index - 1 + p.imagens.length) % p.imagens.length);
    });
    btnNext.addEventListener("click", () => {
      mudarImagem((index + 1) % p.imagens.length);
    });

    // --- Swipe (celular) ---
    let startX = 0;
    carousel.addEventListener("touchstart", (e) => startX = e.touches[0].clientX);
    carousel.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) mudarImagem((index + 1) % p.imagens.length);
      else if (endX - startX > 50) mudarImagem((index - 1 + p.imagens.length) % p.imagens.length);
    });

    const info = document.createElement("div");
    info.classList.add("card-info");
    info.innerHTML = `
      <h3>${p.nome}</h3>
      <p>${p.preco}</p>
      <a class="btn-comprar" href="https://wa.me/553172449377?text=Olá! Quero comprar essa ${encodeURIComponent(p.categoria)} modelo ${encodeURIComponent(p.codigo)}!" target="_blank">Comprar no WhatsApp</a>`;
    card.appendChild(carousel);
    card.appendChild(dotsContainer);
    card.appendChild(info);
    container.appendChild(card);
  });
}

filtro.addEventListener("change", (e) => renderizarProdutos(e.target.value));
renderizarProdutos("todas");
