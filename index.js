

createColorBoxes(6);
pickWinner(6);

function createColorBoxes(intBoxes){

    //create
    const colorVal = document.querySelector('.color')
    let counter = 1;
    const boxDivs = document.querySelector('.color-boxes-container')
    const colorCards = [];
    const winningID = pickWinner(intBoxes);
    for(let i = 1; i <= intBoxes; i++){
        const card = document.createElement('div');
        const p = document.createElement('p');
        card.id = i;
        card.classList.add('box');
        const backgroundColor = createRandomHex();
        card.style.backgroundColor = `#${backgroundColor}`;
        
        p.textContent = `color : ${backgroundColor}`
        card.appendChild(p);
        colorCards.push(card)
    }
    console.log(winningID)
    colorCards.forEach(card => {
        //add event listeners
        if(winningID === parseInt(card.id)){ 
            colorVal.textContent = `GUESS THE COLOR :${rgbToHex(cleanRGB(card.style.backgroundColor))}`
            card.addEventListener('click', e => {
                alert('YOU WON!')
            })
        } else {
            card.addEventListener('click', e=> {
                alert('YOU SUCK')
            } )
        }

        //append
        if (counter <= (colorCards.length / 2)){
            // first row
            card.style.gridRowStart = '1';
            card.style.gridColumnStart = counter;
            card.style.gridColumnEnd = ( counter + 1); 
            boxDivs.append(card);
        } else {
            // second row
            card.style.gridRowStart = '2';
            card.style.gridColumnStart = (counter - (colorCards.length / 2));
            card.style.gridColumnEnd = (counter - ((colorCards.length / 2)- 1));
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