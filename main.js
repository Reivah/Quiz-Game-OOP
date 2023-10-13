const questionsBase = [
	['What country has the most islands in the world?', ['Philipines', 'Sweden', 'Mexico'], 1],
	['How many days does it take for the Earth to orbit the Sun?', ['365', '364', '185'], 0],
	['Whats the smallest country in the world?', ['Czech Republic', 'Germany', 'Vatican'], 2],
	['Who invented the World Wide Web?', ['Bill Gates', 'Steve Jobs', 'Tim Berners-Lee'], 2],
	['What does CSS mean?', ['Counter-Strike: Source', 'Cascading Style Sheets', 'Current Semi Store'], 1],
	['Where was the first modern Olympic Games held?', ['Athens', 'Olymp', 'Cyprus'], 0],
	['Name Pixar first feature-length movie', ['Wheres Nemo', 'The Incredibles', 'Toy Story'], 2],
	['What is the name of Batmans butler', ['Robin', 'Alfred', 'Joker'], 1],
	['How many Lord of the Rings films are there', ['One', 'Two', 'Three'], 2],
	['Which popular TV show featured house Stark', ['Game of Thrones', 'The Sopranos', 'The Wire'], 0],
]

class Question {
	#questionTitle
	#answers
	#correctAnswers
	constructor(questionTitle, answers, correctAnswer) {
		this.#questionTitle = questionTitle
		this.#answers = answers
		this.#correctAnswers = correctAnswer
	}

	get questionTitle() {
		return this.#questionTitle
	}

	get answers() {
		return this.#answers
	}

	get correctAnswer() {
		return this.#correctAnswers
	}
}

class Game {
	#questions;
	#questionIndex;
	#score;
	#timeValue;
	#result;
	#bgShadow;
	#questionNum;
	#correctAnswer;
	#wrongAnswer;

	constructor(questionBase) {
		this.questionBase = questionBase
		this.#questionIndex = 0
		this.#score = 0
		this.#questionNum = 1
		this.#timeValue = 15
		this.#questions = this.questionBase.map(question => new Question(question[0], question[1], question[2]))
		this.#result = document.querySelector('.results')
		this.#bgShadow = document.querySelector('.bg-shadow')
		this.#correctAnswer =  document.querySelector('.correct-answer')
		this.#wrongAnswer = document.querySelector('.wrong-answer')
		this.counter


		this.nextBtn = document.querySelector('.submit').addEventListener('click', this.nextQuestion.bind(this))
	

		document.querySelector('.close-btn').addEventListener('click', () => {
			this.#correctAnswer.style.display = 'none'
			this.startTimer(this.#timeValue)
		})

		document.querySelector('.wrong-close-btn').addEventListener('click', () => {
			this.#wrongAnswer.style.display = 'none'
			this.startTimer(this.#timeValue)
		})

		document.querySelector('.rules-btn').addEventListener('click', this.startQuiz.bind(this))

		
	}

	get questionIndex() {
		return this.#questionIndex
	}

	showQuestions() {
		const questionText = document.querySelector('.question')
		const answersText = document.querySelector('.answers')
		this.questionTitle = document.querySelector('.question-number')
		this.questionNumText = document.querySelector('.question-number')

		questionText.textContent = this.#questions[this.#questionIndex].questionTitle
		this.questionNumText.textContent = `Question nr ${this.#questionNum}`
		answersText.textContent = ''

		this.#questions[this.#questionIndex].answers.forEach((element, index) => {
			const answerParagraph = document.createElement('p')
			answerParagraph.classList.add('answer-text')
			answerParagraph.innerHTML = `<input type="radio" value="${index}" class="answer-input" name="answer"><label for="radio">${element}</label>`
			answersText.appendChild(answerParagraph)
		})
	}



	nextQuestion() {
		const markedAnswer = document.querySelector('.answer-input:checked')
		
		clearInterval(this.counter)
		this.startTimer(this.#timeValue)
		if (markedAnswer) {
			this.#questionNum++
			if (parseInt(markedAnswer.value) === this.#questions[this.#questionIndex].correctAnswer) {
				this.#score++
				this.#correctAnswer.style.display = 'flex'
				clearInterval(this.counter)
			} else {
				this.#wrongAnswer.style.display = 'flex'
				clearInterval(this.counter)
			}
			this.#questionIndex++
			if (this.#questionIndex < this.#questions.length) {
				this.showQuestions()
			} else {
				this.scoreTable()
				clearInterval(this.counter)
                this.#bgShadow.style.display = 'block'
			}
		} else {
			this.#questionNum++
			this.#questionIndex++
			this.showQuestions()
			clearInterval(this.counter)
			this.startTimer(this.#timeValue)
		}
	}

	scoreTable() {
		const resultText = document.querySelector('.results .result-score')
		resultText.textContent = ` ${this.#score}/${this.#questions.length}`
		this.#result.classList.add('show')
	}

	startTimer(time) {
		const timerNum = document.querySelector('.timer')
		this.counter = setInterval(() => {
			timerNum.innerHTML = `<i class="fa-regular fa-clock"></i> ${time} seconds`
			time--
			if (time < 0) {
				this.#questionNum++
				this.#questionIndex++
				this.showQuestions()
				time = 15
			}
		}, 1000)
	}

	startQuiz() {
		const rulesBoard = document.querySelector('.rules')
		this.#bgShadow.style.display = 'none'
		rulesBoard.style.display = 'none'
		this.startTimer(15)
	}

	
}
const game = new Game(questionsBase)
game.showQuestions()
