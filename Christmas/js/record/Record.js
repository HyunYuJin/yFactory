import '../../styles/record.scss'
import { addStyle, addClass } from '../utils'

class Record {
  constructor (element, options) {
    this.element = element
    this.options = options
    this.nodes = {}

    this.init()
  }

  init () {
    this.initDOM()
    this.initStyles()
    this.initEvents()
  }

  initDOM () {
    this.element.insertAdjacentHTML('afterbegin', `
      <div class="player">
        <div class="record">
          <div class="label"></div>
        </div>
        <div class="tone-arm">
          <div class="control"></div>
        </div>
        <button type="button" class="button"></button>
        <div class="volume">
          <input type="range" class="slider" min="0" max="1" step="0.1" value="0.7">
        </div>
      </div>
    `)

    this.nodes.player = this.element.querySelector('.player')
    this.nodes.record = this.element.querySelector('.record')
    this.nodes.button = this.element.querySelector('.button')
    this.nodes.tone = this.element.querySelector('.tone-arm')
  }

  initStyles () {
    const { width, height, color, radius } = this.options

    addStyle(this.nodes.player, {
      width,
      height,
      backgroundColor: color,
      borderRadius: radius
    })
  }

  initEvents () {
    this.nodes.button.addEventListener('click', this.onClick.bind(this))
  }

  onClick () {
    addClass(this.nodes.record, 'on')
    addClass(this.nodes.tone, 'play')
  }
}

export default Record