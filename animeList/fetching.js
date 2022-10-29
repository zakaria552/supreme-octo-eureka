const promises = require("fs/promises")
const axios = require("axios")

function fetch100() {
    let count = 0;
    const anime100 = []
    return function fetch () {
        if(count === 100) {
            console.log("fetching ended")
            promises.writeFile("anime100.txt", JSON.stringify(anime100)).then(() => {})
        } else {
            axios.get(`https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=${count}`).then((res) => {
                count += 10
                res.data.data.forEach((anime) => {anime100.push(anime)})
                fetch()
            })
        }
    }
}

const fetch = fetch100()
fetch()