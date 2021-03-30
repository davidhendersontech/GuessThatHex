const colorVal = document.querySelector('.color')

createColorBoxes(6);
pickWinner(6);
function createColorBoxes(intBoxes){
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
    console.log(winningID);
    colorCards.forEach(card => {
       
        if(winningID === parseInt(card.id)){
            card.addEventListener('click', e => {
                alert('YOU WON!')
            })
        } else {
            card.addEventListener('click', e=> {
                alert('YOU SUCK')
            } )
        }

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