const playerURL = 'http://localhost:3000/players/'
const initialsForm = document.querySelector('#form')
const highscore = document.querySelector('.highscore');
const playerInitialsElement = document.querySelector('.playerInitials')
const streakElement = document.querySelector('.currentStreak');
const boxDivs = document.querySelector('.color-boxes-container');
const partyButton = document.querySelector('.party');
const colorValue = document.querySelector('.color-value');
let currentPlayer = null;
let playerLoggedIn = false;

// createColorBoxes(9);
createGame();

initialsForm.addEventListener('submit',e => {
    e.preventDefault();
    playerLoggedIn = true;
    streakElement.textContent = `Current streak: 0`;
    const formData = new FormData(initialsForm);
    logIn(formData)
    createGame()
})

colorValue.addEventListener('click', e => {
    
    
    let array = colorValue.textContent.split('');
    array.shift();
    colorValue.textContent = toRGB(array);
    
})

partyButton.addEventListener('wheel',partyMode)
function partyMode(){
    setInterval(nextRound(0),500)
}
function createGame(){
    let streak = 0;
    if (!playerLoggedIn){
        playerInitialsElement.textContent = "PLEASE LOG IN BELOW TO START";
        createColorBoxes(9,false,0)
    } else {
        clearGrid()
        createColorBoxes(9,true,0)
        
    }
}
function streakUp(streak){
    alert('NICE JOB')
    streak += 1;
    nextRound(streak);
    streakElement.textContent = `Streak: ${streak}`;
    return streak;
}
function streakLost(streak){
    console.log('streak',streak);
    const options = {
        method : 'PATCH',
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({'highscore': streak})
        
    }
    getPlayersInfo()
        .then(e => { 
            const oldHighScore = e[currentPlayer]['highscore']
            console.log('oldHighscore', oldHighScore)
            if (streak > oldHighScore){
                console.log(`${streak} > ${oldHighScore}`)
                fetch(playerURL + currentPlayer,options)
                    .then(highscore.textContent = `Highscore: ${streak}`)
            }
        })
        .then(e => {
            alert('STREAK LOST!');
            streak = 0;
            nextRound(streak);
            streakElement.textContent = `Streak: ${streak}`;
            return streak
        })
}

function nextRound(streak){
    clearGrid();
    createColorBoxes(9,true,streak);
}


function clearGrid(){
    const boxes = Array.from(document.querySelectorAll('.color-boxes-container div'));
    for(let box in boxes){
        boxes[box].remove();
    }
}

function createColorBoxes(intBoxes,gameStart, streak){

    //create
    const colorVal = document.querySelector('.color-value')
    let counter = 1;
   
    const colorCards = [];
    const winningID = pickWinner(intBoxes);
    console.log('winner', winningID)
    for(let i = 1; i <= intBoxes; i++){
        const card = document.createElement('div');
        card.id = i;
        card.classList.add('box');
        const backgroundColor = createRandomHex();
        card.style.backgroundColor = `#${backgroundColor}`;
        colorCards.push(card)
    }

    
    colorCards.forEach(card => {
        //add event listeners
        if(gameStart){
            if(winningID === parseInt(card.id)){ 
                colorVal.textContent = `${rgbToHex(cleanRGB(card.style.backgroundColor))}`
                card.addEventListener('click', e => {
                    
                    streak = streakUp(streak)
                    
                })
            } else {
                card.addEventListener('click', e=> {
                    streak = streakLost(streak);
                } )
            }
        }
        

        //append
        if (counter <= (colorCards.length / 3)){
            // first row
            card.style.gridRowStart = '1';
            card.style.gridColumnStart = counter;
            card.style.gridColumnEnd = ( counter + 1); 
            boxDivs.append(card);
        } else if ((counter > (colorCards.length / 3) && (counter <= (colorCards.length) - (colorCards.length / 3)))){
            // second row
            card.style.gridRowStart = '2';
            card.style.gridColumnStart = (counter - (colorCards.length / 3));
            card.style.gridColumnEnd = (counter - ((colorCards.length / 3)- 1));
            boxDivs.append(card);
        } else {
            
            card.style.gridRowStart = '3';
            card.style.gridColumnStart = (counter - (colorCards.length / 3)-3);
            card.style.gridColumnEnd = (counter - ((colorCards.length / 3)- 1)-3);
            boxDivs.append(card);
        }
        counter += 1;
    })
}

function createRandomHex(){
    // color range in decimal : 0 - 16777215                    (Math.random()*16777215)
    //                            white - black
    // color range in hex     : 000000  - ffffff                (Math.random()*16777215).toString(16)
    // we transformed the highest hexadecimal value(ffffff) to decimal to give us 16777215
    // aka our highest color range value (black)
    let randomHexColor = Math.floor(Math.random()*16777215).toString(16)
    return randomHexColor;
}
function pickWinner(intBoxes){
    const winningID = Math.floor(Math.random() * intBoxes);
    return ((winningID > 1) ? winningID: winningID + 1)
}

function toHex(color){
    var hex = color.toString(16);
    return hex.length === 1 ? "0"+ hex: hex;
}
function toRGB(h){
    let r=0, g=0, b=0;
    r = "0x" + h[0] + h[1];
    g = "0x" + h[2] + h[3];
    b = "0x" + h[4] + h[5];
    return "rgb("+ +r + "," + +g + "," + +b + ")";
}

function rgbToHex(numberArray){
    return "#" + toHex(parseInt(numberArray[0])) + toHex(parseInt(numberArray[1])) + toHex(parseInt(numberArray[2]))
}
function cleanRGB(string){
    var pos1 = string.indexOf('\(');
    var pos2 = string.indexOf('\)');
    string = string.slice(pos1+1,pos2)
    var nums = string.split(',');
    return nums;
}

async function getPlayersInfo() {
    var response = await fetch(playerURL);
    var data = await response.json()
    return data;
  };
function logIn(form){
    
    let initials = form.get('initials').toUpperCase();
    
    getPlayersInfo()
        .then(playerArray => {
            if(findPlayer(initials,playerArray)[0]){
                highscore.textContent = `Highscore: ${findPlayer(initials,playerArray)[3]}`;
                playerInitialsElement.textContent = `Player: ${initials}`;
                currentPlayer = findPlayer(initials,playerArray)[1];
                
            } else {
                const playerJSON = {
                    'initials' : findPlayer(initials,playerArray)[2],
                    'highscore': 0,
                    'id': findPlayer(initials,playerArray)[1]
                }
                const options = {
                    method: 'post',
                    headers: {
                        "Content-Type" : "application/json",
                        "Accept"       : "application/json"
                    },
                    body: JSON.stringify(playerJSON)
                }
                fetch(playerURL,options);
                highscore.textContent = `Highscore: 0`;
                playerInitialsElement.textContent = `Player: ${initials}`;
            }
        })
}

function findPlayer(initials, json){
    const players = Object.values(json)
    let playerFound = false;
    let playerId = 0
    let highscore = 0;
    for(let i=0; i < players.length; i++){
        if (initials === players[i]['initials']){
            playerFound = true;
            playerId = i;
            highscore = players[i]['highscore']
            break;
        }
        playerId = i+1;
    }
    return [playerFound,playerId,initials,highscore];
}
