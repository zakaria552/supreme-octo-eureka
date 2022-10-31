const inquirer = require('inquirer');
const {fetch100, random10Anime} = require("./index.js")
const fs = require("fs/promises");
//random10Anime()
console.log("---------anime world---------")

const option = [
    {
        type: "list",
        name: "feature",
        message: "choose the available features",
        choices: ["random ten anime", "unknown", "unknown"]
    }
]
function initilize() {
    const option = [
        {
            type: "list",
            name: "feature",
            message: "choose the available features",
            choices: ["random ten anime", "unknown", "unknown"]
        }
    ]
    inquirer
    .prompt(option).then((ans) => {
        if(ans.feature === "unknown") {
            console.log("feature not available yet")
            setTimeout(() => {initilize()}, 1000)
        } else{
            random10Anime(() => {
                let choices = []
                console.log("you chose", ans.feature)
                fs.readFile("./tenRandomAnime.txt").then((data) => {
                    const stringData = data.toString()
                    const animes = JSON.parse(stringData)
                    choices = animes.map((anime) => {return anime.attributes.slug})
                    tenRandomAnime(choices)
                })//.then()
            })
        }
    })
}

function tenRandomAnime(arr) {
    const option = [
        {
            type: "list",
            name: "anime",
            message: "Here are ten random anime to watch, select one to learn about",
            choices: arr
        }
    ]
    inquirer
    .prompt(option)
    .then((ans) => {
        console.log(`---->${ans.anime}<----`)
    })
}

initilize()