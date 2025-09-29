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

let firstNumber;
let secondNumber;
let operator;

function operate(sign, firstNum, secondNum)
{
    let answer;
    switch(sign)
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
        default:
            alert("You entered an invalid sign!");
            break;
    }
    return answer;
}