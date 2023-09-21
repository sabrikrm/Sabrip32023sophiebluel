//route Works

//route Works

fetch("http://localhost:5678/api/works")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    for(let i=0; i<value.length; i++)
     {
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
  //fetch works + stockage dans variable
  
async function fetchApiWorks() {
  try {
    await fetch(api + "works")
      .then((res) => res.json())
      .then((data) => (cards = data));
      // Récupération des titres des boutons de filtre
    const btnTitle = getButtonTitles(cards);
    
   
    filtersBtn(btnTitle);// Création des boutons de filtrage
    workDisplay(cards);// Affichage des "works"
  } catch (error) {
   
  }
}

// route Categories
async function fetchApiCategories() {
  try {
    await fetch(api + "categories")
      .then((res) => res.json())
      .then((data) => (categories = data));

  } catch (error) {
    // gestion errerur
  }
}


function getButtonTitles(cards) {
  return [...new Set(cards.map((card) => card.category.name))];
}

// Fonction pour créer les boutons de filtre
function filtersBtn(btnTitle) { 

  const allButton = document.createElement("button");
  allButton.classList.add("btn", "active");
  allButton.textContent = "Tous";
  filterButtons.appendChild(allButton);
  filterButtons.classList.add("filter");  // Ajout de classe pour les boutons de filtrage

  

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

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      categoryIdValue = e.target.textContent; // Récupération de la valeur de l'ID de la catégorie
      console.log(categoryIdValue);
      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });
      e.target.classList.add("active");
      workDisplay();
    });
  });
}