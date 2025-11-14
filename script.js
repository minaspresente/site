const produtos = [
    {
    nome: "Caneca personalizada com Nome e Frase",
    codigo: "cn01",
    categoria: "canecas",
    preco: "$40,00",
    imagens: [
      "img/produtos/canecas/cn01/cn0101.png",
      "img/produtos/canecas/cn01/cn0102.png",
      "img/produtos/canecas/cn01/cn0103.png",
    ],
  },
     {
    nome: "Caneca personalizada com Nome e Foto",
    codigo: "cn02",
    categoria: "canecas",
    preco: "$40,00",
    imagens: [
      "img/produtos/canecas/cn02/cn0201.png",
      "img/produtos/canecas/cn02/cn0202.png",
      "img/produtos/canecas/cn02/cn0203.png",
    ],
  },
      {
    nome: "Caneca personalizada com Nome",
    codigo: "cn03",
    categoria: "canecas",
    preco: "$40,00",
    imagens: [
      "img/produtos/canecas/cn03/cn0301.png",
      "img/produtos/canecas/cn03/cn0302.png",
      "img/produtos/canecas/cn03/cn0303.png",
    ],
  },
     {
    nome: "Caneca personalizada com Nome e Foto",
    codigo: "cn04",
    categoria: "canecas",
    preco: "$40,00",
    imagens: [
      "img/produtos/canecas/cn04/cn0401.png",
      "img/produtos/canecas/cn04/cn0402.png",
      "img/produtos/canecas/cn04/cn0403.png",
    ],
  },
    {
    nome: "Caneca personalizada com Nome e Frase",
    codigo: "cn05",
    categoria: "canecas",
    preco: "$40,00",
    imagens: [
      "img/produtos/canecas/cn05/cn0501.png",
      "img/produtos/canecas/cn05/cn0502.png",
      "img/produtos/canecas/cn05/cn0503.png",
    ],
  },
   {
    nome: "Caneca personalizada com Foto e Mensagem",
    codigo: "cn06",
    categoria: "canecas",
    preco: "$40,00",
    imagens: [
      "img/produtos/canecas/cn06/cn0601.png",
      "img/produtos/canecas/cn06/cn0602.png",
      "img/produtos/canecas/cn06/cn0603.png",
    ],
  },
  {
    nome: "Caneca personalizada com Foto e Palavras",
    codigo: "cn07",
    categoria: "canecas",
    preco: "$40,00",
    imagens: [
      "img/produtos/canecas/cn07/cn0701.png",
      "img/produtos/canecas/cn07/cn0702.png",
      "img/produtos/canecas/cn07/cn0703.png",
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
