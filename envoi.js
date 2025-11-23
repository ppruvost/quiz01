// ===============================
// ENVOI DES RÉSULTATS PAR EMAILJS
// ===============================

// Initialisation EmailJS
(function() {
  emailjs.init("TJHX0tkW1CCz7lv7a"); // TA clé EmailJS
})();

// On remplace endQuiz pour ajouter l’envoi Email
const oldEndQuiz = endQuiz;

endQuiz = function() {

  oldEndQuiz(); // affiche le score comme prévu

  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();

  const scoreFinal = `${score} / ${shuffledQuestions.length}`;

  // Création du résumé
  let details = "";

  shuffledQuestions.forEach((q, i) => {
    details += `Q${i+1}: ${q.question}\n`;
    details += `Réponse élève : ${q.userAnswer || "Aucune"}\n`;
    details += `Bonne réponse : ${q.bonne_reponse}\n\n`;
  });

  emailjs.send("service_xxxxxx", "template_quiz", {
    nom: nom,
    prenom: prenom,
    score: scoreFinal,
    details: details
  })
  .then(() => console.log("Email envoyé !"))
  .catch(err => console.error("Erreur EmailJS:", err));
};
