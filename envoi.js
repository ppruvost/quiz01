// =============================
// Initialisation EmailJS
// =============================
(function () {
  emailjs.init("TJHX0tkW1CCz7lv7a");
})();

// =============================
// Fin du quiz + Envoi EmailJS
// =============================
function endQuiz() {
  document.getElementById("quiz").innerHTML = "<strong>Quiz terminé !</strong>";
  document.getElementById("score").innerText = `Résultat final : ${score} / ${questions.length}`;
  document.getElementById("explication").innerHTML = "";

  const emailParams = {
    nom: user.nom,
    prenom: user.prenom,
    score: `${score} / ${questions.length}`,
    email: "lyceepro.mermoz@gmail.com"
  };

  emailjs
    .send("service_cgh817y", "template_ly7s41e", emailParams)
    .then(() => {
      alert("✅ Résultats envoyés automatiquement par e-mail à votre prof de Maths - Sciences... Merci");
    })
    .catch((error) => {
      console.error("❌ Erreur EmailJS :", error);
      alert("Erreur lors de l’envoi : " + JSON.stringify(error));
    });
}
