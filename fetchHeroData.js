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
    let comicsList = []
    let heroId = ""

    await fetch(heroRequest).then(result => result.json())
        .then(result => {
            let heroData = result.data.results[0]
            heroId = heroData.id

            console.log(heroData.description)
            document.getElementById("heroText").textContent = heroName + ": " + heroData.description
            //goes through hero's individual comics
            heroData.comics.items.forEach((item) => {
                comicsList.push(item.resourceURI)
            })
            //console.log(heroData)
            return heroData
        })

    let endOfRequest = "&ts=" + ts + "&apikey=" + API_PUBLIC_KEY + "&hash=" + hash
    let comicMetaData = []
    async function getComic(index) {
        let comicRequest = "https://cors-anywhere.herokuapp.com/" + comicsList[index] + "?" + endOfRequest
        console.log(comicRequest)
        const comicMetaData = await fetch(comicRequest).then(result => result.json())
            .then(result => {
                return result.data.results[0]
            })
        return comicMetaData
    }
    comicMetaData.push(getComic(0))
    comicMetaData.push(getComic(1))
    comicMetaData.push(getComic(2))
    comicMetaData.push(getComic(3))
    comicMetaData.push(getComic(4))



    // get comic picture
    for(let i = 1; i < 6; i++) {
        let comicData = await getComic(i)
        document.getElementById("column" + i).innerHTML =
            "<img src=" +
            comicData.thumbnail.path +
            "/landscape_medium.jpg" +
            " height=\"200\" name=" +
            event.target.name +
            "id=\"comicPic\"/>" + document.getElementById("column" + i).innerHTML
    }

    // add description
    for(let i = 1; i < 6; i++) {
        let comicData = await getComic(i)
        if (comicData.description === null) {
            document.getElementById("description" + i).textContent += comicData.title + ": " +
                "No Description"
        } else {
            document.getElementById("description" + i).textContent += comicData.title + ": " +
                comicData.description
        }

    }
}