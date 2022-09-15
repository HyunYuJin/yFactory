import { params } from './params.js'
import { extend } from './utils.js'

class Swiper {
  constructor (element, config) {
    this.config = extend(params, config)
    this.nodes = {
      element: element,
      wrapper: element.querySelector('.swiper__wrapper'),
      slides: Array.from(element.querySelectorAll('.swiper__item')),
      navigation: {
        prevEl: this.config.navigation.prevEl,
        nextEl: this.config.navigation.nextEl
      }
    }
    
    this.currentIndex = 0
    this.firstSlide = this.nodes.wrapper.firstElementChild
    this.lastSlide = this.nodes.wrapper.lastElementChild

    this._init()
  }

  get slideWidth () {
    return 100 / this.nodes.slides.length
  }

  get slideWidthTotal () {
    return 100 * this.nodes.slides.length
  }

  get slideTotalIndex () {
    return this.nodes.slides.length - 1
  }

  _init () {
    this._initStyles()
    this._initEvents()

    if (this.config.autoplay?.delay) {
      this.timer = setInterval(() => {
        this._navigate('next')
      }, this.config.autoplay.delay)
    }
  }

  _initStyles () {
    this.nodes.wrapper.style.width = this.slideWidthTotal + '%'
    this.nodes.slides.forEach(slide => {
      slide.style.flexBasis = this.slideWidth + '%'
    })
  }

  _initEvents () {
    this.nodes.navigation.prevEl?.addEventListener('click', this._navigate.bind(this, 'prev'))
    this.nodes.navigation.nextEl?.addEventListener('click', this._navigate.bind(this, 'next'))
    this.nodes.wrapper.addEventListener('transitionend', () => {
      if (this.direction === 'prev') {
        this.nodes.wrapper.prepend(this.nodes.wrapper.lastElementChild)
      } else if (this.direction === 'next') {
        this.nodes.wrapper.append(this.nodes.wrapper.firstElementChild)

        // 첫번째 슬라이드고 처음 슬라이드 시작하면 맨 앞에 슬라이드 한장 붙이기
      }

      this.nodes.wrapper.style.transition = 'none'
      this.nodes.wrapper.style.transform = 'translateX(0%)'
      setTimeout(() => {
        this.nodes.wrapper.style.transition = 'all 0.5s'
      })
    }, false)
  }

  _navigate (direction) {
    this.direction = direction

    if (direction === 'prev') {
      this.currentIndex = this.currentIndex > 0 ? --this.currentIndex : this.slideTotalIndex
    } else if (direction === 'next') {
      this.currentIndex = this.currentIndex < this.slideTotalIndex ? ++this.currentIndex : 0
    }

    this.translateX = this.slideWidth

    this._animate(direction)
  }

  _animate (direction) {
    this.nodes.wrapper.style.transition = '0.5s'

    if (direction === 'prev') {
      this.nodes.wrapper.style.transform = `translateX(${this.translateX}%)`
    } else if (direction === 'next') {
      this.nodes.wrapper.style.transform = `translateX(-${this.translateX}%)`
    }
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