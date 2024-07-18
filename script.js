const dogsApi = "https://dog.ceo/api/breeds/image/random"
const jokesApi = "https://official-joke-api.appspot.com/random_joke"

let dogImageUrl;
let joke = { setup: "", punchline: "" };

let img = document.querySelector("#image-box");
let setupTag = document.querySelector("#setup")
let punchTag = document.getElementById("punch");
let btn = document.querySelector(".refresh")
let numTag=document.querySelector(".num")

let n=0
setupTag.innerText = ""
punchTag.innerText = ""

const getData = () => {
    let response1 = fetch(jokesApi)
    let response2 = fetch(dogsApi)
    Promise.all([response1, response2])
        .then((response) => {
            return response;
        })
        .then(async (result) => {
            let r1 = await result[0].json()
            let r2 = await result[1].json();

            return [r1, r2]
        })
        .then((result) => {
            dogImageUrl = result[1].message
            joke.punchline = result[0].punchline
            joke.setup = result[0].setup


            img.src = dogImageUrl;
            setupTag.innerText = joke.setup;



        })
        .then(() => {
            let p = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve("show the punchline");
                },3000)
            })
            return p;
        })
        .then((result) => {
            console.log(result)
            punchTag.innerText = joke.punchline
        })
        .catch(error => {
            console.log(error)
        })
}

getData();



btn.addEventListener("click", () => {
    setupTag.innerText = ""
    punchTag.innerText = ""
    n++;
    numTag.innerText=n
    getData();
})