const questions = [
  {
    text: "Définis le powergaming.",
    answer: "Utiliser les mécaniques du jeu pour forcer une action irréaliste ou non prévue dans un cadre RP."
  },
  {
    text: "Définis le metagaming.",
    answer: "Utiliser des informations hors RP (Discord, stream, etc.) pour influencer ton personnage."
  },
  {
    text: "Que signifie FearRP ?",
    answer: "Ton personnage doit ressentir la peur et agir en conséquence face à un danger."
  }
  // ➡️ Tu continues jusqu’à 11 questions
];

let current = 0;

function startWhitelist() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  showQuestion();
}

function showQuestion() {
  if (current < questions.length) {
    document.getElementById("questionNumber").innerText = `Question ${current + 1} / ${questions.length}`;
    document.getElementById("questionText").innerText = questions[current].text;
    document.getElementById("expectedAnswer").innerText = questions[current].answer;
  } else {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("end").style.display = "block";
  }
}

function nextQuestion(correct) {
  // Ici tu pourrais stocker les réponses si besoin
  current++;
  showQuestion();
}
