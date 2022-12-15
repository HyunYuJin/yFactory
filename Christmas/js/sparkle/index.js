import '../../styles/sparkle.scss'

function sparkle (sentence) {
  const strings = sentence.split('')

  return (strings.map((v, i) => {
    return `<span class="christmas-${(i % 2 === 0 ? 'gold' : 'blue')}">${v}</span>`
  }).join(""))
}

export {
  sparkle
}