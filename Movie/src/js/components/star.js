const starImageSourceMap = {
  empty: './src/images/icon_empty_star.png',
  half: './src/images/icon_half_star.png',
  full: './src/images/icon_star.png',
}

class Star {
  constructor () {
    this.star = document.querySelector('.movie__content-star')
    this.starContainer = this.star.querySelector('.star-container')
    this.starImages = this.starContainer.querySelectorAll('img')
    this.starReset = this.star.querySelector('.star-remove')

    this.isFixedStar = false
  }

  setup () {
    this.bindEvents()
  }

  bindEvents () {
    this.starContainer.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.starContainer.addEventListener('mouseout', this.onMouseOut.bind(this))
    this.starContainer.addEventListener('click', this.onClick.bind(this))
    console.log(this.starReset)
    this.starReset.addEventListener('click', this.onClickReset.bind(this))
  }

  onMouseMove (event) {
    if (this.isFixedStar) {
      return
    }

    const { target, offsetX: userPointer } = event

    const { point } = target.dataset
    const pointIndex = parseInt(point, 10) - 1
    const rect = target.getBoundingClientRect()
    const starWidth = rect.width
    const isFull = starWidth / 2 < userPointer

    this.render({ pointIndex, isFull })
  }

  onMouseOut () {
    !this.isFixedStar && this.resetStarImages()
  }

  onClick () {
    this.isFixedStar = !this.isFixedStar
  }

  onClickReset () {
    this.isFixedStar = false
    
    this.resetStarImages()
  }

  resetStarImages () {
    this.render()
  }

  render (payload = {}) {
    // 초기값 할당
    const { pointIndex = -1, isFull = false } = payload

    this.starImages.forEach((image, index) => {
      let source = index < pointIndex ? starImageSourceMap.full : starImageSourceMap.empty

      if (pointIndex === index) {
        source = isFull ? starImageSourceMap.full : starImageSourceMap.half
      }

      image.src = source
    })
  }
}

export default Star