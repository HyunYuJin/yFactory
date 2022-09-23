class Buttons {
  constructor () {
    this.buttons = document.querySelector('.movie__content-buttons')
  }

  setup () {
    this.bindEvents()
  }

  bindEvents() {
    this.buttons.addEventListener('click', this.toggleButtons.bind(this))
  }

  toggleButtons (event) {
    // 이벤트 버블링이 일어난 경로
    // const composedPath = event.composedPath()
    // const button = composedPath.find(el => el.tagName === 'BUTTON')
    const button = event.target.closest('button')

    if (!button) {
      return
    }

    button.classList.toggle('on')
  }
}

export default Buttons