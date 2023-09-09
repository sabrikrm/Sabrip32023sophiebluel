// *****************************************************************************************************
//**********************************  AFFICHAGE DE LA MODAL  *******************************************
// *****************************************************************************************************
function editModal() {
    const addProject = document.getElementById("editModal");
    const inputFile = document.getElementById("filetoUpload");
    const selectCategory = document.getElementById("category");
    const editSection = document.querySelector("#editSection");
    const addToApi = document.getElementById("editWorks");
    const gallerySection = document.querySelector("#modalEdit");
    const previewModal = document.querySelector("#previewModal");
    let iCanSubmit = false;
  
    //*************************************Cache - Cache differentes section Modale
    addProject.addEventListener("click", () => {
      gallerySection.style.display = "none";
      editSection.style.display = "";
      previewModal.style.display = "initial";
    });
  
    previewModal.addEventListener("click", () => {
      gallerySection.style.display = "";
      editSection.style.display = "none";
      previewModal.style.display = "none";
    });
  
    //*************************************PARTIE IMG
    inputFile.addEventListener("change", addPicture);
  
    //*************************************PARTIE CATEGORIE
  
    // Utiliser les données de l'API du 2e Fetch pour générer les options de l'élément select
  
    if (selectCategory.options.length === 0) {
      const emptyOption = document.createElement("option");
      emptyOption.value = "";
      emptyOption.textContent = "";
      selectCategory.appendChild(emptyOption);
  
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.textContent = category.name;
        option.setAttribute("data-id", category.id);
        selectCategory.appendChild(option);
      });
    }
    //************************************* Condition Formulaire POST
  
    editSection.addEventListener("input", () => {
      const editTitle = document.querySelector("#title");
      const errorImg = document.getElementById("errorImg");
      const titleError = document.querySelector("#ErrorTitleSubmit");
      const categoryError = document.querySelector("#ErrorCategorySubmit");
      const submitForm = document.querySelector(
        "#editWorks > div.footerModal.editFooter > input[type=submit]"
      );
      iCanSubmit = false;
      titleSelected = false;
      categorySelected = false;
      submitForm.style.background = " grey";
      let category = document.querySelector("#category").value;
      const title = editTitle.value;
      const image = inputFile.files[0];
      // console.log(typeof image);
  
      if (image === null || image === undefined) {
        errorImg.textContent = "Veuillez selectionnez une image";
        imageSelected = false;
      } else if (title.length < 1) {
        titleError.textContent = "Ajoutez un titre";
        titleSelected = false;
      } else if (category === "") {
        categoryError.textContent = "Choisissez une catégorie";
        titleError.textContent = "";
        categorySelected = false;
      } else {
        //submitForm.style.background = " #1d6154";
        titleError.textContent = "";
        categoryError.textContent = "";
        categorySelected = true;
        titleSelected = true;
        imageSelected = true;
  
        
      }
      if (titleSelected && categorySelected && imageSelected) {
        submitForm.style.background = " #1d6154";
        iCanSubmit = true;
      }
    });
  
    addToApi.addEventListener("submit", (e) => {
      e.preventDefault();
      //*************************************Récupérer les valeurs INPUTs en admin
      if (iCanSubmit) {
        //Récupérer image
        const image = inputFile.files[0];
  
        //Récupérer Titre
        const title = document.querySelector("#title").value;
  
        //Récupérer id du fetch Category depuis la liste
        let categorySelect = document.querySelector("#category");
        let selectedOption = categorySelect.selectedOptions[0];
        let category = selectedOption.getAttribute("data-id");
        category = parseInt(category);
  
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("category", category);
        //console.log(formData);
  
        fetch(api + "works", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("votre requête POST n'est pas passé ");
            }
            return response.json();
          })
          .then((data) => {
            console.log("votre requête POST est passé :", data);
            fetchApiWorks();
            workDisplay();
            closeModal();

            //enlever le refresh a l'ajout/suppression de photo
  
            inputFile.value = "";
          })
          .catch((error) => {
            console.error("Error:", error);
            console.log("Ta requête POST n'est PAS passée :( ");
          });
      } else {
        console.log("Formulaire invalide !!!");
      }
    });
  }
  
  ///// manque constante pour ajout et suppression de photo derniere fonction normalement avec msg erreur max 4mo pour ajout photo
  
  function disableScroll() {
    document.body.classList.add("modalOpen");
  }
  
  function enableScroll() {
    document.body.classList.remove("modalOpen");
  }
  
  function displayModal() {
    const modal = document.querySelector("#modal");
    const closeModalBtn = document.querySelector("#closeModal");
    closeModalBtn.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    disableScroll();
  }
  function closeModal() {
    document.getElementById("modal").remove();
    enableScroll();
  }
  const modalHTML = () => {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <aside id="modal" class="modal" role="dialog" aria-labelledby="modalTitle" aria-hidden="true" display="initial">
  
      <div id="modalContainer">
  
        <i id="closeModal" class="fa-solid fa-xmark"></i>
        <i id="previewModal" class="fa-solid fa-arrow-left "></i>
  
        <!-- GALERIE PHOTO -->
        <section class="modalTemplate" id="modalEdit">
  
  
          <div id="editionGallery">
            <h2 class="modalTitle">Galerie photo</h2>
            <!-- <i id="deleteIcon" class="fa-solid fa-trash-can iconModal"></i>
            <i id="moveIcon" class="fa-solid fa-arrows-up-down-left-right iconModal"></i> -->
            <div id="modalGrid">
            </div>
          </div>
          <div class="footerModal">
            <hr>
            <input type="submit" value="Ajouter une photo" id="editModal">
            <p id="deleteAllWorks">Supprimer la galerie</p>
          </div>
        </section>
  
        <!-- section photo modification-->
  
        <section class="modalTemplate" id="editSection" style="display:none">
  
          <h2 class="modalTitle">Ajout photo</h2>
  
          <form id="editWorks">
  
            <div id="addImageContainer">
              <i class="fa-solid fa-image"></i>
  
              <div id="inputFile">
                <label for="filetoUpload" class="fileLabel">
                  <span>+ Ajouter une photo</span>
                  <input type="file" id="filetoUpload" name="image" accept="image/png, image/jpeg"
                    class="file-input">
                </label>
              </div>
              <span class="filesize">jpg, png : 4mo max</span>
              <span id="errorImg"></span>
            </div>
  
            <div class="inputEdit" id="addTitle">
              <label for="title">Titre</label>
              <input type="text" name="title" id="title" class="inputCss" required>
              <span id="ErrorTitleSubmit" class="errormsg"></span>
            </div>
  
            <div class=" inputEdit" id="addCategory">
              <label for="category">Catégorie</label>
              <select name="category" id="category" data-id="" class="inputCss"></select>
              <span id="ErrorCategorySubmit" class="errormsg"></span>
            </div>
  
            <div class="footerModal editFooter">
              <hr>
              <input type="submit" value="Valider">
            </div>
          </form>
        </section>
  
      </div>
    </aside>
  
      
      `
    );
    
  };
  const addPicture = () => {
    const inputFile = document.getElementById("filetoUpload");
    const viewImage = document.getElementById("addImageContainer");
    const file = inputFile.files[0];
    // 4Mo en octets => Message D'ERREUR taille max sinon impossible de charger
    const maxSize = 4 * 1024 * 1024;
  
    if (file.size > maxSize) {
      errorImg.textContent = "Votre image est trop volumineuse";
      console.log("fichier > 4MO!");
      return;
    }
  
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      viewImage.innerHTML = "";
      const img = document.createElement("img");
      img.setAttribute("src", reader.result);
      viewImage.appendChild(img);
      viewImage.style.padding = "0";
    });
  
    reader.readAsDataURL(file);
  };
  
  