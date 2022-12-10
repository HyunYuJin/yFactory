import { random } from '../utils'

class SnowItem {
  constructor (canvas, context, options) {
    const { color, radius, speed, wind } = options
    this.params = {
      color,
      x: random(0, canvas.offsetWidth),
      y: random(-canvas.offsetHeight, 0),
      radius: random(...radius),
      speed: random(...speed),
      wind: random(...wind)
    }
    this.isResized = false
    
    this.canvas = canvas
    this.context = context
  }

  draw () {
    this.context.beginPath()
    this.context.arc(this.params.x, this.params.y, this.params.radius, 0, 2 * Math.PI)
    this.context.fillStyle = this.params.color
    this.context.fill()
    this.context.closePath()
  }

  move () {
    if (this.params.y < this.canvas.offsetHeight) return

    if (this.isResized) {
      this.position()
      this.isResized = false
    } else {
      this.params.x = random(0, this.canvas.offsetWidth)
      this.params.y = 0
    }
  }

  position () {
    this.params.x += random(0, this.canvas.offsetWidth)
    this.params.y += random(-this.canvas.offsetHeight, 0)
  }

  translate () {
    this.params.x += this.params.wind
    this.params.y += this.params.speed
  }

  update () {
    this.translate()
    this.move()
  }

  resized () {
    this.isResized = true
  }
}

export default SnowItem