function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        // Create link that includes img and name
        const urlProfile = document.createElement("a");
        urlProfile.setAttribute("href",`photographer.html?id=${id}`)
        const imgProfile = document.createElement("img");
        imgProfile.setAttribute("src", picture);
        // Aria attribute for every picture
        imgProfile.setAttribute("aria-label", name);
        const nameProfile = document.createElement("h2");
        nameProfile.textContent = name;
        // Get city, country, tagline and price
        const locationProfile = document.createElement("p");
        locationProfile.innerText = `${city}, ${country}`;
        locationProfile.setAttribute("class","location");

        const taglineProfile = document.createElement("p");
        taglineProfile.innerText = tagline;
        taglineProfile.setAttribute("class","tagline");


        const priceProfile = document.createElement("p");
        priceProfile.innerText = `${price}€/jour`;
        priceProfile.setAttribute("class","price");



        urlProfile.appendChild(imgProfile);
        urlProfile.appendChild(nameProfile);
        article.appendChild(urlProfile);
        article.appendChild(locationProfile);
        article.appendChild(taglineProfile);
        article.appendChild(priceProfile);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}