let card = document.getElementById("col-6")
let groupName = document.getElementById("card-header")
let teamImage = document.querySelectorAll("#team-img img")
let teamName = document.querySelectorAll("#team-img p")
let win = document.querySelectorAll("#content #w")
let lose = document.querySelectorAll("#content #l")
let draw = document.querySelectorAll("#content #d")
let points = document.querySelectorAll("#content #pts")
let firstTeamImg = document.querySelector("#firstTeam #team-img img")
let firstTeamName = document.querySelector("#firstTeam #team-img p")
let secondTeamImg = document.querySelector("#secondTeam #team-img img")
let secondTeamName = document.querySelector("#secondTeam #team-img p")
let firstTeamScore = document.querySelector("#firstTeamScore")
let secondTeamScore = document.querySelector("#secondTeamScore")
let fixtureGroupName = document.querySelector("#groupName")
let time = document.querySelector("#time")
let fixtureRow = document.querySelector("#fixtureRow")
// console.log(fixtureRow.innerHTML)

document.getElementById("main-row").innerHTML = ""

// Start API request for groups
let groupRequest = new XMLHttpRequest();
groupRequest.open("GET","https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=1")
groupRequest.setRequestHeader("X-RapidAPI-Key", "a7a1db6899mshf8e4b157a1c1cd4p172437jsn831f1ca1af0d");
groupRequest.setRequestHeader("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com");
groupRequest.responseType = "json"
groupRequest.send();
groupRequest.onload = function(){

    let standings = groupRequest.response.response[0].league.standings
    // console.log(standings)
    for(let i = 0; i < standings.length; i++){
        groupName.innerText = standings[i][0].group // Group Name

        for(let j = 0; j < 4; j++){
            teamImage[j].setAttribute("src",`${standings[i][j].team.logo}`) // team logo
            teamName[j].innerText = standings[i][j].team.name // team name
            for(let k = 0 ; k < 4 ; k++){
                win[k].innerText = standings[i][k].all.win //win
                lose[k].innerText = standings[i][k].all.lose //lose
                draw[k].innerText = standings[i][k].all.draw //drow
                points[k].innerText = standings[i][k].points //point
            }
        }
        let a = `<div class="col-6" id="col-6">
        ${card.innerHTML}
        </div>`
        document.getElementById("main-row").innerHTML += a
    }
}

// // Start API request for fixtures
let fixtureRequest = new XMLHttpRequest();
fixtureRequest.open("GET","https://api-football-v1.p.rapidapi.com/v3/fixtures?league=1&season=2022&from=2022-11-20&to=2022-12-02")
fixtureRequest.setRequestHeader("X-RapidAPI-Key", "a7a1db6899mshf8e4b157a1c1cd4p172437jsn831f1ca1af0d");
fixtureRequest.setRequestHeader("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com");
fixtureRequest.responseType = "json"
fixtureRequest.send();
fixtureRequest.onload = function(){
    let fixtures = fixtureRequest.response.response
    console.log(fixtures)
    for(let i = 0; i < fixtures.length; i++){
        firstTeamImg.setAttribute("src",`${fixtures[i].teams.away.logo}`)
        firstTeamName.innerText = fixtures[i].teams.away.name
        if(fixtures[i].goals.away === null & fixtures[i].goals.home === null){
            firstTeamScore.innerText = "-"
            secondTeamScore.innerText = "-"
        }else{
            firstTeamScore.innerText = fixtures[i].goals.away
            secondTeamScore.innerText = fixtures[i].goals.home
        }
        
        secondTeamImg.setAttribute("src",`${fixtures[i].teams.home.logo}`)
        secondTeamName.innerText = fixtures[i].teams.home.name
        fixtureGroupName.innerText = fixtures[i].league.round
        let timeFormat = new Date(fixtures[i].fixture.date)
        time.innerText = timeFormat.toLocaleString('en-GB', { timeZone: 'Africa/Cairo' })
        
        let a = ` <div class="row mb-4" id="fixtureRow">
        ${fixtureRow.innerHTML}
        </div>`
        document.querySelector("#fixtureDiv").innerHTML += a
    }
}