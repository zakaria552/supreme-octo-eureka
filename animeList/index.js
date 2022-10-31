const promises = require("fs/promises")
const axios = require("axios");

function fetch100() {
    let count = 0;
    const anime100 = []
    return function fetch() {
        if(count === 100) {
            promises.writeFile("./anime100.txt", JSON.stringify(anime100)).then(() => {})
            //console.log("fetching ended")
        } else {
            axios.get(`https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=${count}`).then((res) => {
                count += 10
                res.data.data.forEach((anime) => {anime100.push(anime)})
                fetch()
            })
        }
    }  
}

function random10Anime(callback) {
    let random10Anime;
    return promises.readFile("./anime100.txt").then((data) => {
        const anime100 = JSON.parse(data.toString());
        const randomNums = []
        for(let i = 0; i < 10; i++) {
            let randomNum = Math.floor(Math.random() * 100)
            randomNums.push(randomNum)
        }
        random10Anime = randomNums.map((id) => {
            return anime100[id]
        })
        promises.writeFile("./tenRandomAnime.txt", JSON.stringify(random10Anime)).then(() => {
            callback()
        })
        //console.log(random10Anime)
    })
}
function initilize() {
    fetch100().then(() => {console.log("next")})
}

(fetch100())()
//random10Anime()

//new Promise((res, rej) => {res("")}).then(() => {(fetch100())()}).then(() => (console.log("end")))
module.exports = {fetch100, random10Anime}

