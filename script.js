
const display = document.querySelector("#displayText");
const numbers = document.querySelectorAll(".num");
const clear = document.querySelector("#clear");
const operators = document.querySelectorAll(".op");
const equal = document.querySelector("#equal");

let firstNum = null;
let secondNum = null;
let operator = null;
let displayText = display.textContent;
let second = false;

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
    operator = null;
    firstNum = null;
    secondNum = null;
    second = false;
    updateDisplay();
});

equal.addEventListener("click", ()=> {
    secondNum = +displayText;
    firstNum = operate(operator,firstNum,secondNum)
    operator = null;
    second = false;
});


numbers.forEach(btn => {
    btn.addEventListener("click", () => {
       if(displayText == "0")
       {
        displayText = btn.value
       }
       else if(second)
       {
        displayText = btn.value;
        second = false;
       }
       else{
        displayText += btn.value;
       }
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
        second = true;
        operator = btn.value;
        displayText = btn.value;
        updateDisplay();
    });
});