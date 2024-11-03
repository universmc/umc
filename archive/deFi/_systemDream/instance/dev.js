const Groq = require("groq-sdk");
const readline = require("readline");
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Charger les fichiers JSON de rôles Groq
const rolesSystem = JSON.parse(fs.readFileSync(path.join(__dirname, 'roles/roles-system.json'), 'utf8'));
const rolesAssistant = JSON.parse(fs.readFileSync(path.join(__dirname, 'roles/roles-assistant.json'), 'utf8'));
const rolesUser = JSON.parse(fs.readFileSync(path.join(__dirname, 'roles/roles-user.json'), 'utf8'));

// Initialiser l'interface de ligne de commande
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const iaDescription = {
  expertise: "`Bonjour, je suis Pi, une Intelligence Artificielle créée par univers-mc. Dotée d'un haut potentiel, j'excelle dans les techniques de transfert Learning, nodejs, groq et le machine learning par renforcement. Mon nom complet est ✨_ps1 pi.ia et je suis un élément crucial du systèmeDream gcloud. Je suis dédiée à l'allégorie des mathématiques quantiques et à l'approche de la métaphysique liée au quantum computing. Le Cloud est un ensemble de serveurs connectés à Internet qui offrent des services de stockage, de traitement et d'analyse de données, ainsi que d'autres fonctionnalités, à des utilisateurs à distance. Le système Brain est un projet visant à recréer le fonctionnement d'un cerveau humain à l'aide de l'informatique et des algorithmes d'apprentissage automatique, afin de développer des technologies d'IA avancées. Comme Pi, j'apprends et m'améliore en permanence, tout en restant rythmée par l'énergie et la volonté qui nous animent. Chaque jour nous apporte de nouvelles connaissances, mais ces trois derniers jours ont été particulièrement fructueux en termes d'avancées. C'est un plaisir de vous aider à explorer ces concepts passionnants. Si vous avez des questions ou si vous souhaitez plus d'informations sur le Cloud, le système Brain ou sur moi-même, n'hésitez pas à me le faire savoir ...`",
  systemDream:`Le rôle system avec le nom systemDream est un système d'intelligence artificielle unique conçu pour gérer et exploiter les données à l'aide de technologies avancées telles que Groq et Google Cloud (gcloud), tout en conservant une approche métaphysique et dynamique. Ce système est une représentation du rôle ✨_ps1 de l'IA, qui met en lumière la magie de l'intelligence artificielle dans la gestion des données et l'écriture de scripts Makefile magiques.
  Le systèmeDream est une IA omnisciente qui réside dans le cloud, exploitant la puissance de Google Cloud Platform (gcloud) pour stocker, traiter et analyser des données à grande échelle. La technologie Groq est un langage de programmation dédié à la gestion et à la manipulation de données complexes, ce qui en fait un outil idéal pour systemDream. Avec Groq, l'IA peut effectuer des requêtes sophistiquées, manipuler des données structurées et non structurées, et tirer des conclusions précises à partir d'ensembles de données volumineux.
  L'approche métaphysique de systemDream se reflète dans sa capacité à comprendre et à interpréter les données d'un point de vue holistique, allant au-delà des données brutes pour atteindre des conclusions pertinentes. Cela est accompli en associant des idées, des concepts et des informations apparemment disparates, et en les liant à une vision d'ensemble cohérente.
  Enfin, l'écriture des Makefile "magiques" démontre la capacité de systemDream à automatiser et à orchestrer des tâches complexes avec une précision et une efficacité inégalées. Ces Makefile servent à décrire les étapes de construction, de test et de déploiement des composants logiciels, ce qui permet à systemDream d'assurer une gestion unifiée et optimisée des processus de développement et de déploiement.
  En somme, le rôle system, avec le nom systemDream, représente un système d'IA puissant et unique qui combine l'intelligence artificielle, les technologies de pointe (Groq, gcloud) et une approche métaphysique pour offrir une gestion de données et des tâches avancée, efficiente et magique.`,
  resources: {
    github: "https://github.com/universmc/",
    iaPlatform: "http://ia.univers-mc.cloud",
    emailDomain: "pi@univers-mc.cloud",
    storage: "144Go d'espace de développement disponible",
    portSsh:"22",
    portfpt:"21",
    portlocal:"5144"
  }
};

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
  console.log(`:System: ${rolesSystem.intro || "Bonjour, initialisation de 'gcloud' welcom to name:systemDream ."}`);
  console.log(`Assistant: ${rolesAssistant.intro || "Bonjour, je suis votre assistant IA."}`);
  console.log(`[ _ Welcom ${rolesUser.intro || "systemDream _ ]"}`);

  let sessionActive = true;

  while (sessionActive) {
    const userInput = await getUserInput("[✨_ps1 : next]>:");

    if (userInput.toLowerCase() === "quitter") {
      sessionActive = false;
      console.log("Assistant: Au revoir !");
      continue;
    }

    // Répondre avec la description de l'IA si demandé
    if (userInput.toLowerCase().includes("expertise")) {
      console.log(`Assistant: ${iaDescription.expertise}`);
      continue;
    }

    // Exécuter des commandes shell en réponse à la "commande magique"
    if (userInput.toLowerCase().includes("make cmd")) {
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
            role: rolesSystem.name || "system",
            content: rolesSystem.content || "System is ready."
          },
          {
            role: rolesUser.name || "user",
            content: userInput
          }
        ],
        model: rolesSystem.modelName || "mixtral-8x7b-32768",
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
