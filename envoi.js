// envoi.js

// Variables globales
let currentQuestion = 0;
let score = 0;

// DOM
const nomInput = document.getElementById("nom");
const prenomInput = document.getElementById("prenom");
const startButton = document.getElementById("startQuiz");

const userForm = document.getElementById("userForm");
const quizArea = document.getElementById("quizArea");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextButton = document.getElementById("nextButton");

const resultArea = document.getElementById("resultArea");
const scoreDisplay = document.getElementById("scoreDisplay");
const explicationsZone = document.getElementById("explicationsZone");
const restartButton = document.getElementById("restartQuiz");

const victorySound = document.getElementById("victorySound");

// ===============================
// LANCEMENT DU QUIZ
// ===============================
startButton.addEventListener("click", () => {
  const nom = nomInput.value.trim();
  const prenom = prenomInput.value.trim();

  if (!nom || !prenom) {
    alert("Merci de remplir votre nom et prénom !");
    return;
  }

  // Masquer le formulaire
  userForm.classList.add("hidden");

  // Afficher la zone quiz
  quizArea.classList.remove("hidden");

  // Initialiser quiz
  currentQuestion = 0;
  score = 0;
  showQuestion(currentQuestion);
});

// ===============================
// AFFICHAGE D’UNE QUESTION
// ===============================
function showQuestion(index) {
  const q = questions[index]; // questions doit exister dans question.js

  questionText.textContent = q.question;
  optionsContainer.innerHTML = "";

  q.options.forEach((opt, i) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="q${index}" value="${i}">
      ${opt}
    `;
    optionsContainer.appendChild(label);
  });

  // Cacher le bouton suivant jusqu'à sélection
  nextButton.classList.add("hidden");

  // Écoute des sélections
  const radios = optionsContainer.querySelectorAll("input[type='radio']");
  radios.forEach(r => {
    r.addEventListener("change", () => {
      nextButton.classList.remove("hidden");
    });
  });
}

// ===============================
// BOUTON QUESTION SUIVANTE
// ===============================
nextButton.addEventListener("click", () => {
  const selected = optionsContainer.querySelector("input[type='radio']:checked");
  if (!selected) return;

  const q = questions[currentQuestion];
  if (parseInt(selected.value) === q.correct) score++;

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    afficherResultats();
  }
});

// ===============================
// AFFICHAGE DES RESULTATS
// ===============================
function afficherResultats() {
  quizArea.classList.add("hidden");
  resultArea.classList.remove("hidden");

  scoreDisplay.textContent = `Votre score : ${score} / ${questions.length}`;

  explicationsZone.innerHTML = "";
  questions.forEach((q, i) => {
    const p = document.createElement("p");
    p.classList.add("explication");
    if (parseInt(document.querySelector(`input[name='q${i}']:checked`)?.value) === q.correct) {
      p.classList.add("bonne");
      p.textContent = `Bonne réponse ✔ — ${q.explication}`;
    } else {
      p.classList.add("mauvaise");
      p.textContent = `Mauvaise réponse ❌ — ${q.explication}`;
    }
    explicationsZone.appendChild(p);
  });

  // Lancer le jingle
  if (victorySound) victorySound.play();
}

// ===============================
// RECOMMENCER LE QUIZ
// ===============================
restartButton.addEventListener("click", () => {
  resultArea.classList.add("hidden");
  userForm.classList.remove("hidden");

  nomInput.value = "";
  prenomInput.value = "";
});
