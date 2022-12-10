const date = new Date()
const year = date.getFullYear()
const xmas = Date.parse('Dec 25, ' + year)
const today = Date.parse(date)
const toXmas = Math.round((xmas - today) / (1000 * 60 * 60 * 24))

function getDays (element) {
  if (toXmas > 0) {
    element.innerText = `${toXmas} days to Christmas!`
  }
  
  if (toXmas === 0) {
    element.innerText = `It's Christmas! Merry Christmas!`
  }
  
  if (toXmas < 0) {
    element.innerText = `Christmas was ${-1 * toXmas} days ago.`
  }
}

export {
  getDays
}