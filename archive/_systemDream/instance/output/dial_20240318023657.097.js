const fs = require('fs');
const path = require('path');

// Chemin vers le fichier template.json
const templatePath = path.join(__dirname, 'template.json');

// Chargement du fichier template.json
const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

// Création d'un message pour le rôle user
const userMessage = {
  role: 'user',
  content: 'Bonjour, je suis le rôle user.'
};

// Création d'un message pour le rôle assistant
const assistantMessage = {
  role: 'assistant',
  content: 'Bonjour, je suis l’assistant, prêt à vous aider dans vos démarches.'
};

// Ajout des messages aux données du modèle
template.messages.push(userMessage);
template.messages.push(assistantMessage);

// Écriture du modèle dans le fichier template.json mis à jour
fs.writeFileSync(templatePath, JSON.stringify(template, null, 2));

console.log('Le fichier template.json a été mis à jour avec les nouveaux messages.');