

createColorBoxes();

function createColorBoxes(){
   
    let counter = 1;
    const div = document.createElement('div');
    const boxDivs = Array.from(document.querySelectorAll('.color-boxes-container div'))

    div.classList = 'box';
    
    
    boxDivs.forEach(box => {
        console.log(counter)
        box.id = counter;
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
    return randomHexColor()
}