const Dot = (el) => {
  const element = el || document.body
  console.log(element)
  const width = window.innerWidth
  const height = window.innerHeight
  const cursor = { x: width / 2, y: height / 2 }
  let dot = getDot(width / 2, height / 2, 10, 10)
  let canvas, context

  // dot.move(cursor.x, cursor.y, context)
}

const getDot = (x, y, width, lag) => {
  const position = { x, y }

  const move = (x, y, context) => {
    position.x += (x - position.x) / lag
    position.y += (y - position.y) / lag

    dotContext(context)
  }

  const dotContext = () => {
    context.fillStyle = `rgba(50, 50, 50, 0.65)`
    context.beginPath()
    context.arc(position.x, position.y, width, 0, 2 * Math.PI)
    context.fill()
    context.closePath()
  }
}

export default Dot