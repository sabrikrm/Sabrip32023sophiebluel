// Déclaration des variables et constantes globales
const api = "http://localhost:5678/api/";
const token = localStorage.getItem("token");  // Récupération du token depuis le stockage local
let categoryIdValue = "";  // Catégorie actuellement sélectionnée (vide par défaut)
let categories = [];  // stockage des catégories provenant de l'API
let btnTitle = [];  // stockage des titres de boutons
const btnSort = document.querySelectorAll(".btn");  // Boutons de tri
const filterButtons = document.createElement("div");  // Conteneur pour les boutons de filtre
const portfolioSection = document.querySelector("#portfolio");  // Section du portfolio dans le DOM

// ajout du conteneur de boutons de filtre sous le titre "h2" de la section portfolio
portfolioSection.querySelector("h2").insertAdjacentElement("afterend", filterButtons);
const imageUrls = [];  // Stockage des URLs des images


// fonction pour créer le template HTML d'une carte
function cardsTemplate(card) {
  const cardDisplay = document.createElement("figure");
  
  // ajout des attributs au conteneur de la carte
  cardDisplay.setAttribute("data-card-id", card.id);
  cardDisplay.setAttribute("value", card.categoryId);
  
  // création et ajout de l'image à la carte
  const imgCard = document.createElement("img");
  imgCard.setAttribute("src", card.imageUrl);
  imgCard.setAttribute("alt", "photo de " + card.title);

  // création et ajout du titre à la carte
  const titleCard = document.createElement("figcaption");
  titleCard.textContent = card.title;

  // assemblage des éléments dans la carte et ajout au portfolio
  cardDisplay.appendChild(imgCard);
  cardDisplay.appendChild(titleCard);
  portfolioSection.appendChild(cardDisplay);

  return cardDisplay;
}

// Fonction pour afficher les œuvres en fonction de la catégorie sélectionnée
function workDisplay() {
  const gallery = document.querySelector(".gallery");  // section de la galerie dans le DOM
  const cardDisplay = new Set();  // utilisation d'un Set pour éviter les doublons
  gallery.innerHTML = "";  // nettoyage de la galerie avant affichage

  // Filtrage des cartes selon la catégorie
  cards.forEach((card) => {
    if (categoryIdValue === "Tous" || card.category.name === categoryIdValue) {
      cardDisplay.add(card);
    }
  });

  // Affichage des cartes dans la galerie
  cardDisplay.forEach((card) => {
    gallery.appendChild(cardsTemplate(card));
  });
}

// Chargement initial de l'application
window.addEventListener("load", (e) => {
  fetchApiWorks();  // Chargement des œuvres depuis l'API
  fetchApiCategories();  // Chargement des catégories depuis l'API
  categoryIdValue = "Tous";  // Valeur par défaut de la catégorie
  checkToken();  // Vérification de l'authentification
});
