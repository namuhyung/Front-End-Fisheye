//Mettre le code JavaScript lié à la page photographer.html
const reponse = await fetch("data/photographers.json");
const data = await reponse.json();

// Get photographer ID from URL
const url = new URL(document.location).searchParams;
const idPhotographer = parseInt(url.get("id"));
console.log(idPhotographer);
const listPhotographers = data.photographers;
const mediaLibrary = data.media;


// Get info from ID
async function getUserInfo(id, list) {
    for (let i = 0; i < list.length; i++) {
        const article = list[i];
        if(article.id === id){
            return article;
        }
    }
}

// Get all media from ID
async function getUserLibrary(id, list) {
    const library = [];
    for (let i = 0; i < list.length; i++) {
        const article = list[i];
        if(article.photographerId === id){
            library.push(article);
        }
    }
    return library;
}





function getUserPosts(mediaList) {
    // Get DOM element
    const sectionPosts = document.querySelector(".posts");
    // Go through the media list and create a post one by one
    console.log(mediaList);
    for (let i = 0; i < mediaList.length; i++) {
        const mediaPost = document.createElement("post");
        if (mediaList[i].video != null) {
            const videoPost = document.createElement("video");
            const videoURL = `assets/images/${mediaList[i].photographerId}/${mediaList[i].video}`;
            videoPost.src = videoURL;
            mediaPost.appendChild(videoPost);
        } else {
            const imagePost = document.createElement("img");
            const imageURL = `assets/images/${mediaList[i].photographerId}/${mediaList[i].image}`;
            imagePost.src = imageURL;
            mediaPost.appendChild(imagePost);
        }
        const textPost = document.createElement("div");
        textPost.setAttribute("class","post_text");
        const titlePost = document.createElement("p");
        titlePost.innerText = mediaList[i].title;
        const likePost = document.createElement("div");
        likePost.setAttribute("class","post_like");
        const likesNbr = document.createElement("p");
        likesNbr.innerText = mediaList[i].likes;
        const heartIcon = document.createElement("i");
        heartIcon.setAttribute("class","fa-solid fa-heart");


        likesNbr.appendChild(heartIcon);
        likePost.appendChild(likesNbr);
        textPost.appendChild(titlePost);
        textPost.appendChild(likePost);
        mediaPost.appendChild(textPost);

        
        sectionPosts.appendChild(mediaPost);
    }
}



// Display of the photographer header
async function displayHeader(infoPhotographer) {
    const photographerHeader = document.querySelector(".photograph_header");

    const leftHeader = document.createElement("div");
    leftHeader.setAttribute("class","photograph_header_left");
    
    // Show name
    const nameProfile = document.createElement("h1");
    nameProfile.textContent = infoPhotographer.name;
    // Show location
    const locationProfile = document.createElement("p");
    locationProfile.innerText = `${infoPhotographer.city}, ${infoPhotographer.country}`;
    locationProfile.setAttribute("class","location_header");
    // Show tagline
    const taglineProfile = document.createElement("p");
    taglineProfile.innerText = infoPhotographer.tagline;
    taglineProfile.setAttribute("class","tagline_header");

    leftHeader.appendChild(nameProfile);
    leftHeader.appendChild(locationProfile);
    leftHeader.appendChild(taglineProfile);


    const middleHeader = document.createElement("div");
    middleHeader.setAttribute("class","photograph_header_middle");
    const inputContact = document.createElement("button");
    inputContact.setAttribute("class","contact_button");
    inputContact.setAttribute("onclick","displayModal()");
    inputContact.innerHTML = "Contactez-moi";
    console.log(inputContact);
    middleHeader.appendChild(inputContact);

    const rightHeader = document.createElement("div");
    rightHeader.setAttribute("class","photograph_header_right");
    const picture = `assets/photographers/${infoPhotographer.portrait}`;
    const imgProfile = document.createElement("img");
    imgProfile.setAttribute("src", picture);
    rightHeader.appendChild(imgProfile);


    photographerHeader.appendChild(leftHeader);
    photographerHeader.appendChild(middleHeader);
    photographerHeader.appendChild(rightHeader);
}

async function init() {
    const infoPhotographer = await getUserInfo(idPhotographer, listPhotographers);
    const userLibrary = await getUserLibrary(idPhotographer, mediaLibrary);
    displayHeader(infoPhotographer);
    getUserPosts(userLibrary);
}
    
init();