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
const allBtns = document.querySelectorAll("button");

let operatorBtn = null;
let mouseEvent = new Event("mousedown");
  
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
let didBackspace = false;

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
        if(totalDisplay.length > 18)
        {
            totalDisplay = totalDisplay.slice(6);
            display.style["font-size"] = "32px";
        }
        else if(totalDisplay.length < 20)
        {
            display.style["font-size"] = "50px";
        }
        displayValue();
    }
}

function displayValue()
{
    display.textContent = totalDisplay;
}

function appendNumber(value)
{
        if(newLine && didCalc && !didBackspace)
        {
            totalDisplay = "";
            newLine = false;
            didCalc = false;
        }
    appendValue(value);
}

function appendOperator(value)
{
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
        if(value == '/')
        {
            value = '÷';
        }
        else if(value == 'x' || value == '*')
        {
            value = 'x';
        }
        operator = value;
        second = true;
        appendValue(value);
        displayText = "";
}

function resetForNext()
{
    if (operatorBtn != null)
    {
        operatorBtn.classList.remove("active");
    }
    operator = null;
    second = false; 
    firstOperation = true;
    secondNum = null;
    firstNum = null;
    decimal.disabled = false;
}

function enterEquation()
{
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
    didBackspace = false;
}

function backspace()
{
    //splits the totalDisplay into the first number and second number if there is an operator between them
    let operations = totalDisplay.split(`${operator}`);
    let lastCharacter = totalDisplay.at(-1);

    if(totalDisplay === "")
    {
        return; 
    }
    else{
        decimal.disabled = false;
        //Means that there is only one string or in this case only the first number
        if(operations.length === 1)
        {
            if(lastCharacter == 's')
                {
            totalDisplay = displayText = operations[0].slice(0, totalDisplay.length-3);
                }
            else{
            totalDisplay = displayText =  operations[0].slice(0,-1);
            }

            if(displayText.length === 0)
            {
                totalDisplay = "0";
            }
        }
        //Means that there is two strings. One before the operator sign (first number) and one after (second number)
        else if(operations.length === 2)
        {
            let newDisplay;
            //if the last word + action contains ans then ans is completely deleted
            if(lastCharacter == 's')
                {
            newDisplay = operations[1].slice(0, totalDisplay.length-3);
            displayText = newDisplay;
            totalDisplay = operations[0] + opeartor + newDisplay;
                }
            else{
                //reformat the totalDisplay with the new look
                newDisplay = operations[1].slice(0,-1);
                displayText = newDisplay;
            totalDisplay = operations[0] + operator + newDisplay;
            }
        }
        displayValue();
        didBackspace = true;
    }
   
}

window.addEventListener("keydown", (e)=>{
    if(e.key >= 0 && e.key <= 9)
    {
        appendNumber(e.key);
    }
    if(e.key === '+' || e.key === '-' || e.key === 'x' || e.key == '*' || e.key == '/')
    {
        appendOperator(e.key);
    }
    if(e.key == "Enter" || e.key == "=")
    {
        enterEquation();
    }
    if(e.key == "." && decimal.disabled == false)
    {
        decimal.dispatchEvent(mouseEvent);
    }
    if(e.key == "Backspace")
    {
        backspace();
    }
});

numbers.forEach(btn => {
    btn.addEventListener("mousedown", () => {
        appendNumber(btn.value);
    });
});

operators.forEach(btn => {
    btn.addEventListener("mousedown", () =>{
        appendOperator(btn.value);
        operatorBtn = btn;
        operatorBtn.classList.toggle("active");
    });
});

let pipClick = 0;
let snorClick = 0;

stickers.forEach((sticker) => {
    sticker.addEventListener("mousedown", () => {
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

        allBtns.forEach(btn => {
            if(pipClick) 
            {
                btn.style["background-color"] = "rgb(48, 125, 193)";
            }
            else if(snorClick) 
            {
                btn.style["background-color"] = "rgba(76, 146, 108, 1)";
            }
            else {
                btn.style["background-color"] = "rgb(6, 54, 177)";
            }
        });

        sticker.classList.toggle("active");
    });
});


ans.addEventListener("mousedown", ()=> {
    if(didCalc && newLine)
    {
        totalDisplay = "";
        didCalc = false;
    }
    displayText = "";
    appendValue("ans");
})

clear.addEventListener("mousedown", () => {
    displayText = "";
    resetForNext(); 
    appendValue(-1);
    didCalc = false;
    newLine = false;
});

decimal.addEventListener("mousedown", () => {
    if(!displayText)
    {
        appendValue("0");
    }
    appendValue(".");
    decimal.disabled = true;
});

equal.addEventListener("mousedown", ()=> {
    enterEquation();
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
        alert("YOU CAN NOT DIVIDE BY ZERO");
        clear.dispatchEvent(mouseEvent);
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
    answer = Math.round(answer*100)/100;
    displayText = "";
    firstNum = answer;
    pastNum = firstNum;

    previous.classList.remove("hidden");
     previous.textContent = `${previousFirst} ${previousOperator} ${previousSecond} = ${answer}`;
     appendValue("=");
    appendValue(firstNum);
}