// URL dde l'API pour la connexion utilisateur
const loginUrl = "http://localhost:5678/api/users/login";

// Éléments du formulaire de connexion
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const submitBtn = document.querySelector("input[type='submit']");
const form = document.getElementById("loginForm");

// Éléments pour afficher les erreurs
const loginError = document.querySelector(".loginError");
const passwordError = document.querySelector(".passwordError");

// Objet pour stocker les informations d'identification utilisateur
const logUser = {
  email: "",
  password: "",
};

// Écouteur d'événement pour la soumission du formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  loginUser();
});

// Écouteur d'événement pour la saisie de l'adresse e-mail
inputEmail.addEventListener("input", (e) => {
  inputEmail.reportValidity();
  logUser.email = e.target.value;
});

// Écouteur d'événement pour la saisie du mot de passe
inputPassword.addEventListener("input", (e) => {
  inputPassword.reportValidity();
  logUser.password = e.target.value;
});

// Écouteur d'événement pour le chargement du DOM
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  logUser.email = inputEmail.value;
  logUser.password = inputPassword.value;
});
// Fetch la route user

async function loginUser() {
  try {
    await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logUser),
    })
      .then((response) => response.json())
      .then((responseData) => {
        data = responseData;
       
      });
    if (data.message) {
      // Afficher le message d'erreur pour l'identification utilisateur
      loginError.textContent = "Vos informations utilisateur / mot de passe ne sont pas correctes";
   
     
    } else if (data.error) {
      // Afficher le message d'erreur pour le mot de passe
      passwordError.textContent = "Vos informations utilisateur / mot de passe ne sont pas correctes";
      
       // Si tout est en ordre
    } else {
   
      passwordError.textContent = "";
      loginError.textContent = "";
   

      // stockage du token dans le stockage local
      localStorage.setItem("token", data.token);

      //Redirection index.html
      window.location.href = "../index.html";
    }
  } catch (error) {
// Insérer ici le traitement des erreurs, si besoim
  }
}