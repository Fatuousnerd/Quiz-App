const question = document.querySelector("#question"),
choices = Array.from(document.querySelectorAll(".choice-text")),
progressText = document.querySelector("#progressText"),
scoreText = document.querySelector("#score"),
progressBarFull = document.querySelector("#progressBarFull");

var contain = document.querySelector(".contain"),
loader = document.querySelector(".loader");

window.addEventListener("load", () => {
    contain.style.display = 'none'
});

let currentQuestion = {}
acceptingAnswers = true,
score = 0,
questionCounter = 0,
availableQuestions = [];

let questions = [
    {
        question: 'Which artist made history in 2020 as the youngest winner of the Grammys` four main categories?',
        choice1: 'Kendrick Lamar',
        choice2: 'Lil Durk',
        choice3: 'Billie Eilish',
        choice4: '17',
        answer: 3,
    },
    {
        question: 'Prior to appearing in Black Panther, Michael B. Jordan starred in which Marvel movie?',
        choice1: '2',
        choice2: '4',
        choice3: '5',
        choice4: 'Fantastic Four',
        answer: 4,
    },
    {
        question: 'Which tech entrepreneur named his son X Æ A-12?',
        choice1: 'Elon Musk',
        choice2: 'Bills Gates',
        choice3: 'Jack Ma',
        choice4: 'Mark Zuckerberg',
        answer: 1,
    },
    {
        question: 'Who was the highest-paid actress of 2019, according to Forbes?',
        choice1: '11',
        choice2: '4',
        choice3: '21',
        choice4: 'Scarlett Johansson',
        answer: 4,
    },
    {
        question: 'Who did Forbes name the youngest “self-made billionaire ever” in 2019?',
        choice1: '11',
        choice2: 'Kylie Jenner',
        choice3: '21',
        choice4: 'Scarlett Johansson',
        answer: 2,
    },
    {
        question: 'Which actor voiced both Darth Vader and The Lion King`s Mufasa?',
        choice1: '11',
        choice2: 'Kylie Jenner',
        choice3: 'James Earl Jones',
        choice4: 'Scarlett Johansson',
        answer: 3,
    },
    {
        question: 'Which actor voiced both Darth Vader and The Lion King`s Mufasa?',
        choice1: '11',
        choice2: 'Kylie Jenner',
        choice3: 'James Earl Jones',
        choice4: 'Scarlett Johansson',
        answer: 3,
    },
    {
        question: 'Which actor voiced both Darth Vader and The Lion King`s Mufasa?',
        choice1: '11',
        choice2: 'Kylie Jenner',
        choice3: 'James Earl Jones',
        choice4: 'Scarlett Johansson',
        answer: 3,
    },
    {
        question: 'Which actor voiced both Darth Vader and The Lion King`s Mufasa?',
        choice1: '11',
        choice2: 'Kylie Jenner',
        choice3: 'James Earl Jones',
        choice4: 'Scarlett Johansson',
        answer: 3,
    },
    {
        question: 'Which actor voiced both Darth Vader and The Lion King`s Mufasa?',
        choice1: '11',
        choice2: 'Kylie Jenner',
        choice3: 'James Earl Jones',
        choice4: 'Scarlett Johansson',
        answer: 3,
    }
]

const SCORE_POINTS = 100,
MAX_QUESTIONS = questions.length;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('../end.html')
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