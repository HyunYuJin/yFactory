(() => {
  const nodes = {
    carouselList: document.querySelector('.carousel__list'),
    carouselItems: document.querySelectorAll('.carousel__item'),
    prevBtn: document.querySelector('.prev'),
    nextBtn: document.querySelector('.next'),
    uploadInput: document.querySelector('.image__upload-input')
  }

  function init () {
    initEvents()
  }

  function initEvents () {
    nodes.prevBtn.addEventListener('click', goToPrev)
    nodes.nextBtn.addEventListener('click', goToNext)
    nodes.uploadInput.addEventListener('change', (event) => uploadImage(event))
  }

  function changeTransform () {
    const carouselItems = document.querySelectorAll('.carousel__item')

    if (carouselItems.length > 1) {
      const rotate = 360 / carouselItems.length

      carouselItems.forEach((item, index) => {
        if (index === 0) {
          item.style.transform = `rotateY(0deg) translateZ(250px)`
        } else {
          item.style.transform = `rotateY(${rotate * index}deg) translateZ(250px) rotateY(-${rotate * index}deg)`
        }
      })
    }
  }

  function goToNext () {
    const { carouselList, carouselItems } = nodes

    if (carouselItems.length > 1) {
      const current = document.querySelector('.current')
      const nextItem = current.nextElementSibling
      carouselList.appendChild(current)
      current.classList.remove('current')
      nextItem.classList.add('current')
    }

    changeTransform()
  }

  function goToPrev () {
    const { carouselList, carouselItems } = nodes

    if (carouselItems.length > 1) {
      const current = document.querySelector('.current')
      const lastItem = carouselList.lastElementChild
      carouselList.prepend(lastItem)
      current.classList.remove('current')
      lastItem.classList.add('current')
    }

    changeTransform()
  }

  function createItem (url) {
    const li = document.createElement('li')
    const img = document.createElement('img')
    li.classList.add('carousel__item')
    img.src = url
    li.appendChild(img)

    nodes.carouselItems.forEach((item) => {
      item.classList.remove('current')
    })

    li.classList.add('current')

    return li
  }

  function uploadImage (event) {
    const { target } = event
    const { carouselList } = nodes

    if (target.files) {
      const reader = new FileReader()

      reader.onload = (event) => {
        const imageUrl = event.target.result
        carouselList.prepend(createItem(imageUrl))

        changeTransform()
      }

      reader.readAsDataURL(target.files[0])
    }
  }

  init()

  window.onload = () => {
    changeTransform()
}
})()