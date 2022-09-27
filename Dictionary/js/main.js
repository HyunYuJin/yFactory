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
  console.log(result)
  const definitions = result.meanings[0].definitions[0]

  nodes.dictionary.classList.add('active')
  nodes.word.innerText = result.word
  nodes.phontetics.innerText = `${result.meanings[0].partOfSpeech} /${result.phonetics[1].text}/`
  nodes.meaning.innerText = definitions.definition
  nodes.example.innerText = definitions.example
  console.log(result.meanings[0].synonyms)
}

getData('rabbit')