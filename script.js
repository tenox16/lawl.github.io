// Toutes les questions
const questions = [
    // Scénarios & mises en situation (12)
    { q: "Si ton personnage est braqué par deux personnes armées, que dois-tu faire ?", a: ["Jouer la peur et obéir", "Riposter immédiatement"], correct: 0 },
    { q: "Si tu es en coma, que peux-tu faire ou dire ?", a: ["Rien, sauf gémir", "Parler normalement"], correct: 0 },
    { q: "Après un soin par un EMS, peux-tu retourner sur la scène du combat ?", a: ["Non", "Oui"], correct: 0 },
    { q: "Que doit faire un EMS quand il trouve une personne blessée au sol ?", a: ["Jouer la scène de soin jusqu’au bout", "Laisser tomber"], correct: 0 },
    { q: "Si tu veux braquer une supérette, combien faut-il d’otages minimum ?", a: ["2", "1"], correct: 0 },
    { q: "Quand la police peut-elle tirer sur un véhicule en fuite ?", a: ["Si le fuyard tire, franchit une frontière ou met en danger des civils", "Toujours"], correct: 0 },
    { q: "Ton personnage meurt. Que dois-tu faire après ?", a: ["Remplir un dossier et jouer la scène RP dans les 24h", "Rien"], correct: 0 },
    { q: "Si tu es civil et tu vois une fusillade, comment dois-tu réagir ?", a: ["Jouer la peur, fuir ou appeler la police", "Intervenir"], correct: 0 },
    { q: "Si tu es policier hors service, peux-tu garder ton arme sur toi ?", a: ["Non", "Oui"], correct: 0 },
    { q: "Un gang veut attaquer un laboratoire rival. Quand est-ce autorisé ?", a: ["Uniquement si c’est une escalade RP cohérente", "Toujours"], correct: 0 },
    { q: "Si on t’oblige à transporter de la drogue, as-tu le droit de refuser en RP ?", a: ["Oui, mais réagir de façon cohérente", "Non"], correct: 0 },
    { q: "Quand un gunfight est-il valable ?", a: ["Uniquement en dernier recours après escalade RP", "Toujours"], correct: 0 },

    // Infractions RP (10)
    { q: "Que veut dire Metagaming ?", a: ["Utiliser des infos HRP en RP", "Jouer son personnage"], correct: 0 },
    { q: "Que veut dire NoFear RP ?", a: ["Ignorer la peur", "Être courageux"], correct: 0 },
    { q: "Si tu aides ton ami car il t’a appelé en HRP, quelle faute commets-tu ?", a: ["Metagaming", "Aucune"], correct: 0 },
    { q: "Différence entre Force RP et Powergaming ?", a: ["Force RP = forcer une action / Powergaming = action irréaliste", "Aucune"], correct: 0 },
    { q: "Si tu continues à tirer après avoir pris plusieurs balles, quelle faute ?", a: ["NoPain RP", "NoFear RP"], correct: 0 },
    { q: "Que veut dire Streamhack ?", a: ["Utiliser des infos venant d’un live/stream", "Voir le stream"], correct: 0 },
    { q: "Si tu reviens sur une scène après ton coma, quelle faute ?", a: ["Retour Zone", "Aucune"], correct: 0 },
    { q: "Que veut dire CopBait ?", a: ["Provoquer la police sans raison RP", "Faire RP"], correct: 0 },
    { q: "Si tu tues un joueur sans raison, quelle faute ?", a: ["Free Kill", "Kill RP"], correct: 0 },
    { q: "Rouler avec une voiture de route en montagne, quelle faute ?", a: ["Off-Road", "Aucune"], correct: 0 },

    // Métiers & organisations (8)
    { q: "Quels métiers sont interdits pour activités illégales ?", a: ["Gouvernement, LSPD, EMS…", "Tous"], correct: 0 },
    { q: "Combien de personnes maximum peuvent travailler dans un bar/restaurant ?", a: ["20", "10"], correct: 0 },
    { q: "Peux-tu créer une entreprise sans faire de dossier RP ?", a: ["Non", "Oui"], correct: 0 },
    { q: "Combien faut-il de membres minimum pour créer un groupe ?", a: ["5", "3"], correct: 0 },
    { q: "Combien d’armes lourdes un gang peut-il avoir au maximum ?", a: ["0", "5"], correct: 0 },
    { q: "Est-ce qu’un groupe de PF peut braquer une bijouterie ?", a: ["Non", "Oui"], correct: 0 },
    { q: "Est-ce qu’un cartel peut s’allier avec un autre groupe pendant une guerre ?", a: ["Non", "Oui"], correct: 0 },
    { q: "Différence entre guerre intergroupe et petit conflit ?", a: ["Guerre = dossier officiel / Petit conflit = désaccord RP", "Même chose"], correct: 0 },
];

// Mélanger les questions et choisir 10
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

const quizQuestions = shuffle(questions).slice(0, 10);

const quizContainer = document.getElementById("quiz-container");

quizQuestions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = `<p>${index + 1}. ${q.q}</p>`;
    const answersDiv = document.createElement("div");
    answersDiv.className = "answers";
    q.a.forEach((answer, i) => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="q${index}" value="${i}"> ${answer}`;
        answersDiv.appendChild(label);
    });
    questionDiv.appendChild(answersDiv);
    quizContainer.appendChild(questionDiv);
});

document.getElementById("submit-btn").addEventListener("click", () => {
    let score = 0;
    quizQuestions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) {
            score++;
        }
    });
    document.getElementById("result").innerText = `Ton score : ${score} / 10`;
});
