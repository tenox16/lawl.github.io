// --- Liste des questions ---
const allQuestions = [
  // Situations RP
  { text: "Définis le powergaming.", answer: "Utiliser les mécaniques du jeu pour forcer une action irréaliste ou non prévue dans un cadre RP." },
  { text: "Si ton personnage est braqué par deux personnes armées, que dois-tu faire ?", answer: "Tu dois jouer la peur et obéir (NoFear RP interdit)." },
  { text: "Si tu es en coma, que peux-tu faire ou dire ?", answer: "Rien, sauf gémir (pas parler, pas voir, pas entendre)." },
  { text: "Après un soin par un EMS, peux-tu retourner sur la scène du combat ?", answer: "Non, c’est interdit (Retour Zone interdit)." },
  { text: "Que doit faire un EMS quand il trouve une personne blessée au sol ?", answer: "Jouer la scène de soin jusqu’au bout (transport + RP médical)." },
  { text: "Si tu veux braquer une supérette, combien faut-il d’otages minimum ?", answer: "2 otages minimum." },
  { text: "Quand la police peut-elle tirer sur un véhicule en fuite ?", answer: "Seulement si le fuyard tire, franchit une frontière ou met en danger des civils." },
  { text: "Ton personnage meurt (Mort RP volontaire). Que dois-tu faire après ?", answer: "Remplir un dossier et jouer la scène RP dans les 24h." },
  { text: "Si tu es civil et tu vois une fusillade, comment dois-tu réagir ?", answer: "Jouer la peur, fuir ou appeler la police, pas intervenir." },
  { text: "Si tu es policier hors service, peux-tu garder ton arme sur toi ?", answer: "Non, les armes doivent être déposées hors service." },
  { text: "Un gang veut attaquer un laboratoire rival. Quand est-ce autorisé ?", answer: "Seulement si c’est une escalade RP cohérente (conflit construit)." },
  { text: "Si on t’oblige à transporter de la drogue, as-tu le droit de refuser en RP ?", answer: "Oui, tu peux refuser mais tu dois réagir de façon cohérente (peur, négociation, etc.)." },
  { text: "Quand un gunfight est-il valable ?", answer: "Uniquement en dernier recours, après escalade RP (attaque de labo, territoire, conflit sérieux)." },

  // Infractions RP
  { text: "Que veut dire Metagaming ?", answer: "Utiliser des infos HRP en RP." },
  { text: "Que veut dire NoFear RP ?", answer: "Ignorer la peur (ex : ne pas avoir peur d’une arme sur toi)." },
  { text: "Si tu aides ton ami car il t’a appelé en HRP, quelle faute commets-tu ?", answer: "Metagaming." },
  { text: "Quelle est la différence entre Force RP et Powergaming ?", answer: "Force RP = forcer une action / Powergaming = action irréaliste ou impossible." },
  { text: "Si tu continues à tirer alors que tu as pris plusieurs balles, quelle faute commets-tu ?", answer: "NoPain RP." },
  { text: "Que veut dire Streamhack ?", answer: "Utiliser des infos venant d’un live/stream." },
  { text: "Si tu reviens sur une scène après ton coma, quelle faute commets-tu ?", answer: "Retour Zone." },
  { text: "Que veut dire CopBait ?", answer: "Provoquer la police sans raison RP." },
  { text: "Si tu tues un joueur sans raison, quelle faute commets-tu ?", answer: "Free Kill." },
  { text: "Si tu roules avec une voiture de route en pleine montagne, quelle faute commets-tu ?", answer: "Off-Road." },

  // Métiers & organisations
  { text: "Quels métiers sont interdits pour les activités illégales ?", answer: "Gouvernement, LSPD, EMS, Ammu-Nation, Dynasty 8, avocats (sauf dossier accepté)." },
  { text: "Combien de personnes maximum peuvent travailler dans un bar/restaurant ?", answer: "20 personnes." },
  { text: "Peux-tu créer une entreprise sans faire de dossier RP ?", answer: "Non, un dossier Google Slides est obligatoire." },
  { text: "Combien faut-il de membres minimum pour créer un groupe ?", answer: "5 membres minimum." },
  { text: "Combien d’armes lourdes un gang peut-il avoir au maximum ?", answer: "0 arme lourde (seulement 3 moyennes et 10 légères)." },
  { text: "Est-ce qu’un groupe de PF peut braquer une bijouterie ?", answer: "Non, c’est interdit." },
  { text: "Est-ce qu’un cartel peut s’allier avec un autre groupe pendant une guerre ?", answer: "Non, les alliances sont interdites en guerre." },
  { text: "Quelle est la différence entre une guerre intergroupe et un petit conflit ?", answer: "Guerre intergroupe = dossier officiel + gros conflit RP / Petit conflit = désaccord ou tension RP sans dossier." }
];

// --- Variables ---
let selectedQuestions = [];
let current = 0;
let score = 0;
let mistakes = 0; // compteur d'erreurs

// --- Démarrer la WL ---
function startWhitelist() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  // Mélange et prend 11 questions aléatoires
  selectedQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 11);

  showQuestion();
}

// --- Afficher la question ---
function showQuestion() {
  if (current < selectedQuestions.length) {
    document.getElementById("questionNumber").innerText = `Question ${current + 1} / ${selectedQuestions.length}`;
    document.getElementById("questionText").innerText = selectedQuestions[current].text;
    document.getElementById("expectedAnswer").innerText = selectedQuestions[current].answer;
  } else {
    endQuiz();
  }
}

// --- Passer à la suivante ---
function nextQuestion(correct) {
  if (correct) {
    score++;
  } else {
    mistakes++;
    if (mistakes >= 3) {
      endQuiz(true); // échec automatique après 3 erreurs
      return;
    }
  }
  current++;
  showQuestion();
}

// --- Fin de la WL ---
function endQuiz(failedByMistakes = false) {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("end").style.display = "block";

  const resultText = `Résultat : ${score} / ${selectedQuestions.length}`;
  document.getElementById("finalScore").innerText = resultText;

  if (failedByMistakes || score < 8) {
    document.getElementById("finalMessage").innerText = "❌ WL échouée. Réessaie plus tard.";
    document.getElementById("finalMessage").style.color = "red";
  } else {
    document.getElementById("finalMessage").innerText = "✅ Félicitations, WL validée !";
    document.getElementById("finalMessage").style.color = "lightgreen";
  }
}
