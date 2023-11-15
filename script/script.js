const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

//lagringen

// Funktion för att söka efter program
function searchPrograms() {
  const searchInput = getValueById("search").toLowerCase();
  const programs = JSON.parse(localStorage.getItem("programs")) || [];

  const filteredPrograms = programs.filter(
    (program) =>
      program.title.toLowerCase().includes(searchInput) ||
      program.description.toLowerCase().includes(searchInput)
  );

  displayPrograms(filteredPrograms);
}

// Funktion för att visa programmen på sidan
function displayPrograms(programs) {
  const programsList = getElementById("programs-list");
  programsList.innerHTML = "";

  programs = programs || JSON.parse(localStorage.getItem("programs")) || [];

  programs.forEach((program) => {
    const programCard = createProgramCard(program);
    programsList.appendChild(programCard);
  });
}

// Visa befintliga program när sidan laddas
displayPrograms();

// Funktion för att rensa minnet
function clearMemory() {
  localStorage.removeItem("programs");
  displayPrograms(); // Uppdatera listan för att visa att minnet är tomt
}

//menyrad
const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

// Helper function to get element by ID
function getElementById(id) {
  return document.getElementById(id);
}

// Helper function to get value by ID
function getValueById(id) {
  return getElementById(id).value;
}

// Helper function to create a program card element
function createProgramCard(program) {
  const programCard = document.createElement("div");
  programCard.classList.add("program-card");
  programCard.innerHTML = `
 <div>
 <h3>${program.title}</h3>
</div>
<div>
 <p>${program.description}</p>
</div>
<div>
 <section>Åldersgräns: ${program.ageLimit}</section>
</div>
   `;
  return programCard;
}

// Funktion för att lägga till ett nytt program
function addProgram() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const ageLimit = document.getElementById("age-limit").value;

  // Skapa ett objekt för programmet
  const program = { title, description, ageLimit };

  // Lägg till programmet i local storage
  let programs = JSON.parse(localStorage.getItem("programs")) || [];
  programs.push(program);
  localStorage.setItem("programs", JSON.stringify(programs));

  // Uppdatera listan över program
  displayPrograms();

  // Visa ett bekräftelsemeddelande
  showMessage("Programmet har lagts till i minnet.");
}

// Funktion för att rensa skrivfälten
function clearFields() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("age-limit").value = "";
}

// Uppdatera addProgram-funktionen för att rensa fälten efter att ett program har lagts till
function addProgram() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const ageLimit = document.getElementById("age-limit").value;

  // Skapa ett objekt för programmet
  const program = { title, description, ageLimit };

  // Lägg till programmet i local storage
  let programs = JSON.parse(localStorage.getItem("programs")) || [];
  programs.push(program);
  localStorage.setItem("programs", JSON.stringify(programs));

  // Rensa skrivfälten
  clearFields();

  // Uppdatera listan över program
  displayPrograms();
}
