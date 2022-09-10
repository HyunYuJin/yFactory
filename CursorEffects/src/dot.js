let width = window.innerWidth
let height = window.innerHeight
const cursor = { x: width / 2, y: height / 2 }
const position = { x: width / 2, y: height / 2 }
let canvas, context

const Dot = (el) => {
  const element = el || document.body
  createCanvas(element)
  cursorStyle()
 
  element.addEventListener('mousemove', onMousemove)
}

const onMousemove = (event) => {
  cursor.x = event.clientX
  cursor.y = event.clientY

  updateCursor()
}

const updateCursor = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  cursorMove(cursor.x, cursor.y)
}

const createCanvas = (element) => {
  canvas = document.createElement('canvas')
  context = canvas.getContext('2d')

  if (element) {
    canvas.style.position = 'absolute'
    element.appendChild(canvas)
    canvas.width = element.clientWidth
    canvas.height = window.innerHeight
  } else {
    canvas.style.position = 'relative'
    element.appendChild('body')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
}

const cursorStyle = () => {
  context.fillStyle = `rgba(50, 50, 50, 0.65)`
  context.beginPath()
  context.arc(position.x, position.y, 10, 0, 2 * Math.PI)
  context.fill()
  context.closePath()
}

const cursorMove = (x, y) => {
  position.x = x
  position.y = y

  cursorStyle()
}

export default Dot