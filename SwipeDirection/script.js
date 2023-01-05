const nodes = {
  touchArea: document.getElementById('touchArea'),
  output: document.getElementById('output')
}

let positionX = 0
let positionY = 0
let startedX = 0
let startedY = 0
let isSwiped = false
let eventType = ''

let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

// TouchEvent 생성
const isTouchDevice = () => {
  try {
    document.createEvent('TouchEvent')
    eventType = 'touch'

    return true
  } catch (error) {
    eventType = 'mouse'

    return false
  }
}

// touchArea에서 left와 top 위치 구하기
const getPos = (event) => {
  positionX = (!isTouchDevice() ? event.pageX : event.touches[0].pageX) - nodes.touchArea.getBoundingClientRect().left
  positionY = (!isTouchDevice() ? event.pageY : event.touches[0].pageY) - nodes.touchArea.getBoundingClientRect().top
}

isTouchDevice()

const onDown = (event) => {
  isSwiped = true

  getPos(event)
  startedX = positionX
  startedY = positionY
}

const onMove = (event) => {
  if (!isTouchDevice) event.preventDefault()

  if (isSwiped) {
    getPos(event)

    const diffX = positionX - startedX
    const diffY = positionY - startedY

    if (Math.abs(diffY) > Math.abs(diffX)) {
      nodes.output.innerText = diffY > 0 ? '아래로 스와이프' : '위로 스와이프'
    } else {
      nodes.output.innerText = diffX > 0 ? '오른쪽으로 스와이프' : '왼쪽으로 스와이프'
    }
  }
}

const onUp = () => {
  isSwiped = false
}

const onLeave = () => {
  isSwiped = false
}

// Swipe 시작
nodes.touchArea.addEventListener(events[eventType].down, onDown)
nodes.touchArea.addEventListener(events[eventType].move, onMove)
nodes.touchArea.addEventListener(events[eventType].up, onUp)
nodes.touchArea.addEventListener('mouseleave', onLeave)