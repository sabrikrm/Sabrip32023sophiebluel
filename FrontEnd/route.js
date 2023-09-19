//route Works

fetch("http://localhost:5678/api/works")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);// Affichage de la réponse JSON 
    for(let i=0; i<value.length; i++)
     {
       console.log(value[i].imageUrl)// Affichage de chaque URL d'image
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
  
async function fetchApiWorks() {
  try {
    await fetch(api + "works")
      .then((res) => res.json())
      .then((data) => (cards = data));
    const btnTitle = getButtonTitles(cards);
    console.log(`le titre des BTN filtres  : ${btnTitle.join("  /  ")}`);
    console.log(cards);
    filtersBtn(btnTitle);// Création des boutons de filtrage
    workDisplay(cards);// Affichage des "works"
  } catch (error) {
    console.log(
      `Erreur chargement Fonction fetchApiWorks Cartes des Projets:  ${error}`
    );
  }
}

// route Categories
async function fetchApiCategories() {
  try {
    await fetch(api + "categories")
      .then((res) => res.json())
      .then((data) => (categories = data));
    console.log(categories);// Affichage des catégories
  } catch (error) {
    console.log(
      `Erreur chargement Fonction fetchApiWorks Cartes des Projets:  ${error}`
    );
  }
}


function getButtonTitles(cards) {
  return [...new Set(cards.map((card) => card.category.name))];
}


function filtersBtn(btnTitle) {

  const allButton = document.createElement("button");
  allButton.classList.add("btn", "active");
  allButton.textContent = "Tous";
  filterButtons.appendChild(allButton);
  filterButtons.classList.add("filter");

  

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
      categoryIdValue = e.target.textContent;
      console.log(categoryIdValue);
      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });
      e.target.classList.add("active");
      workDisplay();
    });
  });
}