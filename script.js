function add(a, b) { return a + b }
function sub(a, b) { return a - b }
function mul(a, b) { return a * b }
function divide(a, b) { return Math.round((a/b)*100)/100 }

function operate(a, op, b) {
    if (op === '+') { return add(a, b) }
    else if (op === '-') { return sub(a, b) }
    else if (op === '*') { return mul(a, b) }
    else if (op === '/') { return divide(a, b) }
    else { return 'INVALID' }
}

