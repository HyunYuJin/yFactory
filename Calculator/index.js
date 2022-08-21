(() => {
  'use strict'

  const nodes = {
    calculator: document.querySelector('.calculator__wrap'),
    result: document.querySelector('.calculator__result')
  }

  let digits = [] // 입력되고 있는 숫자를 관리
  let display = '' // 실제로 사용자에게 display 해줄 문자열들을 저장
  let formula = [] // 계산해줄 총 공식들을 저장

  document.addEventListener('click', (event) => {
    const { target } = event

    const button = target.closest('.calculator__btn')
    const number = target.closest('.calculator__number')
    const operator = target.closest('.calculator__operator')
 
    if (!button) return
    if (!nodes.calculator.contains(button)) return

    if (number) {
      const value = number.dataset.value
      inputNum(value)
    } else if (operator) {
      const value = operator.dataset.value
      inputOperator(value)
    }
  })
  
  const inputNum = (number) => {
    const { input } = nodes

    if (input.value.charAt(0) === '0') {
      display = ''
      input.value.replace(/^./, number)
    }

    digits.push(number)
    display += number

    displayFormula()
  }

  const inputOperator = (operator) => {
    const reg = /[\+\-\/\*\.]$/

    if (reg.test(display)) {
      display = display.replace(/.$/, operator)
    } else {
      display += operator
      digits = []
    }

    displayFormula()
  }

  const displayFormula = () => {
    const { input } = nodes

    input.value = display
  }

  const clearFormula = () => {
    digits = []
    display = '0'

    displayFormula()
  }

  const resultFormula = () => {
    const reg = /([\+\-\/\*\.])/
    formula = [...display.split(reg)]

    while (formula.length > 1) {
      const monomial = formula.splice(0, 3)
      const constant1 = Number(monomial[0])
      const constant2 = Number(monomial[2])
      const arithmetic = monomial[1]
      let result = 0

      switch (arithmetic) {
        case '+':
          result = constant1 + constant2
          break
        case '-':
          result = constant1 - constant2
          break
        case '*':
          result = constant1 * constant2
          break
        case '/':
          result = constant1 / constant2
      }

      formula.unshift(String(result))
    }
    
    display = String(formula)
    displayFormula()
    
    digits = []
    formula = []
  }
})()