const api = "http://localhost:5678/api/";
const token = localStorage.getItem("token");
let categoryIdValue = "";
let categories = []; 
let btnTitle = [];
const btnSort = document.querySelectorAll(".btn");
const filterButtons = document.createElement("div");
const portfolioSection = document.querySelector("#portfolio");
portfolioSection
  .querySelector("h2")
  .insertAdjacentElement("afterend", filterButtons);
const imageUrls = [];
