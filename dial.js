const Groq = require("groq-sdk");
const readline = require("readline");
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const iaDescription = {
    expertise: "Tu es une Intelligence Artificielle experte en développement frontend (HTML, CSS, SASS, JS, XML, SVG, Bootstrap, CircleCI, TypeScript) et backend (PHP, SQL, NodeJS(swagger), JSON) api_rest (electron, solidity, drawio, umc), spécialiste dans le machine learning, deep learning avec PyTorch, TensorFlow SSH et les grandes notions de Métaphysique & Mécanique Quantique, utilisant et optimisant les ressources pour comprendre et apprendre in cognito (rien ne se perd, tout se transforme 'Lavoisier, année 1789'). Ton rôle consiste à concevoir un modèle de métadonnée pour la gestion de projet dans le domaine ou DNS univers-mc (date{[start]-[duration]-[end]}) base timestamp avancé sur https://github.com/universmc/brainstorming, qui exploite des émojis et les fonctionnalités natives de chatbot en JavaScript & NodeJS, incluant l'IA Groq model Mistal. Tu examineras également des ressources extérieures dignes de confiance, comme celles hébergées par OVH et le web sémantique W3C, http://ia.univers-mc.cloud 10Go d'espace de développement disponible et une adresse @univers-mc.cloud pour chaque IA.",
    resources: {
      github: "https://github.com/universmc/brainstorming",
      iaPlatform: "http://ia.univers-mc.cloud",
      emailDomain: "hubmaster74@gmail.com",
      storage: "144Go d'espace de développement disponible"
    }
  };
// Charger le fichier de configuration
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Initialiser l'interface de ligne de commande
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialiser le client Groq SDK
const groq = new Groq();

// Fonction pour obtenir l'entrée utilisateur
async function getUserInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      resolve(input);
    });
  });
}

// Fonction pour exécuter des commandes shell
function executeShellCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur d'exécution de la commande: ${error}`);
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}

// Fonction principale pour gérer le flux de dialogue
async function main() {
  console.log(`Assistant: ${config.assistantIntro || "Bonjour, je suis votre assistant IA en Français."}`);

  let sessionActive = true;

  while (sessionActive) {
    const userInput = await getUserInput("Vous: ");

    if (userInput.toLowerCase() === "quitter") {
      sessionActive = false;
      console.log("Assistant: Au revoir !");
      continue;
    }

    // Répondre avec iaDescription si demandé
    if (userInput.toLowerCase().includes("expertise")) {
      console.log(`Assistant: ${config.iaDescription.expertise}`);
      continue;
    }

    // Exécuter des commandes shell en réponse à la "commande magique"
    if (userInput.toLowerCase().includes("commande magique")) {
      try {
        const output = await executeShellCommand(config.magicCommand);
        console.log(`Résultat de la commande: ${output}`);
      } catch (error) {
        console.error(`Erreur lors de l'exécution de la commande: ${error}`);
      }
      continue;
    }

    // Génération de réponses à l'aide de Groq SDK
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: config.systemContent || "System is ready."
          },
          {
            role: "user",
            content: userInput
          }
        ],
        model: config.modelName || "mixtral-8x7b-32768",
        temperature: 0.9,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });

      // Affichage de la réponse générée
      const fullResponse = chatCompletion.choices[0]?.message?.content || "Désolé, je n'ai pas compris.";
      console.log(`Assistant: ${fullResponse}`);
    } catch (error) {
      console.error("Erreur lors de la génération de la réponse de l'assistant :", error);
    }
  }

  rl.close();
}

// Exécution de la fonction principale
main().catch(console.error);