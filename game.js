const question = document.querySelector("#question"),
choices = Array.from(document.querySelectorAll(".choice-text")),
progressText = document.querySelector("#progressText"),
scoreText = document.querySelector("#score"),
progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {}
acceptingAnswers = true,
score = 0,
questionCounter = 0,
availableQuestions = [];

let questions = [
    {
        question: 'What is 2 + 2',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'How many members are in Beta Squad',
        choice1: '2',
        choice2: '4',
        choice3: '5',
        choice4: '17',
        answer: 3,
    },
    {
        question: 'Who is the richest man in the world',
        choice1: 'Elon Musk',
        choice2: 'Bills Gates',
        choice3: 'Jack Ma',
        choice4: 'Mark Zuckerberg',
        answer: 1,
    },
    {
        question: 'What is 7 + 2',
        choice1: '11',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 1,
    }
]

const SCORE_POINTS = 100,
MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }
    questionCounter++
    progressText.innerHTML = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerHTML = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerHTML = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerHTML = score
}

startGame()