const playerURL = 'http://localhost:3000/players/';
const playerList = document.querySelector('.highscores');
let topPlayers = [];
getPlayersInfo()
    .then(players => {
       for( let player in players ){
           topPlayers.push({
               'highscore' : players[player]['highscore'],
               'initials' : players[player]['initials']
           })
       }
       topPlayers.sort(function(a, b){
           return b.highscore-a.highscore
        });
       for (let i = 0; i < 10; i++){
            const li = document.createElement('li');
            li.textContent = `${topPlayers[i]['initials']} : ${topPlayers[i]['highscore']}`
            playerList.append(li);

       }
    })






async function getPlayersInfo() {
    var response = await fetch(playerURL);
    var data = await response.json()
    return data;
  };