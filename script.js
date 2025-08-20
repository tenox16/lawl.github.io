<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Whitelist RP</title>
  <style>
    #quiz, #end { display: none; }
    body { font-family: Arial, sans-serif; margin: 20px; }
    button { padding: 10px 20px; margin: 10px 0; }
  </style>
</head>
<body>
  <div id="intro">
    <h1>Bienvenue à la WL RP</h1>
    <button onclick="startWhitelist()">Démarrer la WL</button>
  </div>

  <div id="quiz">
    <h2 id="questionNumber"></h2>
    <p id="questionText"></p>
    <button onclick="answerQuestion(true)">Réponse correcte</button>
    <button onclick="answerQuestion(false)">Réponse incorrecte</button>
    <p><strong>Réponse attendue :</strong> <span id="expectedAnswer"></span></p>
  </div>

  <div id="end">
    <h1>Fin de la session WL</h1>
    <p id="finalMessage"></p>
    <p id="finalScore"></p>
    <p id="mistakesReport"></p>
    <button onclick="resetWhitelist()">Démarrer une nouvelle WL</button>
  </div>

  <script>
    // --- Questions ---
    const allQuestions = [
      // Situations RP
      { text: "Définis le powergaming.", answer: "Utiliser les mécaniques du jeu pour forcer une action irréaliste ou non prévue dans un cadre RP.", category: "Mise en situation" },
      { text: "Si ton personnage est braqué par deux personnes armées, que dois-tu faire ?", answer: "Tu dois jouer la peur et obéir (NoFear RP interdit).", category: "Mise en situation" },
      { text: "Si tu es en coma, que peux-tu faire ou dire ?", answer: "Rien, sauf gémir (pas parler, pas voir, pas entendre).", category: "Mise en situation" },
      { text: "Après un soin par un EMS, peux-tu retourner sur la scène du combat ?", answer: "Non, c’est interdit (Retour Zone interdit).", category: "Mise en situation" },
      { text: "Que doit faire un EMS quand il trouve une personne blessée au sol ?", answer: "Jouer la scène de soin jusqu’au bout (transport + RP médical).", category: "Mise en situation" },
      { text: "Si tu veux braquer une supérette, combien faut-il d’otages minimum ?", answer: "2 otages minimum.", category: "Mise en situation" },
      { text: "Quand la police peut-elle tirer sur un véhicule en fuite ?", answer: "Seulement si le fuyard tire, franchit une frontière ou met en danger des civils.", category: "Mise en situation" },
      { text: "Ton personnage meurt (Mort RP volontaire). Que dois-tu faire après ?", answer: "Remplir un dossier et jouer la scène RP dans les 24h.", category: "Mise en situation" },
      { text: "Si tu es civil et tu vois une fusillade, comment dois-tu réagir ?", answer: "Jouer la peur, fuir ou appeler la police, pas intervenir.", category: "Mise en situation" },
      { text: "Si tu es policier hors service, peux-tu garder ton arme sur toi ?", answer: "Non, les armes doivent être déposées hors service.", category: "Mise en situation" },
      { text: "Un gang veut attaquer un laboratoire rival. Quand est-ce autorisé ?", answer: "Seulement si c’est une escalade RP cohérente (conflit construit).", category: "Mise en situation" },
      { text: "Si on t’oblige à transporter de la drogue, as-tu le droit de refuser en RP ?", answer: "Oui, tu peux refuser mais tu dois réagir de façon cohérente (peur, négociation, etc.).", category: "Mise en situation" },
      { text: "Quand un gunfight est-il valable ?", answer: "Uniquement en dernier recours, après escalade RP (attaque de labo, territoire, conflit sérieux).", category: "Mise en situation" },

      // Infractions RP
      { text: "Que veut dire Metagaming ?", answer: "Utiliser des infos HRP en RP.", category: "Lexique" },
      { text: "Que veut dire NoFear RP ?", answer: "Ignorer la peur (ex : ne pas avoir peur d’une arme sur toi).", category: "Lexique" },
      { text: "Si tu aides ton ami car il t’a appelé en HRP, quelle faute commets-tu ?", answer: "Metagaming.", category: "Lexique" },
      { text: "Quelle est la différence entre Force RP et Powergaming ?", answer: "Force RP = forcer une action / Powergaming = action irréaliste ou impossible.", category: "Lexique" },
      { text: "Si tu continues à tirer alors que tu as pris plusieurs balles, quelle faute commets-tu ?", answer: "NoPain RP.", category: "Lexique" },
      { text: "Que veut dire Streamhack ?", answer: "Utiliser des infos venant d’un live/stream.", category: "Lexique" },
      { text: "Si tu reviens sur une scène après ton coma, quelle faute commets-tu ?", answer: "Retour Zone.", category: "Lexique" },
      { text: "Que veut dire CopBait ?", answer: "Provoquer la police sans raison RP.", category: "Lexique" },
      { text: "Si tu tues un joueur sans raison, quelle faute commets-tu ?", answer: "Free Kill.", category: "Lexique" },
      { text: "Si tu roules avec une voiture de route en pleine montagne, quelle faute commets-tu ?", answer: "Off-Road.", category: "Lexique" },

      // Métiers & organisations
      { text: "Quels métiers sont interdits pour les activités illégales ?", answer: "Gouvernement, LSPD, EMS, Ammu-Nation, Dynasty 8, avocats (sauf dossier accepté).", category: "Règlement" },
      { text: "Combien de personnes maximum peuvent travailler dans un bar/restaurant ?", answer: "20 personnes.", category: "Règlement" },
      { text: "Peux-tu créer une entreprise sans faire de dossier RP ?", answer: "Non, un dossier Google Slides est obligatoire.", category: "Règlement" },
      { text: "Combien faut-il de membres minimum pour créer un groupe ?", answer: "5 membres minimum.", category: "Règlement" },
      { text: "Combien d’armes lourdes un gang peut-il avoir au maximum ?", answer: "0 arme lourde (seulement 3 moyennes et 10 légères).", category: "Règlement" },
      { text: "Est-ce qu’un groupe de PF peut braquer une bijouterie ?", answer: "Non, c’est interdit.", category: "Règlement" },
      { text: "Est-ce qu’un cartel peut s’allier avec un autre groupe pendant une guerre ?", answer: "Non, les alliances sont interdites en guerre.", category: "Règlement" },
      { text: "Quelle est la différence entre une guerre intergroupe et un petit conflit ?", answer: "Guerre intergroupe = dossier officiel + gros conflit RP / Petit conflit = désaccord ou tension RP sans dossier.", category: "Règlement" }
    ];

    // --- Variables ---
    let selectedQuestions = [];
    let current = 0;
    let score = 0;
    let mistakes = 0;
    let mistakesByCategory = { "Lexique": 0, "Règlement": 0, "Mise en situation": 0 };

    const maxMistakes = 2; // nombre max d'erreurs autorisées

    // --- Démarrer la WL ---
    function startWhitelist() {
      document.getElementById("intro").style.display = "none";
      document.getElementById("quiz").style.display = "block";

      selectedQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 11);

      showQuestion();
    }

    // --- Afficher la question ---
    function showQuestion() {
      if (current < selectedQuestions.length) {
        const q = selectedQuestions[current];
        document.getElementById("questionNumber").innerText = `Question ${current + 1} / ${selectedQuestions.length}`;
        document.getElementById("questionText").innerText = q.text;
        document.getElementById("expectedAnswer").innerText = q.answer;
      } else {
        endQuiz();
      }
    }

    // --- Répondre à une question ---
    function answerQuestion(correct) {
      const category = selectedQuestions[current].category;
      if (!correct) {
        mistakes++;
        mistakesByCategory[category]++;
      } else {
        score++;
      }
      current++;
      showQuestion();
    }

    // --- Fin de la WL ---
    function endQuiz() {
      document.getElementById("quiz").style.display = "none";
      document.getElementById("end").style.display = "block";

      const failedByMistakes = mistakes > maxMistakes;
      const resultText = `Fautes : Lexique = ${mistakesByCategory["Lexique"]}, Règlement = ${mistakesByCategory["Règlement"]}, Mise en situation = ${mistakesByCategory["Mise en situation"]}`;

      document.getElementById("finalScore").innerText = resultText;

      if (failedByMistakes) {
        document.getElementById("finalMessage").innerText = "❌ ÉCHEC : Le joueur devra repasser la WL dans 2 semaines.";
        document.getElementById("finalMessage").style.color = "red";
      } else {
        document.getElementById("finalMessage").innerText = "✅ WL validée !";
        document.getElementById("finalMessage").style.color = "lightgreen";
      }
    }

    // --- Réinitialiser la WL ---
    function resetWhitelist() {
      selectedQuestions = [];
      current = 0;
      score = 0;
      mistakes = 0;
      mistakesByCategory = { "Lexique": 0, "Règlement": 0, "Mise en situation": 0 };

      document.getElementById("end").style.display = "none";
      document.getElementById("quiz").style.display = "none";
      document.getElementById("intro").style.display = "block";
    }
  </script>
</body>
</html>
