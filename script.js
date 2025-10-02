const calcDiv = document.querySelector(".calculator");
const display = document.querySelector("#displayText");
const numbers = document.querySelectorAll(".num");
const clear = document.querySelector("#clear");
const operators = document.querySelectorAll(".op");
const equal = document.querySelector("#equal");
const previous = document.querySelector("#previous");
const ans = document.querySelector("#ans");
const decimal = document.querySelector("#decimal");
const stickers = document.querySelectorAll(".sticker");

let operatorBtn = null;


let firstNum = null;
let secondNum = null;
let pastNum = null;

let operator = null;
let displayText = "0";
let totalDisplay = "";

let firstOperation = true;
let second = false;
let didCalc = false;
let newLine = false;

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
        if(totalDisplay.length > 15)
        {
            totalDisplay = totalDisplay.slice(6);
        }
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
    firstNum = null;
    firstOperation = true;
}



numbers.forEach(btn => {
    btn.addEventListener("click", () => {
        if(second)
        {
            displayText = "";
            second = false;
        }
        if(newLine && didCalc)
        {
            totalDisplay = "";
            newLine = false;
            didCalc = false;
        }
        appendValue(btn.value);
    });
});

operators.forEach(btn => {
    btn.addEventListener("click", () =>{
        if(firstNum == null)
        {
            firstNum = displayText;
            if(firstNum == "ans")
            {
                firstNum = pastNum;
                totalDisplay = "ans";
            }
            displayText = "";
        }
        else if(operator)
        {
            
            operatorBtn.classList.toggle("active");
            if(displayText == "ans")
            {       
            secondNum = pastNum;
            }
            else{
            secondNum = displayText;
            }
            operate();
        }
        else if(didCalc)
        {
            totalDisplay = pastNum;
            didCalc = false;
        }
        newLine = false;
        decimal.disabled = false;
        operator = btn.value;
        second = true;
        operatorBtn = btn;
        operatorBtn.classList.toggle("active");
        appendValue(btn.value);
    });
});

let pipclick = 0;
let snorClick = 0;

stickers.forEach((sticker) => {
    sticker.addEventListener("click", () => {
        let pokeName = sticker.value;
        if(pokeName == "snor")
        {
        calcDiv.style["background-image"] = "url(pictures/snorlaxPat.jpg)";
        stickers[1].classList.remove("active");
        snorClick++;
        pipClick = 0;
        }
    else if(pokeName == "pip"){
        calcDiv.style["background-image"] = "url(pictures/piplupPat.jpg)";
        
        stickers[0].classList.remove("active");
        pipClick++;
        snorClick = 0;
        } 
        
        if(pipClick == 2 || snorClick == 2)
        {
            calcDiv.style["background-image"] = "none";
            pipClick = 0;
            snorClick = 0;
        }
        sticker.classList.toggle("active");
    });
});


ans.addEventListener("click", ()=> {
    if(didCalc && newLine)
    {
        totalDisplay = "";
        didCalc = false;
    }
    displayText = "";
    appendValue("ans");
})

clear.addEventListener("click", () => {
    displayText = "";
    resetForNext();
    appendValue(-1);
    didCalc = false;
    newLine = false;
});

decimal.addEventListener("click", () => {
    appendValue(".");
    decimal.disabled = true;
});

equal.addEventListener("click", ()=> {
    if(displayText == "ans")
    {
        secondNum = pastNum;
    }
    else{
        secondNum = displayText;
    }
    operate();
    resetForNext();
    didCalc = true;
    newLine = true;
    displayText = "ans";
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
    if(secondNum == "0" && operator =='÷')
    {
        let clickEvent = new Event("click");
        alert("YOU CAN NOT DIVIDE BY ZERO");
        clear.dispatchEvent(clickEvent);
        return;
    }
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
    pastNum = firstNum;

    previous.classList.remove("hidden");
     previous.textContent = `${previousFirst} ${previousOperator} ${previousSecond} = ${answer}`;
     appendValue("=");
    appendValue(firstNum);
}