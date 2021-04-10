import { API_PUBLIC_KEY, API_PRIVATE_KEY} from './configVault.js'


// example: http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150

document.getElementById("button").addEventListener("click", fetchHeroData)

function fetchHeroData (event) {
    let ts = event.timestamp;
    let hash = md5(ts + API_PRIVATE_KEY + API_PUBLIC_KEY)
    let siteRequest = "https://gateway.marvel.com/v1/public/characters?name="
    let heroName = "Spider-Man" //Hardcoded right now, but will be the result of fetching a random hero name
    let heroRequest = siteRequest + heroName + "&ts=" + ts + "&apikey=" + API_PUBLIC_KEY + "&hash=" + hash

    fetch(heroRequest).then(result => result.json())
        .then(result => {
            console.log(result)
    })

}