const compare = (a, b) => a.pow < b.pow ? 1 : -1;

const convertExpressionToDisplay = (expression) => {
    let displayExpression = '';

    for (let i = 0; i < expression.length; i++) {
        displayExpression += expression[i].pow > 1 ? (
            `${expression[i].number > 0 && i > 0 ? '+' + expression[i].number : expression[i].number}x<sup>${expression[i].pow}</sup>`
        ) : (
            `${expression[i].number}`
        )
    }

    return `${displayExpression}`
}

const addToSingleExpression = (founInput, powerInput, expression) => {
    powerInput.value = powerInput.value ? powerInput.value: 1;
    const numberValue = parseInt(founInput.value);
    const powValue = parseInt(powerInput.value);
    let doAdd = true;

    for (let i = 0; i < expression.length; i++) {
        if (expression[i].pow === powValue) {
            expression[i].number += numberValue;
            doAdd = false;
        }
    }

    doAdd && expression.push({
        number: numberValue,
        pow:  powValue
    });
}

const foundationFirstInput = document.querySelector("input.fundFirstInput");
const powFirstInput = document.querySelector("input.powFirstInput");
const displayFirstExp = document.querySelector("p.firstExp");
const buttonFirstExp = document.querySelector("button.firstExpBtn");

const firstExpression = [];

buttonFirstExp.addEventListener('click', () => {
    addToSingleExpression(foundationFirstInput, powFirstInput, firstExpression)
    displayFirstExp.innerHTML = convertExpressionToDisplay(firstExpression);
    displayResult();
})

const foundationSecondInput = document.querySelector("input.fundSecondInput");
const powSecondInput = document.querySelector("input.powSecondInput");
const displaySecondExp = document.querySelector("p.secondExp");
const buttonSecondExp = document.querySelector("button.secondExpBtn");

const secondExpression = [];

buttonSecondExp.addEventListener('click', () => {
    addToSingleExpression(foundationSecondInput, powSecondInput, secondExpression)
    displaySecondExp.innerHTML = convertExpressionToDisplay(secondExpression);
    displayResult();
})


const displaySumOfExpressions = (firstExpr, secondExpr) => {
    const indexesToRemove = [];

    for (let i = 0; i < firstExpr.length; i++) {
        for (let j = 0; j < secondExpr.length; j++) {
            if (firstExpr[i].pow === secondExpr[j].pow) {
                firstExpr[i].number += secondExpr[j].number;
                indexesToRemove.push(j);
            }
        }

        indexesToRemove.map((index, i) => secondExpr.splice(index - i, 1));
        indexesToRemove.length = 0;
    }

    return firstExpr.concat(secondExpr).sort(compare)
};


const displayBox = document.querySelector('p.displayBox');

const displayResult = () => {
    const sumExpression = displaySumOfExpressions(firstExpression, secondExpression);
    displayBox.innerHTML = 'Expressions sum: ' + convertExpressionToDisplay(sumExpression);
};