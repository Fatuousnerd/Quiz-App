const highScoresList = document.querySelector('#highScoresList'),
highScores = JSON.parse(localStorage.getItem('highScores')) || [] 

var contain = document.querySelector(".contain"),
loader = document.querySelector(".loader");

window.addEventListener("load", () => {
    contain.style.display = 'none'
});

highScoresList.innerHTML = 
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('');

