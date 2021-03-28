"use strict";

const display = document.querySelector("#display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const equalsButton = document.querySelector(".equals");

let result;
let currentOperand;
let currentOperator;
let lastClicked;

digitButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (lastClicked) {
            if (lastClicked.className == "operator") {
                updateDisplay("");
            } else if (lastClicked.className == "equals") {
                clear();
            }
        }
        updateDisplay(display.textContent + button.textContent);
        lastClicked = e.target;
    });
});
operatorButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        // In case the user is chaining calculators
        if (currentOperator && currentOperand && lastClicked.className == "digit") {
            result = operate(currentOperand, display.textContent, currentOperator);
            updateDisplay(result);
        }
        currentOperator = button.textContent;
        currentOperand = display.textContent;
        lastClicked = e.target;
    });
});
equalsButton.addEventListener("click", (e) => {
    if (currentOperand && lastClicked.className == "digit") {
        // In case the user divides by zero
        result = operate(currentOperand, display.textContent, currentOperator);
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
            return multiply(a, b);
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