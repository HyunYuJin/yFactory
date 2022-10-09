const nodes = {
  form: document.querySelector('.question-form'),
  statusBar: null,
  questionItems: null,
  answerItem: null,
  buttons: null
}
let currentPage = 0

async function init () {
  await getData()
  initDOM()
  initEvents()
  setStatus()
  display()
}

async function getData () {
  await fetch("../datas/data.json")
  .then((response) => response.json())
  .then((data) => {
    const { questions, answers } = data

    questions.forEach((question) => {
      const questionNumber = question.pk
      const answer = answers.filter((answer) => questionNumber === answer.question)

      nodes.form.appendChild(setElement(question, answer))
    })
  })
}

function setElement (question, answers) {
  if (!answers) return

  const questionItem = document.createElement('div')
  questionItem.classList.add('question-item')

  const template = document.createElement('template')
  let index = 0

  for (let answer of answers) {
    template.innerHTML += `
      <li class="answer-item">
          <input type="radio" id="answer-${answer.pk}" name="question-${question.pk}" value="${answer.developer}"/>
          <label for="answer-${answer.pk}">${Number(++index)}. ${answer.content}</label>
      </li>
    `
  }

  questionItem.innerHTML = `
    <div class="status">
      <span>${question.pk}/10</span>
      <div class="bar"></div>
    </div>
    <div class="question">
      <h2>Q. ${question.content}</h2>
      <ol class="answer-list">
        ${template.innerHTML}
      </ol>
    </div>
    <div class="buttons">
      ${setButtons(question)}
    </div>
  `

  template.remove()

  return questionItem
}

function initDOM () {
  nodes.questionItems = document.querySelectorAll('.question-item')
  nodes.buttons = document.querySelectorAll('.buttons')
  nodes.statusBar = document.querySelectorAll('.status .bar')
}

function initEvents () {
  nodes.buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const { target } = event

      if (target.closest('.previous-btn')) {
        console.log(target)
        onPrev()
      } else if (target.closest('.next-btn')) {
        console.log(target)
        onNext()
      }
    })
  })
}

function setButtons (question) {
  if (question.pk === 1) {
    return '<button type="button" class="next-btn" style="flex: 1;">다음</button>'
  } else if (question.pk === 10) {
    return '<button type="button" class="previous-btn">이전</button><button type="submit" class="submit-btn">제출</button>'    
  } else {
    return '<button type="button" class="previous-btn">이전</button> <button type="button" class="next-btn">다음</button>'
  }
}

function setStatus () {
  nodes.statusBar.forEach((e, i) => {
    e.style.width = `${(Number(i) + 1) * 10}%`
  })
}

function onPrev () {
  display(--currentPage)
}

function onNext () {
  display(++currentPage)
}

function display (currentPage = 0) {
  nodes.questionItems.forEach((item) => {
    if (item.classList.contains('on')) {
      item.classList.remove('on')
    }
  })

  nodes.questionItems[currentPage].classList.add('on')
}

init()