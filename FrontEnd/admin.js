// Vérification du token pour autoriser le mode administrateur
function checkToken() {
  const token = localStorage.getItem("token"); // Récupère le token du localStorage
  if (token) {
    adminEdition(); // Appelle la fonction qui active le mode administrateur
  } 
}

// Suppression du token lors de la fermeture de l'onglet ou du navigateur
function removeToken() {
  localStorage.removeItem("token");
  sessionStorage.removeItem("deletedImages");
}
window.addEventListener("unload", removeToken); // Ajout d'un écouteur d'événement sur la fermeture de la fenêtre

// Activation du mode administrateur
function adminEdition() {
  adminHTML(); // Modifie le HTML pour le mode admin
  
  // Configuration de la modal pour éditer/supprimer
  const modalJs = document.getElementById("titleProjectRemove");
  modalJs.addEventListener("click", (e) => {
    e.preventDefault();
    modalHTML();
    displayModal();
    openModal();
    editModal();
  });

  // Suppression des travaux depuis l'API
  const deleteWorksApi = document.querySelector("body > div > button");
  deleteWorksApi.addEventListener("click", (e) => {
    e.preventDefault();
    functionDeleteWorksApi(); // Appelle la fonction de suppression des travaux
  });
}
//AUTRE FONCTION DU MODE ADMIN
const adminHTML = () => {
  //PARTIE SITE AVEC AJOUT DES ELTMTS EDITOR SUR DOM
 

  //Créer le bandeau Admin Editor
  const flagEditor = document.createElement("div");
  flagEditor.classList.add("flagEditor");
  document
    .querySelector("body")
    .insertAdjacentElement("afterbegin", flagEditor);

  const spanFlagEditor = document.createElement("span");
  spanFlagEditor.classList.add("projectRemove");
  spanFlagEditor.textContent = "Mode édition";

  //Créer Le SPAN avec le "i"
  const iconFlagEditor = document.createElement("i");
  iconFlagEditor.className = "fa-regular fa-pen-to-square";

  //Insérer l'élément i parent avant le texte de span
  spanFlagEditor.insertBefore(iconFlagEditor, spanFlagEditor.firstChild);

  const btnFlagEditor = document.createElement("button");
  btnFlagEditor.textContent = "publier les changements";

  flagEditor.appendChild(spanFlagEditor);
  flagEditor.appendChild(btnFlagEditor);

  //Pointage des position à injecter
  const figure = document.querySelector("#introduction figure");
  const titleProject = document.querySelector("#portfolio > h2");

  //clonage du Span au dessus! true = Mm enfant aussi
  //SPAN "Mode édition" en dessou de Sophie
  const spanFigure = spanFlagEditor.cloneNode(true);
  spanFigure.classList.remove("projectRemove");
  spanFigure.classList.add("figureRemove");
  //SPAN "Mode édition" des Projets
  const spanTitleProject = spanFlagEditor.cloneNode(true);
  spanTitleProject.classList.remove("projectRemove");
  spanTitleProject.setAttribute("id", "titleProjectRemove");

  //INJECTION  SPAN
  figure.appendChild(spanFigure);
  titleProject.appendChild(spanTitleProject);


  //Login -> Logout HTML
  

  // Sélectionner le <li> pour logout
  const logout = document.querySelector(
    "body > header > nav > ul > li:nth-child(3)"
  );

  // Créer un élément <a> pour le lien de déconnexion logout au lieu de login
  const logoutLink = document.createElement("a");
  logoutLink.href = "../index.html";

  const logoutText = document.createTextNode("logout");
  logoutLink.appendChild(logoutText);

  logout.innerHTML = "";
  logout.appendChild(logoutLink);

  //  deconnexion
  logoutLink.addEventListener("click", (event) => {
    event.preventDefault();
    removeToken();
    window.location.assign("./index.html");
  });

  //Ajout class pour mieux intégrer le FlagEditor 
  document.body.classList.add("marginTop");

  //Delete les filtres de Recherche HTML pendant le mode admin
  filterButtons.remove();
};
function openModal() {
  let deletedImages = {};
  //evitez les doublettes images Gallery
  document.getElementById("modalGrid").innerHTML = "";

  //INJECTION DES ELEMENTS FETCHER
  // Récupérer les liens des images
  // nouveau tableau
  const imagesUrl = [...document.querySelectorAll(".gallery img")].map((img) =>
    img.getAttribute("src")
  );

  // Créer un Set pour n'avoir que des liens uniques
  const imagesUrlSet = new Set(imagesUrl);

  //INJECTIONS DES CARTES DS MODAL
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const imageElements = [...imagesUrlSet].map((link, index) => {
    const container = document.createElement("figure");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const iconDelete = document.createElement("i");

    // ajouter l'attribut data-card-id
    container.setAttribute("data-card-id", cards[index].id);
    iconDelete.id = "deleteIcon";
    iconDelete.classList.add("fa-solid", "fa-trash-can", "iconModal");
    iconDelete.setAttribute("aria-hidden", "true");
    img.src = link;
    p.textContent = "éditer";
    container.appendChild(img);
    container.appendChild(p);
    container.appendChild(iconDelete);

    // Ajouter l'icône de déplacement uniquement sur le premier élément
    if (index === 0) {
      const iconMove = document.createElement("i");
      iconMove.id = "moveIcon";
      iconMove.classList.add(
        "fa-solid",
        "fa-arrows-up-down-left-right",
        "iconModal"
      );
      container.appendChild(iconMove);
    }

    //DELETE icone Corbeille
    iconDelete.addEventListener("click", async (e) => {
      e.preventDefault();
      const cardDelete = e.target.parentNode.getAttribute("data-card-id");
      removeElement(cardDelete);
      deletedImages[cardDelete] = true;
      console.log(deletedImages);

      // Convertir l'objet en chaîne de caractères JSON
      const deletedImagesJSON = JSON.stringify(deletedImages);
      // Stocker JSON dans sessionStorage
      sessionStorage.setItem("deletedImages", deletedImagesJSON);
    });

    //FONCTION DELETE SUR LE DOM UNIQUEMENT appellé ds l evenement au click delete:

    function removeElement(cardDelete) {
      const card = document.querySelector(`[data-card-id="${cardDelete}"]`);
      if (card && card.parentNode) {
        card.parentNode.removeChild(card);
        container.remove(card);
      }
    }

    //FONCTION DELETE ALL DU DOM DEPUIS MODAL
    const deleteALL = document.querySelector("#deleteAllWorks");
    deleteALL.addEventListener("click", () => {
      const figureModals = document.querySelectorAll("#modalGrid figure");

      const galleryModals = document.querySelectorAll("#portfolio figure");

      const deletedImages =
        JSON.parse(sessionStorage.getItem("deletedImages")) || {};

      const imageIds = [];

      figureModals.forEach((figure) => {
        const dataCardId = figure.getAttribute("data-card-id");

        imageIds.push(dataCardId);
        
        // stocke l'ID deletedImages
        deletedImages[dataCardId] = true;
      });

      // DELETE TOUTES LES CARTES
      figureModals.forEach((figure) => figure.remove());
      galleryModals.forEach((figure) => figure.remove());

      // Stocke les ID SESSIONTORAGE
      sessionStorage.setItem("deletedImages", JSON.stringify(deletedImages));
    });
    return container;
  });

  const galleryMap = document.getElementById("modalGrid");
  galleryMap.append(...imageElements);
}
const functionDeleteWorksApi = () => {
  // Récupérer la chaîne de sessionStorage
  const deletedImagesJSON = sessionStorage.getItem("deletedImages");

  // Convertir la chaîne en objet JavaScript
  const deletedImages = JSON.parse(deletedImagesJSON);

  // Supprimer chaque image du SESSION STORAGE
  //méthode JavaScript qui renvoie un tableau contenant les clés d'un objet
  Object.keys(deletedImages).forEach(async (id) => {
    try {
      if (token === false) return;
  
      const response = await fetch(`${api}works/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        // Succès
      } else {
        throw new Error(response.statusText);
      }
    } catch (e) {
      // Gestion des erreurs
    }
  });
}  
const buttonElement = document.getElementById("btnFlagEditor");

buttonElement.addEventListener("click", function(event) {

  event.preventDefault(); 
})