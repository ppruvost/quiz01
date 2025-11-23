// =============================
// Variables globales
// =============================
let user = { nom: "", prenom: "" };
let current = 0;
let score = 0;
let shuffledQuestions = []; // QUESTIONS MELANGEES

// =============================
// Mélange d'un tableau
// =============================
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// =============================
// Mélange des questions + réponses
// =============================
function shuffleQuestions() {
  return questions.map(q => ({
    ...q,
    options: shuffleArray(q.options) // mélange des propositions
  }));
}

// =============================
// QUESTIONS DU QUIZ (inchangées)
// =============================
const questions = [

  {
    question: "1. La vitesse linéaire en usinage (Vc) dépend de :",
    options: ["N uniquement", "D uniquement", "D et N", "fz et Z"],
    bonne_reponse: "D et N",
    explication: "Vc = π × D × N / 1000 : elle dépend du diamètre et de la vitesse de rotation."
  },

  {
    question: "2. La relation correcte entre la vitesse linéaire Vc, le diamètre D et la fréquence de rotation N est :",
    options: [
      "Vc = D / N",
      "Vc = π × D × N / 1000",
      "Vc = N / (π × D)",
      "Vc = D × 1000 / N"
    ],
    bonne_reponse: "Vc = π × D × N / 1000",
    explication: "C’est la formule fondamentale utilisée en usinage."
  },

  {
    question: "3. Si le diamètre de l'outil augmente, pour garder la même vitesse de coupe Vc, la vitesse de rotation N doit :",
    options: ["Augmenter", "Rester identique", "Diminuer", "Devenir nulle"],
    bonne_reponse: "Diminuer",
    explication: "Un grand diamètre génère naturellement plus de vitesse linéaire."
  },

  {
    question: "4. La fréquence de rotation f en Hz est :",
    options: ["N × 60", "N / 60", "N × 2π", "1/N"],
    bonne_reponse: "N / 60",
    explication: "1 Hz = 1 tour par seconde : f = N(tr/min)/60."
  },

  {
    question: "5. La relation entre ω et f est :",
    options: ["ω = f", "ω = f/2π", "ω = 2πf", "ω = f × 60"],
    bonne_reponse: "ω = 2πf",
    explication: "Un tour = 2π radians."
  },

  {
    question: "6. La vitesse linéaire v d’un point en mouvement circulaire est :",
    options: ["v = ω × r", "v = ω / r", "v = r / ω", "v = 2πr / ω"],
    bonne_reponse: "v = ω × r",
    explication: "Relation fondamentale du mouvement circulaire."
  },

  {
    question: "7. Une broche tourne à 1800 tr/min. La fréquence vaut :",
    options: ["15 Hz", "20 Hz", "30 Hz", "60 Hz"],
    bonne_reponse: "30 Hz",
    explication: "f = 1800/60 = 30 Hz."
  },

  {
    question: "8. En atelier, augmenter trop fortement N alors que D est grand peut entraîner :",
    options: ["Un meilleur état de surface", "Un échauffement et une casse outil", "Un enlèvement de matière plus doux", "Aucun effet"],
    bonne_reponse: "Un échauffement et une casse outil",
    explication: "La Vc devient trop élevée, l’outil brûle ou se casse."
  },

  {
    question: "9. Convertir 240 tr/min en Hz :",
    options: ["2 Hz", "4 Hz", "6 Hz", "8 Hz"],
    bonne_reponse: "4 Hz",
    explication: "240/60 = 4 Hz."
  },

  {
    question: "10. Une fz trop faible combinée à une vitesse de rotation correcte provoque :",
    options: [
      "Une coupe franche",
      "Un frottement au lieu d’une coupe",
      "Une vibration atténuée",
      "Un enlèvement de copeaux optimal"
    ],
    bonne_reponse: "Un frottement au lieu d’une coupe",
    explication: "fz trop faible = la dent glisse, chauffe et use l’outil."
  },

  {
    question: "11. Si N est trop faible pour un petit diamètre, on risque :",
    options: [
      "Une coupe trop agressive",
      "Une absence de coupe (frottement, bruit)",
      "Un arrachement du porte-outil",
      "Une vitesse de coupe excessive"
    ],
    bonne_reponse: "Une absence de coupe (frottement, bruit)",
    explication: "Petit D = il faut une grande vitesse angulaire."
  },

  {
    question: "12. Quelle grandeur augmente si on augmente la fréquence de rotation f ?",
    options: ["La vitesse linéaire Vc", "Le diamètre", "La période T", "La masse de la pièce"],
    bonne_reponse: "La vitesse linéaire Vc",
    explication: "Vc est proportionnelle à N, donc à f."
  },

  {
    question: "13. Mise en sécurité : avant de modifier N sur la machine, il faut :",
    options: [
      "Passer la broche en rotation maximale",
      "Arrêter la broche",
      "Approcher l’outil",
      "Serrer plus fort l’étau"
    ],
    bonne_reponse: "Arrêter la broche",
    explication: "Changer N en rotation est dangereux (torsion, choc…)."
  },

  {
    question: "14. Une roue de 100 mm de diamètre tourne à 600 tr/min. Vc vaut environ :",
    options: ["3 m/min", "60 m/min", "188 m/min", "600 m/min"],
    bonne_reponse: "188 m/min",
    explication: "Vc = π×0,1×600 ≈ 188 m/min."
  },

  {
    question: "15. Si la période T d’un tour est de 0,1 s, la fréquence vaut :",
    options: ["2 Hz", "5 Hz", "10 Hz", "20 Hz"],
    bonne_reponse: "10 Hz",
    explication: "f = 1/T = 1/0,1 = 10 Hz."
  },

  {
    question: "16. Quelle est l’unité de la vitesse angulaire ω ?",
    options: ["m/s", "tr/min", "rad/s", "Hz"],
    bonne_reponse: "rad/s",
    explication: "La vitesse angulaire s’exprime en radians par seconde."
  },

  {
    question: "17. En atelier, diminuer trop fortement N pour un grand diamètre entraîne :",
    options: ["Une Vc trop faible", "Une Vc trop élevée", "Une coupe trop agressive", "Une instabilité de la broche"],
    bonne_reponse: "Une Vc trop faible",
    explication: "La pièce ne coupe plus, elle « bourre »."
  },

  {
    question: "18. Une fraise de D = 10 mm doit couper à Vc = 80 m/min. N vaut :",
    options: ["200 tr/min", "800 tr/min", "1600 tr/min", "2500 tr/min"],
    bonne_reponse: "2500 tr/min",
    explication: "N = 80×1000/(π×10) ≈ 2546 tr/min."
  },

  {
    question: "19. Relier N (tr/min) et ω (rad/s) :",
    options: [
      "ω = 2π × (N / 60)",
      "ω = N × 60",
      "ω = πN",
      "ω = N / (2π)"
    ],
    bonne_reponse: "ω = 2π × (N / 60)",
    explication: "On convertit N en tours/seconde puis en radians."
  },

  {
    question: "20. En usinage, une Vc trop faible entraîne :",
    options: [
      "Un échauffement important",
      "Un risque de casse outil immédiat",
      "Un état de surface médiocre",
      "Une coupe impossible"
    ],
    bonne_reponse: "Un état de surface médiocre",
    explication: "La coupe manque d’énergie → copeaux mal formés."
  }

];

