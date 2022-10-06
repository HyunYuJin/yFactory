const nodes = {
  dictionary: document.querySelector('.dictionary'),
  input: document.querySelector('.search__input'),
  info: document.querySelector('.dictionary__info'),
  word: document.querySelector('.word'),
  meanings: document.querySelector('.meanings'),
  phonetics: document.querySelector('.phonetics .phonetic'),
  partOfSpeech: document.querySelector('.partOfSpeech'),
  examples: document.querySelector('.dictionary__example-list'),
  synonyms: document.querySelector('.synonyms'),
  antonyms: document.querySelector('.antonyms'),
  cancel: document.querySelector('.cancel')
}
let data = null
let audio = []

function init () {
  initEvents()
}

function initEvents () {
  nodes.input.addEventListener('keyup', handleKeyUp)
  nodes.input.addEventListener('input', handleInput)
  nodes.cancel.addEventListener('click', handleRemove)
}

async function handleKeyUp (event) {
  const { target, key } = event
  const word = target.value.replace(/\s+/g, ' ')

  if (key == 'Enter' && word) {
    data = parseData(await getData(word))
    setDictionary()

    nodes.dictionary.classList.add('show')
  }
}

function handleInput (event) {
  const { target } = event
  const length = target.value.length

  if (!length) {
    handleRemove()
  }
}

function handleVolumn (event) {
  nodes.volumn.style.color = '#4B70E2'
  audio.play()

  setTimeout(() => {
    nodes.volumn.style.color = '#a0a5a8'
  }, 5000)
}

function handleRemove (event) {
  nodes.dictionary.classList.remove('show')
  nodes.input.value = ''
  nodes.input.focus()

  nodes.info.innerText = '영어를 대상으로 하여 영어의 어휘와 여러 연어, 숙어, 문법 등을 알파벳 순으로 찾아낼 수 있도록 하는 사전'
  nodes.word.textContent = ''
  nodes.meanings.textContent = ''
  nodes.examples.textContent = ''
  nodes.phonetics.textContent = ''
  audio = []
}

async function getData (word) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const data = await response.json()

    if (response.ok) {
      return data[0]
    } else {
      const message = `에러 발생: ${response.status}`
      throw new Error(message)
    }
  } catch (error) {
    nodes.info.innerHTML = `${word}라는 단어를 찾을 수 없습니다.`
    console.error(error.message)
  }
}

function parseData (result) {
  console.log(result.meanings)
  result.meanings.forEach((meaning) => {
    meaning.definitions = meaning.definitions.map(({
      antonyms = [],
      definition = [],
      synonyms = [],
      example = ''
    }) => {
      return {
        antonyms,
        definition,
        synonyms,
        example
      }
    })
  })

  result.phonetics = result.phonetics.filter((phonetics) => phonetics.audio && phonetics.text)
  
  return result
}

function setDictionary () {
  nodes.info.innerText = `${data.word}의 검색 결과입니다.`
  nodes.word.insertAdjacentHTML('beforeend', data.word)
  data.meanings.forEach((meaning, index) => {
    const partOfSpeech = meaning.partOfSpeech
    const antonyms = meaning.antonyms
    const synonyms = meaning.synonyms
    const fragment = document.createDocumentFragment()

    nodes.examples.insertAdjacentHTML('beforeend', `
      <li class="dictionary__example-item">
        <em class="partOfSpeech">${partOfSpeech}</em>
        <ol class="example"></ol>
        ${synonyms.length > 0 ? (`
          <div class="synonyms">
            <h4 class="title">유의어 <span>[${synonyms.length}건]<span></h4>
            <span>${synonyms}</span>
          </div>
        `) : ''}
        ${antonyms.length > 0 ? (`
            <div class="antonyms">
              <h4 class="title">반의어 <span>[${antonyms.length}건]</span></h4>
              <span>${antonyms}</span>
            </div>
          `) : ''}
      </li>
    `)

    meaning.definitions.forEach(({
      definition,
      example
    }) => {
      nodes.meanings.insertAdjacentHTML('beforeend', `<li>${definition}</li>`)
      if (example) {
        const li = document.createElement('li')
        li.textContent = example
        fragment.appendChild(li)

        nodes.examples.querySelectorAll('.example')[index].appendChild(fragment)
      } else {
        nodes.examples.querySelectorAll('.example')[index].insertAdjacentHTML('beforeend', `<li>No example</li>`)
      }
    })
  })

  data.phonetics.forEach((phonetic) => {
    nodes.phonetics.insertAdjacentHTML('beforeend', `
      <span>${phonetic.text}</span>
      <i class="iconoir-sound-high volumn"></i>
    `)
    audio.push(new Audio(phonetic.audio))
  })
}

init()