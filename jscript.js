const clear = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const multiply = document.querySelector('.multiply');
const decimal = document.querySelector('.decimal');
const equals = document.querySelector('.equals');
const divide = document.querySelector('.divide');
const number = document.querySelectorAll('.number');

const rightDisplay = document.querySelector('.rightDisplay');
const leftDisplay = document.querySelector('.leftDisplay');

//For storing the value of the display
let firstVar;
let secondVar;

let clearNum = false;
let isLastInputNum = true;
let operationEqual = true;

//Display the value inputted by the user
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function() {
        if(clearNum === true)
        {
            clearNum = false;
            rightDisplay.textContent = '';
            isLastInputNum = true;
            if(rightDisplay.textContent.length < 9)
            {
                rightDisplay.textContent += `${number[i].textContent}`;
            }
        }
        else
        {
            isLastInputNum = true;
            if(rightDisplay.textContent.length < 9)
            {
                rightDisplay.textContent += `${number[i].textContent}`;
            }
        }

    });
}


plus.addEventListener("click", function() {
    addOperation("+");
})

minus.addEventListener("click", function() {
    addOperation("-")
})

multiply.addEventListener("click", function() {
    addOperation("X")
})

decimal.addEventListener("click", function() {
    if(rightDisplay.textContent === '')
    {
        rightDisplay.textContent = '0.';
    }
    else if(rightDisplay.textContent !== '' && leftDisplay.textContent!== '')
    {
        firstVar = rightDisplay.textContent ;
        rightDisplay.textContent = '0.';
    }
    else if(rightDisplay.textContent!== '' && leftDisplay.textContent === '')
    {
        rightDisplay.textContent += ".";
    }
})

divide.addEventListener("click", function() {
    addOperation("/");
})
//Clear the Display
clear.addEventListener("click", function() {
    firstVar = "";
    secondVar = "";
    rightDisplay.textContent = "";
    leftDisplay.textContent = "";
    isLastInputNum = true;
})

//Delete the last digit of the display
deleteButton.addEventListener("click", function() {
    if(isLastInputNum === false) 
    {
        leftDisplay.textContent = "";
        isLastInputNum = true;
    }
    else
    {
        let lastIndex = rightDisplay.textContent.lastIndexOf(' ');
        rightDisplay.textContent = rightDisplay.textContent.slice(0, lastIndex);
    }
})

equals.addEventListener("click", calculate)

function calculate() {
    if(rightDisplay!== '' && leftDisplay!== '')
    {
        secondVar = rightDisplay.textContent;
        let firstVarCalc = Number(firstVar);
        let secondVarCalc = Number(secondVar);

        secondVar = "";

        switch(leftDisplay.textContent) {
            case "+":
                firstVar = firstVarCalc + secondVarCalc;
                firstVar = round(firstVar);
                rightDisplay.textContent = firstVar;
                break;
            case "-":
                firstVar = firstVarCalc - secondVarCalc;
                firstVar = round(firstVar);
                rightDisplay.textContent = firstVar;
                break;
            case "X":
                firstVar = firstVarCalc * secondVarCalc;
                firstVar = round(firstVar);
                rightDisplay.textContent = firstVar;
                break;
            case "/":
                firstVar = firstVarCalc / secondVarCalc;
                firstVar = round(firstVar);
                rightDisplay.textContent = firstVar;
                break;
        }
        leftDisplay.textContent = "";
        firstVarCalc = '0'
        secondVarCalc = '0';
        clearNum = true;
    }
}

function round(numb)
{
    let numbToString = numb.toString();
    let numbUpToEight = numbToString.slice(0, 8);
    console.log(numbToString.slice(0, 8));
    let numbUpToNine = numbToString.slice(0, 9);
    let numbUpToTen = numbToString.slice(0, 10);
    let numbAtTen = numbToString.slice(0, 10);
    let numbAtEleven = numbToString.slice(0, 11);

    if (numbToString.length >= 9 && numbUpToNine.includes("."))
    {
        console.log(numbUpToNine);
        if(numbAtEleven >= 5)
        {
            let roundEndNum = Number(numbAtTen) + 1;
            numbUpToTen = numbUpToNine + roundEndNum.toString();
            return numbUpToTen
        }
        else
        {
            return numbUpToTen;
        }

    }
    else if(numbToString.length >= 9 && !numbUpToNine.includes("."))
    {
        console.log("else if");
        if(numbAtTen>= 5)   
        {
            let roundEndNum = Number(numbUpToNine[8]) + 1;
            numbUpToNine = numbUpToEight + roundEndNum.toString();
            return numbUpToNine;
        }
        else
        {
            return numbUpToNine;
        }
    }
    else
    {
        console.log("error")
        return numb;
    }
}

function addOperation(operation) {
    if(leftDisplay.textContent !== '' && rightDisplay.textContent == '')
    {
        leftDisplay.textContent = operation;
        isLastInputNum = false;
    }
    else if(leftDisplay.textContent === '' && rightDisplay.textContent !== '')
    {
        clearNum = true;
        firstVar = rightDisplay.textContent;
        console.log(firstVar);
        leftDisplay.textContent = operation;
        isLastInputNum = false;[]
    }
    else if(leftDisplay.textContent !== '' && rightDisplay.textContent !== ''  && isLastInputNum === true)
    {
        calculate();
        leftDisplay.textContent = operation;
        isLastInputNum = false;
    }
    else if(leftDisplay.textContent !== '' && rightDisplay.textContent !== ''  && isLastInputNum === false)
    {
        leftDisplay.textContent = operation;
    }
}