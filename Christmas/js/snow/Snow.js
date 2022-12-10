import '../../styles/snow.scss'
import SnowItem from './SnowItem'

class Snow {
  constructor (canvas, count, options) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')

    this.countSnowFlakes = count
    this.options = options
    this.snowFlakes = []

    this.init()
  }

  init () {
    Array.from({
      length: this.countSnowFlakes
    }, () => this.add(new SnowItem(this.canvas, this.context, this.options)))

    this.initEvents()
    this.loop()
    this.resize()
  }

  initEvents () {
    window.addEventListener('resize', this.resize.bind(this))
  }

  add (item) {
    this.snowFlakes.push(item)
  }

  draw () {
    this.context.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight)

    this.snowFlakes.forEach(flask => flask.draw())
  }

  update () {
    this.snowFlakes.forEach(flask => flask.update())
  }

  loop () {
    this.draw()
    this.update()

    requestAnimationFrame(this.loop.bind(this))
  }

  resize () {
    this.context.canvas.width = this.canvas.offsetWidth
    this.context.canvas.height = this.canvas.offsetHeight

    this.snowFlakes.forEach(flask => flask.resized())
  }
}

export default Snow