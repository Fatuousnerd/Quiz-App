const username = document.querySelector('#username'),
saveScoreBtn = document.querySelector('#saveScoreBtn'),
finalScore = document.querySelector('#finalScore'),
mostRecentScore = localStorage.getItem('mostRecentScore');

var contain = document.querySelector(".contain"),
loader = document.querySelector(".loader");

window.addEventListener("load", () => {
    contain.style.display = 'none'
});

const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const MAX_HIGH_SCORES = 5

finalScore.innerHTML = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = (e) => {
    e.preventDefault()
    const score = {
        score: mostRecentScore,
        name: username.value
    }
    highScores.push(score)
    highScores.sort((a,b) => {
        return b.score - a.score
    })
    highScores.splice(5)
    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}
