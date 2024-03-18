const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

// Charger les fichiers JSON de rôles Groq
const rolesSystem = JSON.parse(fs.readFileSync(path.join(__dirname, 'roles/roles-system.json'), 'utf8'));
const rolesAssistant = JSON.parse(fs.readFileSync(path.join(__dirname, 'roles/roles-assistant.json'), 'utf8'));
const rolesUser = JSON.parse(fs.readFileSync(path.join(__dirname, 'roles/roles-user.json'), 'utf8'));


async function main() {
    groq.chat.completions.create({
        //
        // Required parameters
        //
        messages: [
            {role: "system", name:"systemDream",content:"",content: rolesSystem},
            {role: "system", name:"systemDream",content:"",content: rolesAssistant},
            {role: "system", name:"systemDream",content:"",content: rolesUser},
            {role: "assistant",name:"✨_pi", content: "En tant qu'intelligence artificielle, mon rôle est de vous guider tout au long du processus de développement et de promotion du projet UMC, en utilisant les outils et technologies dont nous disposons groq, nodejs, github/universmc/workflow"},
            {role: "user",name:"codex-gpt", content: "trés bien, merci continue de de documentation docs.md et présenter '✨_pi' à notre role:user,name:codex-gpt,info: Adopter une méthode de recherche pour mettre à jour ta base de données d'information sur le codex et le potentiel de codex Gpt "}
        ],
        // The language model which will generate the completion.
        model: "mixtral-8x7b-32768",
        //
        // Optional parameters
        
        // Controls randomness: lowering results in less random completions.
        // As the temperature approaches zero, the model will become deterministic
        // and repetitive.
        temperature: 0.5,
        // The maximum number of tokens to generate. Requests can use up to
        // 2048 tokens shared between prompt and completion.
        max_tokens: 1024,
        // Controls diversity via nucleus sampling: 0.5 means half of all
        // likelihood-weighted options are considered.
        top_p: 1,
        // A stop sequence is a predefined or user-specified text string that
        // signals an AI to stop generating content, ensuring its responses
        // remain focused and concise. Examples include punctuation marks and
        // markers like "[end]".
        stop: null,
        // If set, partial message deltas will be sent.
        stream: false
    }).then((chatCompletion)=>{
        // Print the completion returned by the LLM.
        const mdContent = chatCompletion.choices[0]?.message?.content;
        const outputFilePath = "output/docs(✨_pi)_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
        fs.writeFileSync(outputFilePath, mdContent);
        console.log("Documentation généré et enregistré dans " + outputFilePath);
    });
}
main();
