import { params } from './params.js'
import { extend } from './utils.js'

class Swiper {
  constructor (element, config) {
    this.config = extend(params, config)
    this.nodes = {}
    this.nodes.element = element
    this.nodes.navigation = this.config.navigation
    this.nodes.slides = Array.from(this.nodes.element.querySelectorAll('.swiper__item'))
    this.nodes.wrapper = this.nodes.element.querySelector('.swiper__wrapper') || this._getWrapper()

    this.currentIndex = 0
    this.translateX = 0

    this._init()
  }

  get slideWidth () {
    return this.nodes.element.clientWidth
  }

  get slideTotalIndex () {
    return this.nodes.slides.length
  }
  
  get slideTotalWidth () {
    return this.slideWidth * this.slideTotalIndex
  }

  _init () {
    this._initEvents()
  }

  _initEvents () {
    this.nodes.navigation.prevEl?.addEventListener('click', this._navigate.bind(this, 'prev'))
    this.nodes.navigation.nextEl?.addEventListener('click', this._navigate.bind(this, 'next'))
  }

  _navigate (direction) {
    if (direction === 'prev') {
      this.currentIndex = this.currentIndex > 0 ? --this.currentIndex : this.slideTotalIndex - 1
    } else if (direction === 'next') {
      this.currentIndex = this.currentIndex < this.slideTotalIndex - 1 ? ++this.currentIndex : 0
    }

    this.translateX = this.slideWidth * this.currentIndex
    this._animate()
  }

  _animate () {
    this.nodes.wrapper.style.transition = `0.5s`
    this.nodes.wrapper.style.transform = `translateX(-${this.translateX}px)`
  }

  _getWrapper () {
    const wrapper =  document.createElement('div')
    wrapper.className = 'swiper__wrapper'
    wrapper.append(...this.nodes.slides)

    this.nodes.element.insertAdjacentElement('afterbegin', wrapper)
    
    return wrapper
  }
}

export default Swiper