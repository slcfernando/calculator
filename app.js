"use strict";

const display = document.querySelector("#display");
const digitButtons = document.querySelectorAll(".digit");
const decimalPointButton = document.querySelector(".point");
const negativeButton = document.querySelector(".negative");
const numberButtons = Array.from(digitButtons);
numberButtons.push(negativeButton);
numberButtons.push(decimalPointButton);
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const equalsButton = document.querySelector(".equals");
const keyNames = {
    "0": document.querySelector(".zero"),
    "1": document.querySelector(".one"),
    "2": document.querySelector(".two"),
    "3": document.querySelector(".three"),
    "4": document.querySelector(".four"),
    "5": document.querySelector(".five"),
    "6": document.querySelector(".six"),
    "7": document.querySelector(".seven"),
    "8": document.querySelector(".eight"),
    "9": document.querySelector(".nine"),
    "+": document.querySelector(".plus"),
    "-": document.querySelector(".minus"),
    "*": document.querySelector(".times"),
    "/": document.querySelector(".divide"),
    ".": document.querySelector(".point"),
    "n": document.querySelector(".negative"),
    "c": document.querySelector(".clear"),
    "Delete": document.querySelector(".delete"),
    "Enter": document.querySelector(".equals"),
    "=": document.querySelector(".equals"),
};

let result;
let currentOperand;
let currentOperator;
let lastClicked;

digitButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (lastClicked) {
            if (lastClicked.className.includes("operator")) {
                updateDisplay("");
            } else if (lastClicked.className.includes("equals")) {
                currentOperator = null;
            }
        }
        if (display.textContent == "0") {
            updateDisplay(display.textContent.slice(1));
        }
        updateDisplay(display.textContent + button.textContent);
        lastClicked = e.target;
    });
});

decimalPointButton.addEventListener("click", (e) => {
    if (display.textContent &&
        !display.textContent.includes(".") &&
        display.textContent != "-" && 
        !lastClicked.className.includes("equals")) {
        updateDisplay(display.textContent + ".");
    } else {
        currentOperator = null;
    }
    lastClicked = e.target;
});

negativeButton.addEventListener("click", (e) => {
    if (lastClicked) {
        if (lastClicked.className.includes("operator")) {
            updateDisplay("");
        }  else if (lastClicked.className.includes("equals")) {
            currentOperator = null;
        }
    }
    if (display.textContent.includes("-")) {
        updateDisplay(display.textContent.slice(1));
    } else {
        updateDisplay("-" + display.textContent);
    }
    lastClicked = e.target;
});

operatorButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        // In case the user is chaining calculators
        if (currentOperator && 
            currentOperand && 
            (numberButtons.indexOf(lastClicked) != -1) && 
            display.textContent != "-") {
            result = operate(currentOperand, display.textContent, currentOperator);
            updateDisplay(result);
        }
        if (display.textContent != "-") {
            currentOperator = button.textContent;
            currentOperand = display.textContent;
        }
        lastClicked = e.target;
    });
});

equalsButton.addEventListener("click", (e) => {
    if (currentOperand && 
        currentOperator && 
        (numberButtons.indexOf(lastClicked) != -1)) {
        result = operate(currentOperand, display.textContent, currentOperator);

        // In case the user divides by zero
        if (!Number.isFinite(result)) {
            alert("Luh don't do that!");
            clear();
        } else {
            updateDisplay(result);
        }
    }
    lastClicked = e.target;
});

clearButton.addEventListener("click", (e) => {
    clear();
    lastClicked = e.target;
});

deleteButton.addEventListener("click", (e) => {
    updateDisplay(display.textContent.slice(0, -1));
    if (!display.textContent) clear();
    currentOperator = null;
    lastClicked = e.target;
})

document.addEventListener("keypress", (e) => {
    if (e.key in keyNames) keyNames[e.key].click();
})

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    if (typeof a == "string") a = parseFloat(a);
    if (typeof b == "string") b = parseFloat(b);

    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return +(multiply(a, b).toFixed(4));
        case "/":
            return +(divide(a, b).toFixed(4));
    }
}

function updateDisplay(info) {
    display.textContent = info;
}

function clear() {
    result = null;
    currentOperand = null;
    currentOperator = null;
    updateDisplay("");
}