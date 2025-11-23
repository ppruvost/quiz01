// =============================
// Initialisation EmailJS
// =============================
(function () {
  emailjs.init("TJHX0tkW1CCz7lv7a");  // Ta clé publique
})();

// On sauvegarde l'ancien endQuiz de questions.js
const oldEndQuiz = endQuiz;

// =============================
// Fin du quiz + Envoi EmailJS
// =============================
endQuiz = function () {

  // Exécution de l’affichage original du quiz
  oldEndQuiz();

  // Score final réel sur les questions mélangées
  const scoreFinal = `${score} / ${shuffledQuestions.length}`;

  // Préparation du résumé détaillé
  let recap = "";
  shuffledQuestions.forEach((q, i) => {
    recap += `Q${i + 1}: ${q.question}\n`;
    recap += `Réponse élève : ${q.userAnswer || "Aucune"}\n`;
    recap += `Bonne réponse : ${q.bonne_reponse}\n\n`;
  });

  // Paramètres envoyés à EmailJS
  const emailParams = {
    nom: user.nom,
    prenom: user.prenom,
    score: scoreFinal,
    details: recap,
    email: "lyceepro.mermoz@gmail.com"   // Adresse du prof
  };

  // Envoi EmailJS
  emailjs
    .send("service_cgh817y", "template_ly7s41e", emailParams)
    .then(() => {
      alert("✅ Résultats envoyés automatiquement par e-mail à votre professeur.\nMerci !");
    })
    .catch((error) => {
      console.error("❌ Erreur EmailJS :", error);
      alert("Erreur lors de l’envoi : " + JSON.stringify(error));
    });
};
