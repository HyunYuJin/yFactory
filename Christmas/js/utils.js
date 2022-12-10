export function isNumber (value) {
  return typeof value === 'number' && !isNaN(value)
}

export const assign = Object.assign || function assign (obj, ...args) {
  if (isObject(obj) && args.length > 0) {
    args.forEach((arg) => {
      if (isObject(arg)) {
        Object.keys(arg).forEach((key) => {
          obj[key] = arg[key]
        })
      }
    })
  }

  return obj
}

export function addStyle (element, value) {
  if (isNumber(element.length)) {
    Array.from(element).forEach(
      elem => addStyle(elem.style, value)
    )

    return
  }

  assign(element.style, value)
}

export function emptyStyle (element) {
  if (isNumber(element.length)) {
    Array.from(element).forEach(
      elem => emptyStyle(elem)
    )

    return
  }

  element.setAttribute('style', '')
}


export function addClass (element, value) {
  if (isNumber(element.length)) {
    Array.from(element).forEach(
      elem => addClass(elem, value)
    )

    return
  }

  element.classList.add(value)
}

export function removeClass (element, value) {
  if (isNumber(element.length)) {
    Array.from(element).forEach(
      elem => removeClass(elem, value)
    )

    return
  }

  element.classList.remove(value)
}

export function hasClass (element, value) {
  return element.classList.contains(value)
}

export function random (a = 1, b = 0) {
  const lower = Math.min(a, b)
  const upper = Math.max(a, b)

  return lower + Math.random() * (upper - lower)
}