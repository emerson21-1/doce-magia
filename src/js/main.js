/* ============================================================
   Sweet & Art Bakery — Main JavaScript (v2 - Premium)
   Features: products render, cart logic, filters, dark mode,
   mobile menu, smooth scroll, form validation, modals,
   scroll reveal animations, count-up stats, WhatsApp link.
   ============================================================ */

import '../styles/main.css';

// ============================================================
// PRODUCT DATA — Doce Magia Gourmet (Osasco, SP)
// Copied directly from https://www.encomendasdocemagia.com.br
// 48 real items across 9 categories: Bolos Confeitados, Sobremesas,
// Tortas Salgadas, Docinhos (Meio Cento + Cento), Salgados, Presente,
// Descartáveis e Kits com desconto.
// Price varies by size/quantity — finalised via WhatsApp.
// ============================================================
const PRODUCTS = [
    {
        id: 1,
        originalId: 385267,
        name: "Bandeja de 35 Docinhos Tradicionais",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 64,
        oldPrice: null,
        icon: "🍬",
        theme: "theme-chocolate",
        category: "docinhos",
        categoryLabel: "Docinhos por Cento",
        image: "/products/385267_photo1674840130.jpeg.webp",
        priceNote: "R$ 64,00",
        hasSizes: false,
        priceVariations: [{"variationId":"532090","name":"Bandeja com 35 docinhos","price":64}],
    },
    {
        id: 2,
        originalId: 385266,
        name: "Docinhos (Mínimo de 100 unidades)",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🍬",
        theme: "theme-chocolate",
        category: "docinhos",
        categoryLabel: "Docinhos por Cento",
        image: "/products/385266_photo1674485994.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 3,
        originalId: 2433614,
        name: "Salgados Assados (Mínimo de 50 unidades)",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🥟",
        theme: "theme-blueberry",
        category: "salgados",
        categoryLabel: "Salgados",
        image: "/products/2433614_assados-3.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 4,
        originalId: 385264,
        name: "Salgados Fritos (Mínimo de 50 unidades)",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🥟",
        theme: "theme-blueberry",
        category: "salgados",
        categoryLabel: "Salgados",
        image: "/products/385264_photo.jpeg",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 5,
        originalId: 378160,
        name: "Velas",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🕯️",
        theme: "theme-vanilla",
        category: "descartaveis",
        categoryLabel: "Descartáveis",
        image: "/products/378160_6.jpg",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 6,
        originalId: 378153,
        name: "Kit Pratinho e Garfinho",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 3,
        oldPrice: null,
        icon: "🕯️",
        theme: "theme-vanilla",
        category: "descartaveis",
        categoryLabel: "Descartáveis",
        image: "",
        priceNote: "R$ 3,00",
        hasSizes: false,
        priceVariations: [{"variationId":"522847","name":"Kit Pratinho e Garfinho","price":3}],
    },
    {
        id: 7,
        originalId: 385268,
        name: "Brigadeiro Tradicional - Confeito Bolinha",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 85,
        oldPrice: null,
        icon: "🍬",
        theme: "theme-chocolate",
        category: "docinhos",
        categoryLabel: "Docinhos Meio Cento (50 unidades)",
        image: "/products/385268_photo1674485069.jpeg.webp",
        priceNote: "R$ 85,00",
        hasSizes: false,
        priceVariations: [{"variationId":"532091","name":"50 unidades","price":85}],
    },
    {
        id: 8,
        originalId: 385271,
        name: "Brigadeiro Branco Tradicional",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 85,
        oldPrice: null,
        icon: "🍬",
        theme: "theme-chocolate",
        category: "docinhos",
        categoryLabel: "Docinhos Meio Cento (50 unidades)",
        image: "/products/385271_photo1674485175.jpeg.webp",
        priceNote: "R$ 85,00",
        hasSizes: false,
        priceVariations: [{"variationId":"532094","name":"50 unidades","price":85}],
    },
    {
        id: 9,
        originalId: 385270,
        name: "Cajuzinho",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 85,
        oldPrice: null,
        icon: "🍬",
        theme: "theme-chocolate",
        category: "docinhos",
        categoryLabel: "Docinhos Meio Cento (50 unidades)",
        image: "/products/385270_photo1674485143.jpeg.webp",
        priceNote: "R$ 85,00",
        hasSizes: false,
        priceVariations: [{"variationId":"532093","name":"50 unidades","price":85}],
    },
    {
        id: 10,
        originalId: 385269,
        name: "Beijinho",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 85,
        oldPrice: null,
        icon: "🍬",
        theme: "theme-chocolate",
        category: "docinhos",
        categoryLabel: "Docinhos Meio Cento (50 unidades)",
        image: "/products/385269_photo1674485114.jpeg.webp",
        priceNote: "R$ 85,00",
        hasSizes: false,
        priceVariations: [{"variationId":"532092","name":"50 unidades","price":85}],
    },
    {
        id: 11,
        originalId: 534761,
        name: "Torta de Palmito",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 140,
        oldPrice: null,
        icon: "🥧",
        theme: "theme-vanilla",
        category: "tortas-salgadas",
        categoryLabel: "Tortas Salgadas",
        image: "/products/534761_photo.jpeg",
        priceNote: "R$ 140,00",
        hasSizes: false,
        priceVariations: [{"variationId":"744553","name":"Unidade","price":140}],
    },
    {
        id: 12,
        originalId: 534760,
        name: "Torta de Frango com Catupiry",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 140,
        oldPrice: null,
        icon: "🥧",
        theme: "theme-vanilla",
        category: "tortas-salgadas",
        categoryLabel: "Tortas Salgadas",
        image: "/products/534760_photo.jpeg",
        priceNote: "R$ 140,00",
        hasSizes: false,
        priceVariations: [{"variationId":"744552","name":"Unidade","price":140}],
    },
    {
        id: 13,
        originalId: 748188,
        name: "Sacola Presente Doce Magia",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 5,
        oldPrice: null,
        icon: "🎁",
        theme: "theme-strawberry",
        category: "presente",
        categoryLabel: "Presente",
        image: "/products/748188_photo1783003684.jpeg.webp",
        priceNote: "R$ 5,00",
        hasSizes: true,
        priceVariations: [{"variationId":"1058184","name":"Tamanho P - 15x25cm","price":5},{"variationId":"1058185","name":"Tamanho M - 20x25cm","price":5},{"variationId":"1058186","name":"Tamanho G - 30x25cm","price":5}],
    },
    {
        id: 14,
        originalId: 2738972,
        name: "Cheesecake Nova Iorquina",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 165,
        oldPrice: null,
        icon: "🍮",
        theme: "theme-pistachio",
        category: "sobremesas",
        categoryLabel: "Sobremesas",
        image: "/products/2738972_photo1765312770.jpeg.webp",
        priceNote: "R$ 165,00",
        hasSizes: true,
        priceVariations: [{"variationId":"3400118","name":"Frutas Vermelhas","price":165},{"variationId":"3400119","name":"Pistache","price":165},{"variationId":"3400120","name":"Nutella","price":165},{"variationId":"3400122","name":"Doce de Leite","price":165}],
    },
    {
        id: 15,
        originalId: 548737,
        name: "Pudim de Leite Condensado",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 79,
        oldPrice: null,
        icon: "🍮",
        theme: "theme-pistachio",
        category: "sobremesas",
        categoryLabel: "Sobremesas",
        image: "/products/548737_photo1674491241.jpeg.webp",
        priceNote: "R$ 79,00",
        hasSizes: false,
        priceVariations: [{"variationId":"768882","name":"Tamanho único","price":79}],
    },
    {
        id: 16,
        originalId: 566926,
        name: "Surpresa de Uva",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 69,
        oldPrice: null,
        icon: "🍮",
        theme: "theme-pistachio",
        category: "sobremesas",
        categoryLabel: "Sobremesas",
        image: "/products/566926_Surpresa_de_Uva_trad_.webp",
        priceNote: "A partir de R$ 69,00",
        hasSizes: true,
        priceVariations: [{"variationId":"793853","name":"P (6 à 8 Porções) - 650g","price":69},{"variationId":"793854","name":"M 12 à 15 Porções - 1,3kg","price":129}],
    },
    {
        id: 17,
        originalId: 1530068,
        name: "Torta Banoffee",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 95,
        oldPrice: null,
        icon: "🍮",
        theme: "theme-pistachio",
        category: "sobremesas",
        categoryLabel: "Sobremesas",
        image: "/products/1530068_photo1674840369.jpeg.webp",
        priceNote: "R$ 95,00",
        hasSizes: false,
        priceVariations: [{"variationId":"1976819","name":"Tamanho único","price":95}],
    },
    {
        id: 18,
        originalId: 730611,
        name: "Sobremesa Pavê de Ouro Branco",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 69,
        oldPrice: null,
        icon: "🍮",
        theme: "theme-pistachio",
        category: "sobremesas",
        categoryLabel: "Sobremesas",
        image: "/products/730611_Ouro_Branco_Prancheta_1.jpg",
        priceNote: "A partir de R$ 69,00",
        hasSizes: true,
        priceVariations: [{"variationId":"1033029","name":"P (6 à 8 Porções) - 650g","price":69},{"variationId":"1033030","name":"M 12 à 15 Porções - 1,3kg","price":129}],
    },
    {
        id: 19,
        originalId: 566823,
        name: "Torta de Morango",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 99,
        oldPrice: null,
        icon: "🍮",
        theme: "theme-pistachio",
        category: "sobremesas",
        categoryLabel: "Sobremesas",
        image: "/products/566823_Sem_t_tulo-5_Prancheta_1_Prancheta_1_Prancheta_1.jpg",
        priceNote: "R$ 99,00",
        hasSizes: false,
        priceVariations: [{"variationId":"793712","name":"Tamanho único","price":99}],
    },
    {
        id: 20,
        originalId: 566817,
        name: "Torta de Limão",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 99,
        oldPrice: null,
        icon: "🍮",
        theme: "theme-pistachio",
        category: "sobremesas",
        categoryLabel: "Sobremesas",
        image: "/products/566817_Sem_t_tulo-4_Prancheta_1.jpg",
        priceNote: "R$ 99,00",
        hasSizes: false,
        priceVariations: [{"variationId":"793705","name":"Tamanho único","price":99}],
    },
    {
        id: 21,
        originalId: 2813275,
        name: "Bolo Kinder",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/2813275_photo1784215281.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 22,
        originalId: 2813157,
        name: "Bolo de Mil Folhas de Morango",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/2813157_photo1784131440.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 23,
        originalId: 2813149,
        name: "Bolo de Brigadeiro Chocoball",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/2813149_photo1784140792.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 24,
        originalId: 2813143,
        name: "Bolo de Brigadeiro Colorido",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/2813143_photo1784147463.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 25,
        originalId: 2792772,
        name: "Bolo Trufado de Maracujá",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/2792772_photo1777930607.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 26,
        originalId: 2792769,
        name: "Bolo de Maracujá",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/2792769_photo1777930071.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 27,
        originalId: 372066,
        name: "Bolo de Abacaxi",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/372066_photo1674243976.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 28,
        originalId: 372064,
        name: "Bolo de Ameixa",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/372064_photo1674235817.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 29,
        originalId: 372572,
        name: "Bolo de Brigadeiro",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/372572_photo1674244511.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 30,
        originalId: 1680825,
        name: "Bolo de Beijinho com Doce de Leite",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/1680825_photo1674484252.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 31,
        originalId: 372573,
        name: "Bolo de Casadinho",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/372573_photo1674244561.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 32,
        originalId: 372576,
        name: "Bolo Choconozes",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/372576_photo1784140733.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 33,
        originalId: 372069,
        name: "Bolo de Ninho com Morango",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/372069_photo1674244372.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 34,
        originalId: 372057,
        name: "Bolo de Nozes",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/372057_photo1674234784.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 35,
        originalId: 372580,
        name: "Bolo Ferrero Rocher",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/372580_photo1674244649.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 36,
        originalId: 372577,
        name: "Bolo Floresta Negra",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/372577_WhatsApp_Image_2020-04-14_at_23.31.30.jpeg",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 37,
        originalId: 372583,
        name: "Bolo Ninho com Nutella",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/372583_photo1674244753.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 38,
        originalId: 631915,
        name: "Bolo Mousse de Chocolate com Brigadeiro e Morango",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/631915_photo1674484642.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 39,
        originalId: 372585,
        name: "Bolo Ouro Branco",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/372585_WhatsApp_Image_2020-04-14_at_23.30.59.jpeg",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 40,
        originalId: 1654413,
        name: "Brigadeiro Belga com Doce de Leite",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/1654413_photo.jpeg",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 41,
        originalId: 2771128,
        name: "Limão Siciliano",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/2771128_photo1772728987.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 42,
        originalId: 2156955,
        name: "Pistache com Frutas Vermelhas",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 0,
        oldPrice: null,
        icon: "🎂",
        theme: "theme-rose",
        category: "bolos",
        categoryLabel: "Bolos Confeitados",
        image: "/products/2156955_photo1782829510.jpeg.webp",
        priceNote: "Consultar",
        hasSizes: false,
    },
    {
        id: 43,
        originalId: 1894274,
        name: "Kit 1 - Média de 5 Pessoas",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 159,
        oldPrice: 208,
        discount: 24,
        icon: "⭐",
        theme: "theme-rose",
        category: "descontos",
        categoryLabel: "Descontos",
        image: "/products/1894274_photo1783003073.jpeg.webp",
        priceNote: "R$ 159,00",
        hasSizes: false,
        priceVariations: [{"variationId":"2446764","name":"Valor do Kit","price":159}],
    },
    {
        id: 44,
        originalId: 1894276,
        name: "Kit 3 - Média de 25 Pessoas",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 439,
        oldPrice: 549,
        discount: 20,
        icon: "⭐",
        theme: "theme-rose",
        category: "descontos",
        categoryLabel: "Descontos",
        image: "/products/1894276_photo1783003185.jpeg.webp",
        priceNote: "R$ 439,00",
        hasSizes: false,
        priceVariations: [{"variationId":"2446766","name":"Valor do Kit","price":439}],
    },
    {
        id: 45,
        originalId: 1894275,
        name: "Kit 2 - Média de 15 Pessoas",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 269,
        oldPrice: 319,
        discount: 16,
        icon: "⭐",
        theme: "theme-rose",
        category: "descontos",
        categoryLabel: "Descontos",
        image: "/products/1894275_photo1783003130.jpeg.webp",
        priceNote: "R$ 269,00",
        hasSizes: false,
        priceVariations: [{"variationId":"2446765","name":"Valor do Kit","price":269}],
    },
    {
        id: 46,
        originalId: 1894857,
        name: "Kit 6 - Média de 70 Pessoas",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 1499,
        oldPrice: 1686,
        discount: 11,
        icon: "⭐",
        theme: "theme-rose",
        category: "descontos",
        categoryLabel: "Descontos",
        image: "/products/1894857_photo1783003487.jpeg.webp",
        priceNote: "R$ 1.499,00",
        hasSizes: false,
        priceVariations: [{"variationId":"2447522","name":"valor do kit","price":1499}],
    },
    {
        id: 47,
        originalId: 1894278,
        name: "Kit 4 - Média de 40 Pessoas",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 699,
        oldPrice: 773,
        discount: 10,
        icon: "⭐",
        theme: "theme-rose",
        category: "descontos",
        categoryLabel: "Descontos",
        image: "/products/1894278_photo1783003259.jpeg.webp",
        priceNote: "R$ 699,00",
        hasSizes: false,
        priceVariations: [{"variationId":"2446768","name":"Valor do Kit","price":699}],
    },
    {
        id: 48,
        originalId: 1894279,
        name: "Kit 5- Média de 50 Pessoas",
        description: "Produto artesanal da Doce Magia Gourmet — encomende pelo WhatsApp.",
        price: 1099,
        oldPrice: 1175,
        discount: 6,
        icon: "⭐",
        theme: "theme-rose",
        category: "descontos",
        categoryLabel: "Descontos",
        image: "/products/1894279_photo1783003351.jpeg.webp",
        priceNote: "R$ 1.099,00",
        hasSizes: false,
        priceVariations: [{"variationId":"2446769","name":"Valor do Kit","price":1099}],
    }
];


