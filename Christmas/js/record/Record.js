import '../../styles/record.scss'
import tracks from './tracks.json'
import { addStyle, addClass, removeClass } from '../utils'

class Record {
  constructor (element, options) {
    this.element = element
    this.options = options
    this.nodes = {}
    this.audio = new Audio()
    this.isToggle = false
    this.currentTrack = {}
    this.currentIndex = 0

    this.init()
  }

  init () {
    this.initAudio()
    this.initRecord()
    this.initTracks()
    this.initStyles()
    this.initEvents()
  }

  initAudio () {
    this.currentTrack = tracks[this.currentIndex]
    this.audio.src = this.currentTrack.url
  }

  initRecord () {
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
    this.nodes.slider = this.element.querySelector('.slider')
    this.nodes.tone = this.element.querySelector('.tone-arm')
  }

  initTracks () {
    this.element.insertAdjacentHTML('beforeend', `
      <div class="info">
        <div class="title">${this.currentTrack.title}</div>
        <div class="artist">${this.currentTrack.artist}</div>
      </div>
    `)
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
    this.audio.addEventListener('ended', this.onEnded.bind(this))
    this.audio.addEventListener("volumechange", this.onVolumeChange.bind(this))
    
    this.nodes.button.addEventListener('click', this.onClick.bind(this))
    this.nodes.slider.addEventListener('input', this.onChange.bind(this))
  }

  onClick () {
    this.isToggle = !this.isToggle

    if (this.isToggle) {
      addClass(this.nodes.record, 'on')
      addClass(this.nodes.tone, 'play')

      setTimeout(() => this.audio.play(), 1000)
      
    } else {
      removeClass(this.nodes.record, 'on')
      removeClass(this.nodes.tone, 'play')

      this.audio.pause()
    }
  }

  onChange () {
    this.audio.volume = this.nodes.slider.value
  }

  onEnded () {
    if (this.currentIndex > tracks.length) {
      this.currentIndex = 0
    }

    this.nextTrack()
  }

  onVolumeChange () {
    if (this.audio.volume === 0) {
      console.log("Mute")
    } else {
      console.log('Unmute')
    }
  }

  nextTrack () {
    this.currentIndex++
    this.currentTrack = tracks[this.currentIndex]
    this.audio.src = this.currentTrack.url
  }
}

export default Record