// const randomColor = Math.floor(Math.random()*16777215).toString(16)
// // console.log('rando color', randomColor)

// const setBackground = () => {
//     document.body.style.backgroundColor = "#" + randomColor;
//     // color.innerHTML = "#" + randomColor;
// }

const partyButton = document.querySelector('.button')
const partyRadio = document.querySelector('#on')







if (partyRadio.checked = true) {
    const randomColor = Math.floor(Math.random()*16777215).toString(16)
    const setBackground = (e) => {
    document.body.style.backgroundColor = "#" + randomColor;
    }
    setBackground() 
} else {
    const setDefaultBackground = () => {
    document.body.style.backgroundColor = "#ffffff"
    setDefaultBackground()
}}



partyButton.addEventListener('click', (e) => {
        
    const randomColor = Math.floor(Math.random()*16777215).toString(16)
    const setBackground = (e) => {
    document.body.style.backgroundColor = "#" + randomColor;
    }
    setBackground()
})