// ============================================================
// CART STATE
// ============================================================
const cart = []; // [{ id, qty }]

// ============================================================
// SECURITY: HTML escape helper
// Used wherever product strings are interpolated into innerHTML
// templates (card title, name, icon, etc.). Prevents stored XSS
// if menu_data.json or PRODUCTS is ever fed by user-controlled
// data. Defaults to safe escape everywhere; only places that need
// raw HTML (like <img>) opt out by hard-coding the markup.
// ============================================================
function esc(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ============================================================
// DOM REFERENCES
// ============================================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const productsGrid = $('#productsGrid');
const cartBtn = $('#cartBtn');
const cartPanel = $('#cartPanel');
const cartClose = $('#cartClose');
const cartBody = $('#cartBody');
const cartCount = $('#cartCount');
const cartPill = $('#cartPill');
const cartSubtotal = $('#cartSubtotal');
const cartTotal = $('#cartTotal');
const cartDelivery = $('#cartDelivery');
const checkoutBtn = $('#checkoutBtn');
const overlay = $('#overlay');
const navToggle = $('#navToggle');
const primaryNav = $('#primaryNav');
const contactForm = $('#contactForm');
const formSuccess = $('#formSuccess');
const newsletterForm = $('#newsletterForm');
const siteHeader = $('#siteHeader');
const themeToggle = $('#themeToggle');
const scrollTop = $('#scrollTop');
const yearEl = $('#year');

let activeFilter = 'all';

// ============================================================
// INITIALIZATION
// ============================================================
function init() {
    renderProducts();
    setupNavToggle();
    setupCart();
    setupContactForm();
    setupNewsletterForm();
    setupFilters();
    setupCategories();
    setupScrollEffects();
    setupHeaderScroll();
    setupTheme();
    setupScrollTop();
    setupQuickView();
    animateCounters();
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ============================================================
// PRODUCT RENDERING & FILTERS
// ============================================================
function renderProducts() {
    if (!productsGrid) return;

    productsGrid.innerHTML = PRODUCTS.map(product => {
        const hasImage = !!product.image;
        const imgMarkup = hasImage
            ? `<img class="product-img" src="${esc(product.image)}" alt="${esc(product.name)}" loading="lazy" onerror="this.outerHTML='<span class=\\'candy-icon\\'>${esc(product.icon)}</span>'" />`
            : `<span class="candy-icon">${esc(product.icon)}</span>`;

        const basePrice = product.price || 0;
        const hasRealPrice = basePrice > 0;
        const discount = product.discount || null;
        const priceMain = hasRealPrice
            ? `<span class="price-base">${formatBRL(basePrice)}</span>${product.oldPrice ? `<small class="price-old">${formatBRL(product.oldPrice)}</small>` : ''}${discount ? `<span class="discount-badge">-${discount}%</span>` : ''}`
            : `<span class="price-consult">${product.priceNote || 'Consultar'}</span>`;
        const priceSub = hasRealPrice
            ? `<small class="price-sub">cada</small>`
            : `<small class="price-sub">Encomenda pelo WhatsApp</small>`;

        return `
        <article class="product-card reveal" data-id="${product.id}" data-category="${esc(product.category)}" data-base-price="${basePrice}">
            <div class="product-image ${product.theme} ${hasImage ? 'has-image' : ''}" aria-hidden="true">
                ${imgMarkup}
                <button class="product-quick-view" data-quick-view="${product.id}" aria-label="Ver detalhes de ${esc(product.name)}">
                    Ver detalhes →
                </button>
            </div>
            <div class="product-info">
                <span class="product-category">${esc(product.categoryLabel)}</span>
                <h3 class="product-name">${esc(product.name)}</h3>
                <p class="product-desc">${esc(product.description)}</p>
                <div class="product-qty-row">
                    <span class="product-qty-label">Quantidade:</span>
                    <div class="qty-stepper" role="group" aria-label="Quantidade para ${esc(product.name)}">
                        <button type="button" class="qty-step" data-qty-step="${product.id}" data-step="-1" aria-label="Diminuir quantidade">−</button>
                        <input type="number" min="1" step="1" value="1" class="qty-input" data-qty-input="${product.id}" aria-label="Quantidade" />
                        <button type="button" class="qty-step" data-qty-step="${product.id}" data-step="1" aria-label="Aumentar quantidade">+</button>
                    </div>
                </div>
                <div class="product-bottom">
                    <span class="product-price">${priceMain}${priceSub}<small class="price-total" data-total-for="${product.id}">${hasRealPrice ? `Total: ${formatBRL(basePrice)}` : ''}</small></span>
                    <button class="btn-add" data-add-id="${product.id}" data-add-qty="1" aria-label="Adicionar ${esc(product.name)} ao carrinho">
                        <span>+</span> Add
                    </button>
                </div>
            </div>
        </article>
        `;
    }).join('');

    // Wire up qty steppers (buttons +/-, and input typing)
    productsGrid.querySelectorAll('.qty-stepper').forEach(stepper => {
        const idMatch = stepper.querySelector('[data-qty-step], [data-qty-input]');
        if (!idMatch) return;
        const pid = idMatch.dataset.qtyStep || idMatch.dataset.qtyInput;
        const input = stepper.querySelector(`[data-qty-input="${pid}"]`);
        const updateTotal = (val) => {
            const card = stepper.closest('.product-card');
            const basePrice = parseFloat(card.dataset.basePrice || '0');
            const totalEl = card.querySelector(`[data-total-for="${pid}"]`);
            const addBtn = card.querySelector(`[data-add-id="${pid}"]`);
            if (addBtn) addBtn.dataset.addQty = String(val);
            if (totalEl && basePrice > 0) {
                totalEl.textContent = `Total: ${formatBRL(basePrice * val)}`;
            }
        };
        stepper.querySelectorAll(`[data-qty-step="${pid}"]`).forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const step = parseInt(btn.dataset.step, 10);
                let val = parseInt(input.value || '1', 10) + step;
                if (val < 1) val = 1;
                if (val > 999) val = 999;
                input.value = String(val);
                updateTotal(val);
            });
        });
        input.addEventListener('input', () => {
            let val = parseInt(input.value || '1', 10);
            if (isNaN(val) || val < 1) val = 1;
            if (val > 999) val = 999;
            updateTotal(val);
        });
        input.addEventListener('click', e => e.stopPropagation());
        input.addEventListener('keydown', e => e.stopPropagation());
    });

    // Wire up event listeners
    productsGrid.querySelectorAll('[data-add-id]').forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });

    productsGrid.querySelectorAll('[data-quick-view]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openQuickView(parseInt(btn.dataset.quickView, 10));
        });
    });

    productsGrid.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', e => {
            if (e.target.closest('.btn-add, .product-quick-view, .qty-step, .qty-input')) return;
            const id = parseInt(card.dataset.id, 10);
            openQuickView(id);
        });
    });

    observeRevealElements();
}

