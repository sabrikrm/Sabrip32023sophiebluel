// Fonction pour récupérer les données des œuvres depuis l'API
async function fetchApiWorks() {
  try {
    await fetch(api + "works")
      .then((res) => res.json())
      .then((data) => (cards = data));
    
    // Récupération des titres des boutons de filtre
    const btnTitle = getButtonTitles(cards);
    
    // Création des boutons de filtrage
    filtersBtn(btnTitle);
    
    // Affichage des "works"
    workDisplay(cards);
    
  } catch (error) {
    // Gestion des erreurs
  }
}

// Fonction pour récupérer les données des catégories depuis l'API
async function fetchApiCategories() {
  try {
    await fetch(api + "categories")
      .then((res) => res.json())
      .then((data) => (categories = data));
    
  } catch (error) {
    // Gestion des erreurs
  }
}

// Fonction pour extraire les noms de catégories uniques à partir des cartes
function getButtonTitles(cards) {
  return [...new Set(cards.map((card) => card.category.name))];
}

// Fonction pour créer les boutons de filtrage
function filtersBtn(btnTitle) { 
  // Création du bouton 'Tous'
  const allButton = document.createElement("button");
  allButton.classList.add("btn", "active");
  allButton.textContent = "Tous";
  filterButtons.appendChild(allButton);
  
  // Ajout d'une classe aux boutons de filtrage
  filterButtons.classList.add("filter");  

  // Création des autres boutons à partir des noms de catégories
  const buttons = [
    allButton,
    ...btnTitle.map((categoryName) => {
      const button = document.createElement("button");
      button.classList.add("btn");
      button.textContent = categoryName;
      filterButtons.appendChild(button);
      return button;
    }),
  ];

  // Ajout d'un écouteur d'événement sur chaque bouton
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Récupération de la valeur de l'ID de la catégorie
      categoryIdValue = e.target.textContent;
      
      // Retrait de la classe 'active' de tous les boutons
      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });
      
      // Ajout de la classe 'active' au bouton cliqué
      e.target.classList.add("active");
      
      // Actualisation de l'affichage
      workDisplay();
    });
  });
}