const Groq = require("groq-sdk");
const readline = require("readline");
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Charger les fichiers JSON depuis le répertoire backend/json
const systemData = require('../backend/json/roles-system.json');
const assistantData = require('../backend/json/roles-assistant.json');
const userData = require('../backend/json/roles-user.json');

// Initialiser l'interface de ligne de commande
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialiser le client Groq SDK
const groq = new Groq();

// Fonction pour obtenir l'entrée utilisateur
async function getUserInput(role) {
  return new Promise((resolve) => {
    rl.question(`${role.description}: `, (input) => {
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
  console.log(`Assistant: ${assistantData.description || "Bonjour, je suis votre assistant IA en Français."}`);

  let sessionActive = true;

  while (sessionActive) {
    const userInput = await getUserInput(userData);

    if (userInput.toLowerCase() === "quitter") {
      sessionActive = false;
      console.log("Assistant: Au revoir !");
      continue;
    }

    // Exécuter des commandes shell en réponse à la "commande magique"
    if (userInput.toLowerCase().includes("commande magique")) {
      try {
        const output = await executeShellCommand(systemData.taches[0].emoji || "echo 'Commande magique exécutée'");
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
            role: systemData.nom,
            content: systemData.description || "System is ready."
          },
          {
            role: assistantData.nom,
            content: userInput
          }
        ],
        model: systemData.modelName || "mixtral-8x7b-32768",
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
