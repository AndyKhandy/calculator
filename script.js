
const display = document.querySelector("#displayText");
const numbers = document.querySelectorAll(".num");
const clear = document.querySelector("#clear");
const operators = document.querySelectorAll(".op");
const equal = document.querySelector("#equal");
const previous = document.querySelector("#previous");

let operatorBtn = null;


let firstNum = null;
let secondNum = null;

let operator = null;
let displayText = "0";
let totalDisplay = "";

let firstOperation = true;
let second = false;
let didCalc = false;

let previousFirst = null;
let previousSecond = null; 
let previousOperator = null;

function appendValue(value)
{
    if(value == -1)
        {
            displayText = "";
            totalDisplay = "";
            display.textContent = "0";
    }
    else {
         if(firstOperation)
        {
            displayText = value;
            firstOperation = false;
        }
        else {
            displayText += value;
        }
        totalDisplay += value;
        display.textContent = totalDisplay;
    }
}

function resetForNext()
{
    if (operatorBtn != null)
    {
        operatorBtn.classList.remove("active");
    }
    operator = null;
    second = false;
    secondNum = null;
    firstOperation = true;
}



numbers.forEach(btn => {
    btn.addEventListener("click", () => {
        if(second)
        {
            displayText = "";
            second = false;
        }
        appendValue(btn.value);
    });
});

operators.forEach(btn => {
    btn.addEventListener("click", () =>{
          if(firstNum == null)
        {
            firstNum = displayText;
            displayText = "";
        }
        else if(operator)
        {
            operatorBtn.classList.toggle("active");
            secondNum = displayText;
            operate();
            appendValue(firstNum);
        }
        if(didCalc)
        {
            totalDisplay = `${firstNum}`;
        }
        operator = btn.value;
        second = true;
        operatorBtn = btn;
        operatorBtn.classList.toggle("active");
        appendValue(btn.value);
    });
});

clear.addEventListener("click", () => {
    displayText = "";
    resetForNext();
    appendValue(-1);
});

equal.addEventListener("click", ()=> {
    secondNum = displayText;
    operate();
    totalDisplay += "=";
    appendValue(firstNum);
    resetForNext();
    didCalc = true;
});

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

function operate()
{
    previousFirst = firstNum;
    previousSecond = secondNum;
    previousOperator = operator;

    firstNum = +firstNum;
    secondNum = +secondNum;
    let answer;
    switch(operator)
    {
        case '+': 
            answer = add(firstNum,secondNum);
            break;
        case '-':
            answer = subtract(firstNum,secondNum);
            break;
        case 'x':
            answer = multiply(firstNum,secondNum);
            break;
        case '÷':
            answer = divide(firstNum,secondNum);
            break;
    }
    displayText = "";
    firstNum = answer;

    previous.classList.remove("hidden");
    previous.textContent = `${previousFirst} ${previousOperator} ${previousSecond} = ${answer}`;
}