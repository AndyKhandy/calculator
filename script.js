
const display = document.querySelector("#displayText");
const numbers = document.querySelectorAll(".num");
const clear = document.querySelector("#clear");
const operators = document.querySelectorAll(".op");
const equal = document.querySelector("#equal");
const ops = "+-X÷";

let firstNum = null;
let secondNum = null;
let operator = null;
let displayText = display.textContent;

function add(a,b)
{
    return a+b;
}

function subtract(a,b)
{
    return a-b;
}

function multiply(a,b) 
{
    return a*b;
}

function divide(a,b)
{
    let answer = a/b;
    return answer.toFixed(2);
}


function updateDisplay()
{
    display.textContent = displayText || 0;
}

function operate()
{
    let answer;
    switch(operator)
    {
        case '+': 
            answer = add(firstNum,secondNum);
            break;
        case '-':
            answer = subtract(firstNum,secondNum);
            break;
        case 'X':
            answer = multiply(firstNum,secondNum);
            break;
        case '÷':
            answer = divide(firstNum,secondNum);
            break;
    }
    displayText = answer;
    updateDisplay();
    return answer;
}

clear.addEventListener("click", () => {
    displayText = "0";
    updateDisplay();
});

equal.addEventListener("click", ()=> {
    secondNum = +displayText;
    operate(operator,firstNum,secondNum)
});


numbers.forEach(btn => {
    btn.addEventListener("click", () => {
        displayText = btn.value;
        updateDisplay();
    });
});

operators.forEach(btn => {
    btn.addEventListener("click", () =>{
        if(firstNum == null)
        {
            firstNum = +displayText;
        }
        else if(operator)
        {
            secondNum = +displayText;
            firstNum = operate();
        }
        operator = btn.value;
        displayText = btn.value;
        updateDisplay();
    });
});