function applyFilter(filter) {
    activeFilter = filter;
    if (!productsGrid) return;

    const cards = productsGrid.querySelectorAll('.product-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const matches = filter === 'all' || card.dataset.category === filter;
        if (matches) {
            card.classList.remove('hidden');
            visibleCount++;
            // Re-trigger reveal animation
            setTimeout(() => card.classList.add('visible'), 50);
        } else {
            card.classList.add('hidden');
            card.classList.remove('visible');
        }
    });

    // Update category card active state
    $$('.category-card').forEach(card => {
        const isActive = card.dataset.category === filter;
        card.classList.toggle('active', isActive);
    });

    // Update filter button active state
    $$('.filter-btn').forEach(btn => {
        const isActive = btn.dataset.filter === filter;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
    });
}

function setupFilters() {
    $$('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });
}

function setupCategories() {
    $$('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.dataset.category;
            applyFilter(cat);
            // Smooth scroll to products section
            $('#products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// ============================================================
// CART LOGIC
// ============================================================
function handleAddToCart(event) {
    const btn = event.currentTarget;
    const id = parseInt(btn.dataset.addId, 10);
    const qty = parseInt(btn.dataset.addQty || '1', 10);
    addToCart(id, qty);

    // Visual feedback on the button
    btn.classList.add('added');
    const original = btn.innerHTML;
    const qtyLabel = qty > 1 ? ` (${qty})` : '';
    btn.innerHTML = `✓ Adicionado${qtyLabel}`;
    setTimeout(() => {
        btn.innerHTML = original;
        btn.classList.remove('added');
    }, 1200);
}

function addToCart(id, qty = 1) {
    const item = cart.find(c => c.id === id);
    if (item) item.qty += qty;
    else cart.push({ id, qty });
    updateCartUI();
    bumpCartCount();
}

function removeFromCart(id) {
    const idx = cart.findIndex(c => c.id === id);
    if (idx !== -1) cart.splice(idx, 1);
    updateCartUI();
}

function changeQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(id);
        return;
    }
    updateCartUI();
}

function getCartSubtotal() {
    return cart.reduce((sum, c) => {
        const product = PRODUCTS.find(p => p.id === c.id);
        return sum + (product ? product.price * c.qty : 0);
    }, 0);
}

function getCartItemCount() {
    return cart.reduce((sum, c) => sum + c.qty, 0);
}

function updateCartUI() {
    const count = getCartItemCount();
    cartCount.textContent = count;
    if (cartPill) cartPill.textContent = `${count} ${count === 1 ? 'item' : 'itens'}`;

    if (cart.length === 0) {
        cartBody.innerHTML = `
            <div class="cart-empty">
                <span class="cart-empty-icon" aria-hidden="true">🛒</span>
                <p><strong>Seu carrinho está vazio</strong></p>
                <p>Adicione alguns doces!</p>
            </div>
        `;
    } else {
        cartBody.innerHTML = cart.map(cartItem => {
            const product = PRODUCTS.find(p => p.id === cartItem.id);
            if (!product) return '';
            const lineTotal = product.price * cartItem.qty;
            const itemImg = product.image
                ? `<img src="${esc(product.image)}" alt="${esc(product.name)}" onerror="this.outerHTML='<span style=\\'font-size:1.6rem\\'>${esc(product.icon)}</span>'" />`
                : `<span style="font-size:1.6rem">${esc(product.icon)}</span>`;
            return `
                <div class="cart-item" data-cart-id="${product.id}">
                    <div class="cart-item-image ${esc(product.theme)} ${product.image ? 'has-image' : ''}" aria-hidden="true">${itemImg}</div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${esc(product.name)}</div>
                        <div class="cart-item-price">${product.price > 0 ? formatBRL(lineTotal) : 'A consultar'}</div>
                        <div class="cart-qty">
                            <button class="qty-btn" data-qty-action="dec" data-qty-id="${product.id}" aria-label="Decrease quantity">−</button>
                            <span class="qty-value">${cartItem.qty}</span>
                            <button class="qty-btn" data-qty-action="inc" data-qty-id="${product.id}" aria-label="Increase quantity">+</button>
                        </div>
                    </div>
                    <button class="cart-remove" data-remove-id="${product.id}" aria-label="Remove ${esc(product.name)} from cart">✕</button>
                </div>
            `;
        }).join('');

        cartBody.querySelectorAll('[data-qty-action]').forEach(btn => {
            btn.addEventListener('click', e => {
                const id = parseInt(e.currentTarget.dataset.qtyId, 10);
                changeQty(id, e.currentTarget.dataset.qtyAction === 'inc' ? 1 : -1);
            });
        });
        cartBody.querySelectorAll('[data-remove-id]').forEach(btn => {
            btn.addEventListener('click', e => {
                removeFromCart(parseInt(e.currentTarget.dataset.removeId, 10));
            });
        });
    }

    const subtotal = getCartSubtotal();
    cartSubtotal.textContent = formatCartTotal(subtotal);
    cartTotal.textContent = formatCartTotal(subtotal);
    if (cartDelivery) {
        cartDelivery.textContent = 'A combinar';
    }
}

function bumpCartCount() {
    cartCount.classList.remove('bump');
    void cartCount.offsetWidth;
    cartCount.classList.add('bump');
}

function setupCart() {
    const openCart = () => {
        cartPanel.classList.add('open');
        cartPanel.setAttribute('aria-hidden', 'false');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    const closeCart = () => {
        cartPanel.classList.remove('open');
        cartPanel.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    cartBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (cartPanel.classList.contains('open')) closeCart();
            closeQuickView();
        }
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio! Adicione alguns doces antes de finalizar.');
            return;
        }
        const lines = cart.map(cartItem => {
            const p = PRODUCTS.find(pp => pp.id === cartItem.id);
            if (!p) return '';
            return `• ${cartItem.qty}x ${p.name}`;
        }).filter(Boolean).join('\n');

        const message = `Olá! Gostaria de fazer uma encomenda na Doce Magia:\n\n${lines}\n\nPodem me passar o valor e a disponibilidade? 😊`;
        const phone = '5511980354028';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
}

// ============================================================
// QUICK VIEW MODAL
// ============================================================
let quickViewEl = null;

function setupQuickView() {
    // Create modal element on demand
    quickViewEl = document.createElement('div');
    quickViewEl.className = 'modal-overlay';
    quickViewEl.setAttribute('role', 'dialog');
    quickViewEl.setAttribute('aria-modal', 'true');
    quickViewEl.setAttribute('aria-labelledby', 'modal-title');
    quickViewEl.innerHTML = `
        <div class="modal" id="quickViewModal">
            <button class="modal-close" aria-label="Close modal">✕</button>
            <div class="modal-image" id="modalImage"></div>
            <div class="modal-body">
                <span class="modal-category" id="modalCategory"></span>
                <h3 class="modal-name" id="modal-title"></h3>
                <div class="product-rating" id="modalRating"></div>
                <p class="modal-desc" id="modalDesc"></p>
                <div class="modal-price" id="modalPrice"></div>
                <button class="btn btn-primary btn-block" id="modalAddBtn">
                    Adicionar ao carrinho
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(quickViewEl);

    quickViewEl.querySelector('.modal-close').addEventListener('click', closeQuickView);
    quickViewEl.addEventListener('click', (e) => {
        if (e.target === quickViewEl) closeQuickView();
    });
}

function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !quickViewEl) return;

    const hasImage = !!product.image;
    const imgHtml = hasImage
        ? `<img src="${esc(product.image)}" alt="${esc(product.name)}" onerror="this.outerHTML='<span style=\\'font-size:6rem\\'>${esc(product.icon)}</span>'" />`
        : `<span style="font-size:6rem">${esc(product.icon)}</span>`;

    quickViewEl.querySelector('#modalImage').className = `modal-image ${product.theme} ${hasImage ? 'has-image' : ''}`;
    quickViewEl.querySelector('#modalImage').innerHTML = imgHtml;
    quickViewEl.querySelector('#modalCategory').textContent = product.categoryLabel;
    quickViewEl.querySelector('#modal-title').textContent = product.name;
    quickViewEl.querySelector('#modalRating').innerHTML = `
        <span class="stars-mini">★★★★★</span>
        <span>Doce Magia Gourmet — Osasco/SP</span>
    `;
    quickViewEl.querySelector('#modalDesc').textContent = product.description;

    const basePrice = product.price || 0;
    const hasRealPrice = basePrice > 0;
    const discount = product.discount || null;
    const priceEl = quickViewEl.querySelector('#modalPrice');
    const priceBaseLine = hasRealPrice
        ? `<div class="modal-price-main" data-modal-base-price="${basePrice}">${formatBRL(basePrice)} <small style="font-size:0.6em;color:var(--text-soft);font-weight:500;">cada</small>${product.oldPrice ? `<small class="modal-price-old">${formatBRL(product.oldPrice)}</small>` : ''}${discount ? `<span class="discount-badge">-${discount}%</span>` : ''}</div>`
        : `<div class="modal-price-main">${product.priceNote || 'Consultar'}</div>`;
    const priceSub = hasRealPrice
        ? `<small class="modal-price-sub">Total: <span data-modal-total>${formatBRL(basePrice)}</span></small>`
        : `<small class="modal-price-sub">Encomenda finalizada via WhatsApp</small>`;
    priceEl.innerHTML = priceBaseLine + priceSub;

    // Inject quantity stepper if not already there
    let qtyRow = quickViewEl.querySelector('#modalQty');
    if (!qtyRow) {
        qtyRow = document.createElement('div');
        qtyRow.id = 'modalQty';
        qtyRow.className = 'modal-qty-row';
        qtyRow.innerHTML = `
            <span class="modal-qty-label">Quantidade:</span>
            <div class="qty-stepper modal-stepper">
                <button type="button" class="qty-step" data-modal-step="-1" aria-label="Diminuir quantidade">−</button>
                <input type="number" min="1" step="1" value="1" class="qty-input" data-modal-qty-input aria-label="Quantidade" />
                <button type="button" class="qty-step" data-modal-step="1" aria-label="Aumentar quantidade">+</button>
            </div>
        `;
        priceEl.insertAdjacentElement('afterend', qtyRow);
    } else {
        const inp = qtyRow.querySelector('[data-modal-qty-input]');
        if (inp) inp.value = '1';
    }

    let modalQty = 1;
    const updateModalTotal = () => {
        const totalEl = quickViewEl.querySelector('[data-modal-total]');
        if (totalEl && basePrice > 0) {
            totalEl.textContent = formatBRL(basePrice * modalQty);
        }
    };
    qtyRow.querySelectorAll('[data-modal-step]').forEach(btn => {
        btn.onclick = () => {
            const input = qtyRow.querySelector('[data-modal-qty-input]');
            const step = parseInt(btn.dataset.modalStep, 10);
            modalQty = (parseInt(input.value || '1', 10) || 1) + step;
            if (modalQty < 1) modalQty = 1;
            if (modalQty > 999) modalQty = 999;
            input.value = String(modalQty);
            updateModalTotal();
        };
    });
    const modalInput = qtyRow.querySelector('[data-modal-qty-input]');
    if (modalInput) {
        modalInput.oninput = () => {
            let v = parseInt(modalInput.value || '1', 10);
            if (isNaN(v) || v < 1) v = 1;
            if (v > 999) v = 999;
            modalQty = v;
            updateModalTotal();
        };
    }

    const addBtn = quickViewEl.querySelector('#modalAddBtn');
    addBtn.onclick = () => {
        addToCart(productId, modalQty);
        const qtyLabel = modalQty > 1 ? ` (${modalQty})` : '';
        addBtn.innerHTML = `✓ Adicionado${qtyLabel}!`;
        setTimeout(() => { addBtn.innerHTML = 'Adicionar ao carrinho'; }, 1500);
    };

    quickViewEl.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    if (!quickViewEl) return;
    quickViewEl.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================================
// MOBILE NAVIGATION TOGGLE
// ============================================================
function setupNavToggle() {
    if (!navToggle) return;

    navToggle.addEventListener('click', () => {
        const isOpen = primaryNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    primaryNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            primaryNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ============================================================
// CONTACT FORM VALIDATION
// ============================================================
function setupContactForm() {
    if (!contactForm) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const setError = (fieldName, message) => {
        const input = contactForm.querySelector(`[name="${fieldName}"]`);
        const errorEl = contactForm.querySelector(`[data-error-for="${fieldName}"]`);
        if (message) {
            if (input) input.classList.add('invalid');
            if (errorEl) errorEl.textContent = message;
        } else {
            if (input) input.classList.remove('invalid');
            if (errorEl) errorEl.textContent = '';
        }
    };

    contactForm.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', () => setError(input.name, ''));
    });

    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        let isValid = true;

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (name.length < 2) {
            setError('name', 'Por favor, informe seu nome (mínimo 2 caracteres).');
            isValid = false;
        }
        if (!emailRegex.test(email)) {
            setError('email', 'Por favor, informe um e-mail válido.');
            isValid = false;
        }
        if (message.length < 10) {
            setError('message', 'A mensagem deve ter pelo menos 10 caracteres.');
            isValid = false;
        }

        if (!isValid) return;

        contactForm.reset();
        formSuccess.textContent = '✨ Mensagem enviada com sucesso! Responderemos em até 24h pelo WhatsApp.';
        formSuccess.classList.add('show');

        setTimeout(() => {
            formSuccess.classList.remove('show');
            formSuccess.textContent = '';
        }, 6000);
    });
}

// ============================================================
// NEWSLETTER FORM
// ============================================================
function setupNewsletterForm() {
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', e => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input[type="email"]');
        const btn = newsletterForm.querySelector('button');
        if (!input.value) return;

        const original = btn.textContent;
        btn.textContent = '✓ Cadastrado!';
        input.value = '';
        setTimeout(() => { btn.textContent = original; }, 2500);
    });
}

// ============================================================
// SMOOTH SCROLL + ACTIVE NAV LINK
// ============================================================
function setupScrollEffects() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const setActiveLink = () => {
        const scrollPos = window.scrollY + 150;
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) current = section.id;
        });
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${current}`;
            link.style.color = isActive ? 'var(--gold-deep)' : '';
            link.style.fontWeight = isActive ? '700' : '';
        });
    };

    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();
}

