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
const backSpace = document.querySelector("#backspace");
const signChange = document.querySelector("#sign");

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
        }
        didCalc = false;
        newLine = false;
        decimal.disabled = false;
        signChange.disabled = false;
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
    signChange.disabled = false;
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
    let indexOP = totalDisplay.indexOf(operator)
    let lastCharacter = totalDisplay.at(-1);

    if(totalDisplay === "" || didCalc)
    {
        return; 
    }
    else{
        decimal.disabled = false;
        signChange.disabled = false;

        //means that the user is trying to backspace on the operator
        if(totalDisplay.length-1 == indexOP)
        {
            operator = null;
            second = false;
            totalDisplay = totalDisplay.slice(0, indexOP);
            displayText = "";
        }
        //means that there is a second number
        else if(totalDisplay.length-1 > indexOP && indexOP != -1)
        {
            //if the last word + action contains ans then ans is completely deleted
            if(lastCharacter == 's')
                {
            totalDisplay = totalDisplay.slice(0, totalDisplay.length-3);
            displayText = "";
                }
            else{
                //reformat the totalDisplay with the new look
            totalDisplay = totalDisplay.slice(0,-1);
            if(totalDisplay.length-1 == indexOP)
            {
                displayText = "";
            }
            else{
                displayText = totalDisplay.slice(indexOP);
            }
            }
        }
        //means there is no operator (first number)
        else if(indexOP == -1)
        {
            if(lastCharacter == 's')
                {
            totalDisplay = displayText = totalDisplay.slice(0, totalDisplay.length-3);
                }
            else{
            totalDisplay = displayText =  totalDisplay.slice(0,-1);
            }
            firstNum = null;

            if(displayText.length === 0)
            {
                totalDisplay = "0";
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

backSpace.addEventListener("mousedown", backspace);

signChange.addEventListener("mousedown", () =>{
    appendNumber("-");
});

let pipClick = 0;
let snorClick = 0;
let genClick = 0;

stickers.forEach((sticker) => {
    sticker.addEventListener("mousedown", () => {
        let pokeName = sticker.value;
        if(pokeName == "snor")
        {
        calcDiv.style["background-image"] = "url(pictures/snorlaxPat.jpg)";
        stickers[1].classList.remove("active");
        stickers[2].classList.remove("active");
        snorClick++;
        pipClick = 0;
        genClick = 0;
        }
    else if(pokeName == "pip"){
        calcDiv.style["background-image"] = "url(pictures/piplupPat.jpg)";

        stickers[0].classList.remove("active");
        stickers[2].classList.remove("active");
        pipClick++;
        snorClick = 0;
        genClick = 0;
        }
    else if(pokeName == "gen"){
        calcDiv.style["background-image"] = "url(pictures/gengarPat.jpg)";

        stickers[0].classList.remove("active");
        stickers[1].classList.remove("active");
        genClick++;
        pipClick = 0;
        snorClick = 0;
    }

        if(pipClick == 2 || snorClick == 2 || genClick == 2)
        {
            calcDiv.style["background-image"] = "none";
            pipClick = 0;
            snorClick = 0;
            genClick = 0;
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
            else if(genClick)
            { 
                btn.style["background-color"] = "rgba(208, 152, 48, 1)";
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