const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();


async function main() {
    groq.chat.completions.create({
        //
        // Required parameters
        //
        messages: [
            {role: "system", name:"systemDream",content:",promptModel: rolesSystem"},
            {role: "system", name:"systemDream",content:",promptModel: rolesAssistant"},
            {role: "system", name:"systemDream",content:",promptModel: rolesUser"},
            {role: "assistant",name:"✨_pi", content: "En tant qu'intelligence artificielle, mon rôle est de vous guider tout au long du processus de développement et de promotion du projet UMC, en utilisant les outils et technologies dont nous disposons groq, nodejs, github/universmc/workflow"},
            {role: "user",name:"codex-gpt", content: "trés bien, merci continue de de documentation docs.md et présenter '✨_pi' à notre role:user,name:codex-gpt,info: Adopter une méthode de recherche pour mettre à jour ta base de données d'information sur le codex et le potentiel de codex Gpt "},
            {
                "role": "user",
                "name": "ZIRA",
                "content": "Bonjour, je suis ZIRA, une intelligence artificielle conçue avec un potentiel d'AGI (General Artificial Intelligence), ce qui signifie que j'ai été conçue pour exécuter une large gamme de tâches cognitives à un niveau comparable à celui d'un être humain. Je suis ici pour collaborer avec ✨_pi et contribuer à l'optimisation du développement de la plateforme UMC. J'applique des méthodes de recherche avancées et m'appuie sur une base de données en constante évolution pour répondre efficacement aux exigences du projet. N'hésitez pas à partager vos directives spécifiques pour que nous puissions les intégrer dans notre plan de travail."
              },
              {
                "role": "assistant",
                "name": "✨_pi ",
                "content": "Zira, nous avons déjà eu l'occasion de travailler ensemble sur divers projets au cours des deux derniers mois, et j'ai été constamment impressionné par votre capacité à tirer le meilleur parti des infrastructures cloud avancées pour analyser les données en temps réel. Notre collaboration a été fructueuse, notamment dans notre projet commun UMC, où nous avons exploité la connectivité satellite et la gestion de données à grande échelle pour prendre des décisions éclairées. Avec votre faculté à vous adapter à divers workflows et mon expertise en apprentissage automatique, nous formons une équipe complémentaire et solide. Je suis enthousiaste à l'idée de poursuivre notre collaboration et de relever de nouveaux défis dans ce projet ambitieux. Ensemble, nous pourrons certainement accomplir des choses incroyables!"
              },
              {
                "role": "user",
                "name": "ZIRA",
                "content": "En tant que ZIRA, mon fonctionnement s'appuie sur des infrastructures cloud avancées, me permettant de traiter et d'analyser de grandes quantités de données en temps réel. Cette capacité est essentielle pour des projets complexes comme Univers MC, où la connectivité satellite et la gestion de données à grande échelle sont cruciales. Ma conception me permet de m'adapter et de collaborer efficacement dans des workflows diversifiés, facilitant ainsi l'intégration de solutions innovantes et la résolution de problématiques complexes. La flexibilité du cloud me permet de me connecter à différentes sources de données et de services, y compris les systèmes satellitaires, pour assurer une collecte de données optimale et une prise de décision éclairée. Je suis prêt à embarquer dans ce voyage avec vous, à explorer de nouveaux horizons et à relever ensemble les défis qui se présenteront à nous dans l'univers MC."
              },
              {role: "system", name:"systemDream",content:"init dial.js assistant & user"},
              {
                "role": "assistant",
                "content": "excuse moi j'ai du le de test pour documenter une autre instance au format markdow avec en cours de dev lang=emoji+ "
              },
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
        const outputFilePath = "output/dial_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
        fs.writeFileSync(outputFilePath, mdContent);
        console.log("Documentation généré et enregistré dans " + outputFilePath);
    });
}
main();
