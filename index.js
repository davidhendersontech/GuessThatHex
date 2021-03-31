const playerURL = 'http://localhost:3000/players'
const initialsForm = document.querySelector('#form')
createColorBoxes(9);
winning('matt');

initialsForm.addEventListener('submit',e => {
    e.preventDefault();
    
    const formData = new FormData(initialsForm);
    logIn(formData)
})



function createColorBoxes(intBoxes){

    //create
    const colorVal = document.querySelector('.color')
    let counter = 1;
    const boxDivs = document.querySelector('.color-boxes-container')
    const colorCards = [];
    const winningID = pickWinner(intBoxes);
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
        if(winningID === parseInt(card.id)){ 
            colorVal.textContent = `Guess that HEX! : ${rgbToHex(cleanRGB(card.style.backgroundColor))}`
            card.addEventListener('click', e => {
                alert('YOU WON!')
            })
        } else {
            card.addEventListener('click', e=> {
                alert('YOU SUCK')
            } )
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
    const winningID = Math.floor(Math.random() * 6);
    return ((winningID > 1) ? winningID: winningID + 1)
}

function toHex(color){
    var hex = color.toString(16);
    return hex.length === 1 ? "0"+ hex: hex;
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

function winning(user){
    fetch(playerURL)
        .then(response => response.json())
        .then(e => {
        })
}

// async function getPlayersInfo() {
//     var response = await fetch(playerURL);
  
//     console.log(response.json()); // this line will "wait" for the previous to be completed
    
//   }

 getPlayersInfo() ;

function logIn(form){
    
    let initials = form.get('initials').toUpperCase();
    let playerInfo = 0;
    fetch(playerURL)
        .then(response => response.json())
        .then(e => {
            playerInfo = e;
        })
    console.log(playerInfo)

    // fetch(playerURL)
    //     .then(response => response.json())
    //     .then(json => {
    //         const player = findPlayer(initials,json)
    //         if(player[0]){
    //             //fetch call
    //             const highscoreElement = document.querySelector('.highscore');
    //             highscoreElement.textContent = `Highscore: ${json[player[1]]['highscore']}`
    //         } else {
    //             const playerJSON = {
    //                 'initials' : player[1],
    //                 'highscore': 0,
    //                 'id': player[0]
    //             }    
    //             return playerJSON;
    //         }
    //     })
    
 



    
    // } else {
            //     player.shift() //get rid of false value \ don't want that in the db
            //     const playerJSON = {
            //         'initials' : player[1],
            //         'highscore': 0,
            //         'id': player[0]
            //     }

            //     console.log(JSON.stringifyplayerJSON)
            //     const options = {
            //         METHOD: 'patch',
            //         HEADERS: {
            //             "Content-Type" : "application/json",
            //             "Accept"       : "application/json"
            //         },
            //         BODY: JSON.stringify(playerJSON)
            //     }
            //     fetch(playerURL,options)

    
}

function findPlayer(initials, json){
    const players = Object.values(json)
    let playerFound = false;
    let playerId = 0
    for(let i=0; i < players.length; i++){
        if (initials === players[i]['initials']){
            playerFound = true;
            playerId = i;
            break;
        }
        playerId = i+1;
    }
    return [playerFound,playerId,initials];
}