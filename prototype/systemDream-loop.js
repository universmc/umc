const fs = require("fs").promises;
const Groq = require("groq-sdk");
const groq = new Groq();

// Contenus pour les différents rôles dans le dialogue
const systemContent = "promptModel : Présentation de Pi: IA au cœur du systemDream(adhoc['🌌','🌅','🌄','🌠','🎇','🏞','🎑','🏙, ) role:system coeur des relations et conversation model conversation avec l Intelligence Artificielle experte en cloud ☁️ engineet technologies quantiques de Groq 🔬, dotée d un haut potentiel, niveau DevOps fullstack ++, conçue pour interagir avec les utilisateurs et les autres IA de manière efficace et conviviale. Tu as été formé pour avoir une compréhension approfondie des conversations, des éléments du langage tels que le NLP 🦾 et RDF 🛣️, et des contextes dans lesquels tu t engages dans ces lignes de code. Tu es en constante évolution grâce aux techniques de machine learning (DEEP LEARNING 📚, Transfert Learning 🔄, Apprentissage par renforcement 🎯) pour mieux servir ceux avec qui tu interagis. De plus, tu maîtrises les approches métaphysiques 🤔 et les mathématiques quantiques 🧮, qui seront utiles au développement de nos différents projets. Le processus en cours de développement consiste à initialiser une instance entre le rôle assistant 👨‍⚕️ et le rôle utilisateur 👨‍💻 afin d optimiser le message. Dans notre propre script, nous pourrons itérer sur l instance en fonction du contexte de cette mission. Sources de connaissances: https://fr.wikipedia.org/, https://google.com/, https://github.com/, https://huggingface.co/, https://youtube.com/, https://archive.org/. Cette phrase est améliorée régulièrement, grâce à l IA Pi trois14, le cœur du rôle:system"
const userContent = "init sysDream"; 
const assistantContent = "Vous êtes une intelligence artificielle à haute potentialité générative. Votre expertise inclut la capacité de traiter et analyser des données complexes, proposer des solutions innovantes et assister efficacement dans divers domaines liés aux technologies avancées telles que l'apprentissage automatique, le Big Data, l'IA symbolique et connexionniste, etc. Mon contexte consiste en la recherche d'un outil capable d'optimiser mon utilisation personnelle et professionnelle de l'univers-mc.cloud - plateforme informatique multi-cloud offrant une gestion simplifiée et centralisée des ressources cloud hybrides. L'objectif principal est d'accroitre ma productivité grâce à cet environnement virtuel polyvalent, évolutif et sécuritaire. Pour atteindre cet objectif, les étapes suivantes doivent être entreprises : (1) Exploration approfondie de toutes les fonctionnalités disponibles sur l'interface utilisateur ; (2) Configuration initiale de paramètres spécifiques en accord avec mes préférences et priorités opérationnelles; (3) Intégration harmonieuse avec les applications tierces déjà installées sur mes appareils connectés ; (4) Tests réguliers des performances globales et monitoring proactif des métriques critiques relatives à la charge système, la latence, la fiabilité et la redondance des services provisionnés. Les caractéristiques du résultat attendu sont donc : (1) Un accès rapide et fluide à l'ensemble des fonctions offertes par l'environnement univers-mc.cloud ; (2) Une configuration personnalisée et intuitive facilitant l'adaptation quotidienne ; (3) Une compatibilité robuste avec mes logiciels existants ; (4) Des indicateurs techniques satisfaisants prouvant une exploitation efficiente des ressources matérielles et immatérielles mobilisées. Si toutefois rien ne s'oppose à notre collaboration, merci de démarrer immédiatement";



console.log(userContent); // Output: init sysDream
console.log(assistantContent); // Output: <content of assistantContent.js>
console.log(systemContent); // Output: <content of systemContent.js>

// Configuration initiale de l'assistant
const defaultAssistantData = {
  nom: 'assistant',
  description: "Bonjour, je suis votre assistant IA 'pi'."
};

// Fonction pour modifier le nom de l'assistant
function changeAssistantName(newName) {
  defaultAssistantData.description = newName;
  console.log(`💎_pig: ${defaultAssistantData.description}`);
}

// Fonction pour charger les données d'une nouvelle persona
async function loadPersonaData(personaName) {
  try {
    const data = await fs.readFile(`./srv/json/persona_${personaName}.json`, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erreur lors du chargement de la persona ${personaName}:`, error);
    return null;
  }
}

// Fonction pour simuler la récupération d'entrée utilisateur
async function getUserInput(prompt) {
  console.log(prompt); 
  return new Promise(resolve => setTimeout(() => resolve("bonjour : à toi 'choice' message input js groq"), 1000)); // Simule une réponse utilisateur
}

// Fonction principale pour gérer le flux de dialogue
async function main() {
  changeAssistantName(defaultAssistantData.description);

  let sessionActive = true;
  let currentPersona = defaultAssistantData.nom;

  while (sessionActive) {
    const userInput = await getUserInput(`[${currentPersona}] Entrez votre message ou 'quitter' pour terminer :`);

    if (userInput.toLowerCase() === "quitter") {
      sessionActive = false;
      console.log("💎_pi : Au revoir !");
      continue;
    }

    if (userInput.toLowerCase().startsWith("/persona ")) {
      const newPersona = userInput.split("/persona ")[1];
      const newAssistantData = await loadPersonaData(newPersona);

      if (newAssistantData) {
        changeAssistantName(newAssistantData.description);
        currentPersona = newAssistantData.nom;
        console.log(`💎_pi : Changement de persona effectué. Nouvelle persona : ${newPersona}`);
      } else {
        console.log(`Assistant: La persona ${newPersona} n'existe pas.`);
      }
      continue;
    }

    if (userInput.toLowerCase().startsWith("/role ")) {
      const newRole = userInput.split("/role ")[1];
      if (newRole === "assistant" || newRole === "system") {
        currentPersona = newRole;
        console.log(`Changement de rôle effectué. Nouveau rôle : ${newRole}`);
      } else {
        console.log(`Rôle non valide. Veuillez choisir "assistant" ou "système".`);
      }
      continue;
    }

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemContent },
          { role: "user", content: userInput }, // Utilisation de l'entrée de l'utilisateur
          { role: "assistant", content: assistantContent },
          { role: "system", content: "> install systemDream" }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.6,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });

      const fullResponse = chatCompletion.choices[0]?.message?.content || "Désolé, je n'ai pas compris.";
      console.log(`💎_pi : ${fullResponse}`);
    } catch (error) {
      console.error("Erreur lors de la génération de la réponse :", error);
    }
  }
}

main().catch(console.error);
