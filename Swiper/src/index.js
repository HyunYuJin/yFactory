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
    this.timer
    this.isFirstSlide = true

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

    if (this.config.autoplay?.delay) {
      this.timer = setInterval(() => {
        this._navigate('next')
      }, this.config.autoplay.delay)
    }
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
      this.translateX += this.isFirstSlide ? 200 : 100
    }

    this._animate()
    this._setInfiniteSwipe()
  }

  _animate () {
    this.nodes.wrapper.style.transition = '0.5s'
    this.nodes.wrapper.style.transform = `translateX(-${this.translateX}%)`
  }

  _setInfiniteSwipe () {
    // 가장 처음 페이지는 가장 뒤의 슬라이드가 앞으로 붙기 때문에 첫 페이지에서 처음 이동할 때는 무조건 200을 더해주어야 한다.
    // 이전 페이지, 다음 페이지 모두...
    if (this.isFirstSlide) {
      const slide = this.nodes.slides[this.nodes.slides.length - 1]
      this.nodes.wrapper.prepend(slide)

      this.isFirstSlide = false
    }

    const slides = this.nodes.slides
    const a = slides.filter((slide, index) => index < this.slideTotalIndex - 1)
    this.nodes.wrapper.append(...a)

    const translateX = 100
    this.nodes.wrapper.style.transition = ''
    this.nodes.wrapper.style.transform = `translateX(-${translateX}%)`

    this._updateSlides()  
  }
  
  _updateSlides () {
    this.nodes.slides = Array.from(this.nodes.wrapper.children)
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