// ============================================================
// HEADER SCROLL EFFECT
// ============================================================
function setupHeaderScroll() {
    if (!siteHeader) return;
    const handleScroll = () => {
        siteHeader.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

// ============================================================
// SCROLL-TO-TOP BUTTON
// ============================================================
function setupScrollTop() {
    if (!scrollTop) return;
    window.addEventListener('scroll', () => {
        scrollTop.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// DARK MODE
// ============================================================
function setupTheme() {
    if (!themeToggle) return;

    // Check saved preference
    const saved = localStorage.getItem('sweet-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('sweet-theme', isDark ? 'dark' : 'light');
    });
}

// ============================================================
// COUNT-UP ANIMATION FOR STATS
// ============================================================
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count, 10);
                const duration = 1500;
                const start = performance.now();

                const step = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(target * eased);
                    el.textContent = current.toLocaleString('pt-BR');
                    if (progress < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

// ============================================================
// INTERSECTION OBSERVER — REVEAL ELEMENTS
// ============================================================
let revealObserver;

function observeRevealElements() {
    if (!revealObserver) {
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        });
    }
    document.querySelectorAll('.reveal:not(.visible):not(.hidden)').forEach(el => {
        revealObserver.observe(el);
    });
}

// ============================================================
// UTILITIES
// ============================================================
function formatPrice(value) {
    if (!value || value <= 0) return 'Consultar';
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function formatBRL(value) {
    // Always format as BRL even for 0 (used for live total computations)
    return (value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function formatCartTotal(subtotal) {
    if (subtotal <= 0) return 'A combinar';
    return formatBRL(subtotal) + ' *';
}

// ============================================================
// BOOT
// ============================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}