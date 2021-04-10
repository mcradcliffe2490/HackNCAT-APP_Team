import {API_PUBLIC_KEY, API_PRIVATE_KEY} from './configVault.js'


// example: http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150

//<script src="http://www.myersdaily.org/joseph/javascript/md5.js"></script>
// <script type = "module" src = "fetchHeroData.js"></script>
// both of these lines need to be added to HTML file

document.getElementById("button").addEventListener("click", fetchHeroData)

async function fetchHeroData(event) {
    //sets up first api request
    let ts = event.timestamp;
    let hash = md5(ts + API_PRIVATE_KEY + API_PUBLIC_KEY)
    let siteRequest = "https://gateway.marvel.com/v1/public/characters?name="
    let heroName = "Spider-Man" //Hardcoded right now, but will be the result of fetching a random hero name
    let heroRequest = siteRequest + heroName + "&ts=" + ts + "&apikey=" + API_PUBLIC_KEY + "&hash=" + hash
    let endOfRequest = "&ts=" + ts + "&apikey=" + API_PUBLIC_KEY + "&hash=" + hash
    let comicsList = []

    const heroMetaData = await fetch(heroRequest).then(result => result.json())
        .then(result => {
            let heroData = result.data.results[0]

            console.log(heroData.description)
            //goes through hero's individual comics
            heroData.comics.items.forEach((item) => {
                console.log(item.name)
                comicsList.push(item.resourceURI)
            })
            //console.log(heroData)
            return heroData
        })

    // const comicMetaData = await fetch(comicsList[0] + endOfRequest).then(result => result.json())
    //     .then(result => {
    //         return result.data.results[0]
    //     })

    console.log(heroMetaData)
    //console.log(comicMetaData)


}