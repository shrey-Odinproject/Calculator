function add(a, b) { return Math.round((a + b) * 100) / 100 }
function sub(a, b) { return Math.round((a - b) * 100) / 100 }
function mul(a, b) { return Math.round((a * b) * 100) / 100 }
function divide(a, b) {
    let divResult = Math.round((a / b) * 100) / 100
    if (b === 0) { return 'NO CAN DO !!!! prs clr' }// snarky msg
    else { return divResult }
}

function operate(a, op, b) {
    if (op === '+') { return add(a, b) }
    else if (op === '-') { return sub(a, b) }
    else if (op === '*') { return mul(a, b) }
    else if (op === '/') { return divide(a, b) }
    else { return 'INVALID OPERATION' }
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
    secondScreen.textContent = ''
    displayValue = undefined
    num1 = undefined
    num2 = undefined
    operand = undefined
    backButton.disabled = false
    calcPadButtons.forEach((btn) => btn.classList.remove('operandSelected'))
})
const secondScreen = document.createElement('div')
calc.appendChild(secondScreen)

const backButton = document.createElement('button')
backButton.textContent = '<<=='
calcSpecialButtonDiv.appendChild(backButton)

backButton.addEventListener('click', () => {
    if (calcScreen.textContent !== '') {// whenever text content is blank displayvalue is undefined so we dont need to mention it seprately mention it
        calcScreen.textContent = calcScreen.textContent.substring(0, (calcScreen.textContent).length - 1)
        displayValue = +calcScreen.textContent
    }
})

const calcPad = document.createElement('div')
calcPad.setAttribute('style',
    `
    grid-template-rows:${'auto '.repeat(buttonPadRow)};
    grid-template-columns:${'auto '.repeat(buttonPadCol)};
    `)
calcPad.classList.add('calcPad')
calc.appendChild(calcPad)


function makeButtons() {
    for (let i = 0; i < buttonsOnPad; i++) {
        const calcPadButton = document.createElement('button')
        calcPadButton.classList.add('calcPadButton')
        //if (i < 10) { calcPadButton.textContent = i }
        switch (i) {
            case 0:
                calcPadButton.textContent = 1
                break
            case 1:
                calcPadButton.textContent = 2
                break
            case 2:
                calcPadButton.textContent = 3
                break
            case 4:
                calcPadButton.textContent = 4
                break
            case 5:
                calcPadButton.textContent = 5
                break
            case 6:
                calcPadButton.textContent = 6
                break
            case 8:
                calcPadButton.textContent = 7
                break
            case 9:
                calcPadButton.textContent = 8
                break
            case 10:
                calcPadButton.textContent = 9
                break
            case 13:
                calcPadButton.textContent = 0
                break
            case 12:
                calcPadButton.textContent = '.'
                calcPadButton.setAttribute('id', 'decimal')
                break

            case 3:
                calcPadButton.textContent = '+'
                calcPadButton.setAttribute('id', 'operand')
                break;
            case 7:
                calcPadButton.textContent = '-'
                calcPadButton.setAttribute('id', 'operand')
                break;
            case 11:
                calcPadButton.textContent = '*'
                calcPadButton.setAttribute('id', 'operand')
                break;
            case 15:
                calcPadButton.textContent = '/'
                calcPadButton.setAttribute('id', 'operand')
                break;
            case 14:
                calcPadButton.textContent = '='
                calcPadButton.setAttribute('id', 'equalsTo')
                break;

        }

        calcPad.appendChild(calcPadButton)
    }
}

makeButtons()

let displayValue  // stores number present on screen
let num1
let num2
let operand

let calcPadButtons = document.querySelectorAll('.calcPadButton')
let decimalButton = document.getElementById('decimal') // we enable disable it so that u cant type 12.8.9.8 etc type of nums

calcPadButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        decimalButton.disabled = false
        if (num1 === undefined && num2 === undefined) {// oprts and op undefined

            if (btn.textContent === '+' || btn.textContent === '-' || btn.textContent === '*' || btn.textContent === '/') {
                if (displayValue === undefined && btn.textContent === '-') { // to make entering -4 as input possible THIS nt implemented fr intermediate eg -5 * -3 not possible it becomes -5-3
                    calcScreen.textContent += btn.textContent
                    displayValue = +calcScreen.textContent
                }
                else {
                    operand = btn.textContent
                    calcScreen.textContent = ''
                    num1 = displayValue
                    secondScreen.textContent = num1
                    displayValue = undefined
                    btn.classList.add('operandSelected')
                }
            }

            else if (!isNaN(parseFloat(btn.textContent)) || btn.textContent === '.') { // screen can only display numbers and .
                calcScreen.textContent += btn.textContent
                displayValue = +calcScreen.textContent // holds number
            }
            if (calcScreen.textContent.includes('.')) { decimalButton.disabled = true }

        }
        else if (num1 !== undefined && num2 === undefined) {// only 2nd opr undefined
            decimalButton.disabled = false
            if (btn.textContent === '=' && displayValue !== undefined) {
                num2 = displayValue
                displayValue = operate(num1, operand, num2) // holds result of operation
                calcScreen.textContent = displayValue
                secondScreen.textContent = 'PRESS CLEAR '
                backButton.disabled = true
                calcPadButtons.forEach((btn) => btn.classList.remove('operandSelected'))
            }
            else if ((btn.textContent === '+' || btn.textContent === '-' || btn.textContent === '*' || btn.textContent === '/') && displayValue === undefined) { // this case is for when u change ur mind about wich operation, overwrites operand eg 3+, change to 3*
                operand = btn.textContent
                calcScreen.textContent = ''
                calcPadButtons.forEach((btn) => btn.classList.remove('operandSelected'))
                btn.classList.add('operandSelected')
            }
            else if ((btn.textContent === '+' || btn.textContent === '-' || btn.textContent === '*' || btn.textContent === '/') && displayValue !== undefined) {// displaying intermediate result is nt possible
                num1 = operate(num1, operand, displayValue)
                secondScreen.textContent = num1  // intermediate result on console
                operand = btn.textContent
                calcScreen.textContent = ''
                displayValue = undefined
                calcPadButtons.forEach((btn) => btn.classList.remove('operandSelected'))
                btn.classList.add('operandSelected')
            }
            else if (!isNaN(parseFloat(btn.textContent)) || btn.textContent === '.') { // this wont let u change operand once num1,operand and display value are NOT undefined
                calcScreen.textContent += btn.textContent
                displayValue = +calcScreen.textContent

            }
            if (calcScreen.textContent.includes('.')) { decimalButton.disabled = true }
        }
    }
    )

})


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {

        calcScreen.textContent = ''
        secondScreen.textContent = ''
        displayValue = undefined
        num1 = undefined
        num2 = undefined
        operand = undefined
        backButton.disabled = false
        calcPadButtons.forEach((btn) => btn.classList.remove('operandSelected'))

    }
    if (e.key === 'Backspace') {
        if (calcScreen.textContent !== '') {// whenever text content is blank displayvalue is undefined so we dont need to mention it seprately mention it
            calcScreen.textContent = calcScreen.textContent.substring(0, (calcScreen.textContent).length - 1)
            displayValue = +calcScreen.textContent
        }
    }
    decimalButton.disabled = false
    if (num1 === undefined && num2 === undefined) {// oprts and op undefined

        if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            if (displayValue === undefined) { // to make entering -4 as input possible THIS nt implemented fr intermediate eg -5 * -3 not possible it becomes -5-3
                calcScreen.textContent += e.key
                displayValue = +calcScreen.textContent
            }
            else {
                operand = e.key
                calcScreen.textContent = ''
                num1 = displayValue
                secondScreen.textContent = num1
                displayValue = undefined
                calcPadButtons.forEach((btn)=>{if (e.key===btn.textContent){btn.classList.add('operandSelected')}})
                
            }
        }

        else if (!isNaN(parseFloat(e.key)) || e.key === '.') { // screen can only display numbers and .
            calcScreen.textContent += e.key
            displayValue = +calcScreen.textContent // holds number
        }
        if (calcScreen.textContent.includes('.')) { decimalButton.disabled = true }

    }
    else if (num1 !== undefined && num2 === undefined) {// only 2nd opr undefined
        decimalButton.disabled = false
        if (e.key === '=' && displayValue !== undefined) {
            num2 = displayValue
            displayValue = operate(num1, operand, num2) // holds result of operation
            calcScreen.textContent = displayValue
            secondScreen.textContent = 'PRESS CLEAR '
            backButton.disabled = true
            calcPadButtons.forEach((btn) => btn.classList.remove('operandSelected'))
        }
        else if ((e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') && displayValue === undefined) { // this case is for when u change ur mind about wich operation, overwrites operand eg 3+, change to 3*
            operand = e.key
            calcScreen.textContent = ''
            calcPadButtons.forEach((btn) => btn.classList.remove('operandSelected'))
            calcPadButtons.forEach((btn)=>{if (e.key===btn.textContent){btn.classList.add('operandSelected')}})
        }
        else if ((e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') && displayValue !== undefined) {// displaying intermediate result is nt possible
            num1 = operate(num1, operand, displayValue)
            secondScreen.textContent = num1  // intermediate result on console
            operand = e.key
            calcScreen.textContent = ''
            displayValue = undefined
            calcPadButtons.forEach((btn) => btn.classList.remove('operandSelected'))
            calcPadButtons.forEach((btn)=>{if (e.key===btn.textContent){btn.classList.add('operandSelected')}})
        }
        else if (!isNaN(parseFloat(e.key)) || e.key === '.') { // this wont let u change operand once num1,operand and display value are NOT undefined
            calcScreen.textContent += e.key
            displayValue = +calcScreen.textContent

        }
        if (calcScreen.textContent.includes('.')) { decimalButton.disabled = true }
    }
})