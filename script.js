function add(a, b) { return Math.round((a + b) * 100) / 100 }
function sub(a, b) { return Math.round((a - b) * 100) / 100 }
function mul(a, b) { return Math.round((a * b) * 100) / 100 }
function divide(a, b) { return Math.round((a / b) * 100) / 100 }

function operate(a, op, b) {
    if (b===0){return 'NO CAN DO !!!! prs clr'}
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
    secondScreen.textContent=''
    displayValue = undefined
    num1 = undefined
    num2 = undefined
    operand = undefined
})
const secondScreen=document.createElement('div')
calcSpecialButtonDiv.appendChild(secondScreen)

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

let displayValue  // stores number present on screen
let num1
let num2
let operand

let calcPadButtons = document.querySelectorAll('.calcPadButton')

calcPadButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (num1 === undefined && num2 === undefined) {// oprts and op undefined

            if (btn.textContent === '+' || btn.textContent === '-' || btn.textContent === '*' || btn.textContent === '/') {
                operand = btn.textContent
                calcScreen.textContent = ''
                num1 = displayValue
                displayValue = undefined
            }

            else if (!isNaN(parseFloat(btn.textContent)) || btn.textContent === '.') { // screen can only display numbers and .
                calcScreen.textContent += btn.textContent
                displayValue = +calcScreen.textContent // holds number
            }

        }
        else if (num1 !== undefined && num2 === undefined) {// only 2nd opr undefined
            if (btn.textContent === '=' && displayValue!==undefined) {
                num2 = displayValue
                displayValue = operate(num1, operand, num2) // holds result of operation
                calcScreen.textContent = displayValue
                secondScreen.textContent=''
            }
            else if ((btn.textContent === '+' || btn.textContent === '-' || btn.textContent === '*' || btn.textContent === '/') && displayValue === undefined) { // this case is for when u change ur mind about wich operation, overwrites operand eg 3+, change to 3*
                operand = btn.textContent
                calcScreen.textContent = ''
            }
            else if ((btn.textContent === '+' || btn.textContent === '-' || btn.textContent === '*' || btn.textContent === '/') && displayValue !== undefined) {// displaying intermediate result is nt possible
                num1=operate(num1,operand,displayValue)
                //calcScreen.textContent=num1
                secondScreen.textContent=`result:${num1}` // intermediate result on console
                operand=btn.textContent
                calcScreen.textContent=''
                displayValue=undefined
            }
            else if (!isNaN(parseFloat(btn.textContent)) || btn.textContent === '.') { // this wont let u change operand once num1,operand and display value are NOT undefined
                calcScreen.textContent += btn.textContent
                displayValue = +calcScreen.textContent
            }
        }
    }


        //console.log((isNaN(parseFloat(displayValue))))


    )

})
