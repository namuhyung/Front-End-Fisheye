const reponse = await fetch("data/photographers.json");
const data = await reponse.json();


const listPhotographers = data.photographers;
console.log(listPhotographers);


    async function getPhotographers(profiles) {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        let photographers = profiles;
        console.log("photographers");
        return ({
            photographers })
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        displayData(listPhotographers);
    }
    
    init();
    
