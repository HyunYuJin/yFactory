const nodes = {
  dictionary: document.querySelector('.dictionary'),
  input: document.querySelector('.search__input'),
  info: document.querySelector('.dictionary__info'),
  word: document.querySelector('.word'),
  phontetics: document.querySelector('.phontetics'),
  volumn: document.querySelector('.volumn'),
  meaning: document.querySelector('.meaning span'),
  example: document.querySelector('.example span'),
  synonyms: document.querySelector('.synonyms'),
  cancel: document.querySelector('.cancel')
}
let audio

function init () {
  initEvents()
}

function initEvents () {
  nodes.input.addEventListener('keyup',  (event) => {
    handleKeyUp(event)
  })
  nodes.input.addEventListener('change', (event) => {
    handleChange(event)
  })
  nodes.volumn.addEventListener('click', (event) => {
    handleVolumn(event)
  })
  nodes.cancel.addEventListener('click', (event) => {
    handleRemove(event)
  })
}

function handleKeyUp (event) {
  const { target, key } = event
  const word = target.value.replace(/\s+/g, ' ')

  if (key == 'Enter' && word) {
    getData(word)
  }
}

function handleChange (event) {
  console.log(event)
}

function handleVolumn (event) {
  console.log(event)
  nodes.volumn.style.color = '#4B70E2'
  audio.play()

  setTimeout(() => {
    nodes.volumn.style.color = '#a0a5a8'
  }, 5000)
}

function handleRemove (event) {
  console.log(event)
  nodes.input.value = ''
  nodes.input.focus()
}

async function getData (word) {
  nodes.dictionary.classList.remove('active')

  try {
    const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const result = await data.json()
    setDictionary(...result)
    nodes.info.innerHTML = `${word}의 검색 결과입니다.`
  } catch (error) {
    nodes.info.innerHTML = `${word}라는 단어를 찾을 수 없습니다.`
    throw error
  }
}

function setDictionary (result) {
  const definitions = result.meanings[0]?.definitions[0]

  nodes.dictionary.classList.add('active')
  nodes.word.innerText = result.word
  nodes.phontetics.innerText = `${result.meanings[0]?.partOfSpeech} /${result.phonetics[0]?.text}/`
  nodes.meaning.innerText = definitions.definition
  nodes.example.innerText = definitions.example

  result.phonetics?.find(item => audio = new Audio(item.audio))
  
  if (result.meanings[0].synonyms) {
    console.log(result.meanings[0].synonyms)
    result.meanings[0].synonyms.forEach((item, index) => {
      nodes.synonyms.querySelector('.list').innerHTML += `<li>${item}</li>`
    })
  }
}

init()