// =============================
// AFFICHAGE D'UNE QUESTION
// =============================
function showQuestion() {
  const q = shuffledQuestions[current];

  if (!q) return endQuiz();

  let html = `<div class="question">${q.question}</div><div class="options">`;

  q.options.forEach((opt) => {
    html += `
      <label>
        <input type="radio" name="q" value="${opt}"> ${opt}
      </label><br>`;
  });

  html += `<button id="submit" class="button next">Valider</button>`;

  document.getElementById("quiz").innerHTML = html;
  document.getElementById("explication").innerHTML = "";

  document.getElementById("submit").onclick = validateAnswer;
}

// =============================
// VALIDATION DE LA RÉPONSE
// =============================
function validateAnswer() {
  const selected = document.querySelector('input[name="q"]:checked');

  if (!selected) {
    document.getElementById("explication").innerHTML =
      "Veuillez sélectionner une réponse.";
    return;
  }

  const q = shuffledQuestions[current];
  const reponse = selected.value;

  // **** AJOUT ESSENTIEL pour l'envoi Email ****
  q.userAnswer = reponse;

  if (reponse === q.bonne_reponse) {
    score++;
    document.getElementById("explication").innerHTML =
      `<span class="success">Bonne réponse !</span> ${q.explication}`;
  } else {
    document.getElementById("explication").innerHTML =
      `<span class="fail">Mauvaise réponse.</span> ${q.explication}`;
  }

  current++;
  document.getElementById("score").innerText =
    `Score actuel : ${score} / ${shuffledQuestions.length}`;

  if (current < shuffledQuestions.length) {
    setTimeout(showQuestion, 4000);
  } else {
    setTimeout(endQuiz, 4000);
  }
}

// =============================
// FIN DU QUIZ
// =============================
function endQuiz() {
  document.getElementById("quiz").innerHTML =
    `<h2>Quiz terminé !</h2>
     <p>Score final : ${score} / ${shuffledQuestions.length}</p>`;

  // L'envoi Email est géré dans envoi.js
}

// =============================
// LANCEMENT DU QUIZ
// =============================
document.getElementById("startQuiz").addEventListener("click", () => {
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();

  if (!nom || !prenom) {
    alert("Merci de renseigner votre nom et prénom avant de commencer.");
    return;
  }

  user.nom = nom;
  user.prenom = prenom;

  shuffledQuestions = shuffleQuestions();
  current = 0;
  score = 0;

  document.getElementById("userForm").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  showQuestion();
});
