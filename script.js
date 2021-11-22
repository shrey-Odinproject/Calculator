function add(a, b) { return Math.round((a + b) * 100) / 100 }
function sub(a, b) { return Math.round((a - b) * 100) / 100 }
function mul(a, b) { return Math.round((a * b) * 100) / 100 }
function divide(a, b) { return Math.round((a / b) * 100) / 100 }

function operate(a, op, b) {
    if (op === '+') { return add(a, b) }
    else if (op === '-') { return sub(a, b) }
    else if (op === '*') { return mul(a, b) }
    else if (op === '/') { return divide(a, b) }
    else { return 'INVALID' }
}

let buttonsOnPad = 16
let buttonPadRow = 4
let buttonPadCol = 4

const body = document.querySelector('body')
const calc = body.querySelector('.calculator') //main div housing calculator
const calcScreen = document.createElement('div')

calcScreen.classList.add('calcScreen')
calc.appendChild(calcScreen)

const calcSpecialButtonDiv = document.createElement('div')
calcSpecialButtonDiv.classList.add('calcSpecialButtonDiv')
calc.appendChild(calcSpecialButtonDiv)

const calcClear = document.createElement('button')
calcClear.textContent = 'CLEAR'
calcSpecialButtonDiv.appendChild(calcClear)
calcClear.addEventListener('click', () => {
    calcScreen.textContent = ''
    displayValue = 0
    num1 = undefined
    num2 = undefined
    operand = undefined
})

const calcPad = document.createElement('div')
calcPad.setAttribute('style',
    `
    grid-template-rows:${'auto '.repeat(buttonPadRow)};
    grid-template-columns:${'auto '.repeat(buttonPadCol)};
    `)
calcPad.classList.add('calcPad')
calc.appendChild(calcPad)

//calcScreen.textContent = '1+3'

function makeButtons() {
    for (let i = 0; i < buttonsOnPad; i++) {
        const calcPadButton = document.createElement('button')
        calcPadButton.classList.add('calcPadButton')
        if (i < 10) { calcPadButton.textContent = i }
        switch (i) {
            case 10:
                calcPadButton.textContent = '.'
                break

            case 11:
                calcPadButton.textContent = '+'
                break;
            case 12:
                calcPadButton.textContent = '-'
                break;
            case 13:
                calcPadButton.textContent = '*'
                break;
            case 14:
                calcPadButton.textContent = '/'
                break;
            case 15:
                calcPadButton.textContent = '='
                break;

        }

        calcPad.appendChild(calcPadButton)
    }
}

makeButtons()

let displayValue = 0 // stores number present on screen
let num1
let num2
let operand

let calcPadButtons = document.querySelectorAll('.calcPadButton')
calcPadButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (num1 === undefined && num2 === undefined /*&& operand === undefined*/) {

            if (isNaN(parseFloat(btn.textContent))) {
                operand = btn.textContent
                calcScreen.textContent = ''
                num1 = displayValue
                displayValue = 0
            }

            else {
                calcScreen.textContent += btn.textContent
                displayValue = +calcScreen.textContent // holds number
            }

        }
        else if (num1!==undefined && num2===undefined){
            
        }
    }


        //console.log((isNaN(parseFloat(`${displayValue}`))))


    })

})
/*   if ((btn.textContent === '+' || btn.textContent === '-' || btn.textContent === '/' || btn.textContent === '*')) {
            num1 = displayValue
            operand = btn.textContent
            calcScreen.textContent = ''
            displayValue = 0
        }
        if (operand !== undefined) {
            num2 = displayValue
        }
        if (btn.textContent == '=' && num1 !== undefined && num2 !== undefined) {
            let ans = operate(num1, operand, num2)
            calcScreen.textContent = ans
        }
        */