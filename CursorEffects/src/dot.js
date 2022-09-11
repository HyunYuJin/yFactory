const sizes = { width: window.innerWidth, height: window.innerHeight }
const cursor = { x: sizes.width / 2, y: sizes.height / 2 }
const position = { x: sizes.width / 2, y: sizes.height / 2 }
let canvas, context

const Dot = (element = document.body) => {
  canvas = createCanvas()
  context = canvas.getContext('2d')
  element.appendChild(canvas)

  element.addEventListener('mousemove', onMousemove)
  window.addEventListener('resize', onResize)
}

const onResize = () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  canvas.width = sizes.width
  canvas.height = sizes.height
}

const onMousemove = (event) => {
  position.x = cursor.x = event.clientX
  position.y = cursor.y = event.clientY

  updateCursor()
}

const createCanvas = () => {
  const canvas = document.createElement('canvas')
  canvas.style.position = 'absolute'
  canvas.width = sizes.width
  canvas.height = sizes.height

  return canvas
}

const cursorClear = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)
}

const cursorStyle = () => {
  context.fillStyle = `rgba(50, 50, 50, 0.65)`
  context.beginPath()
  context.arc(position.x, position.y, 10, 0, 2 * Math.PI)
  context.fill()
  context.closePath()
}

const updateCursor = () => {
  cursorClear()
  cursorStyle()
}

export default Dot