let displayArray = [];
let validNumericExpressionRegex = /^([0-9]{1,}(\.?[0-9]{1,})?=$)|(([0-9]{1,}(\.?[0-9]{1,})?)([\/\*\-\+])*)(([0-9]{1,}(\.?[0-9]{1,})?)([\/\*\-\+])*)+\=$/gm;
let invalidFloatRegex = /([0-9]*\.[0-9]*\.)/gm;
let decimalAloneRegex = /([\/\*\-\+]\.)|(^\.)/gm;
let floatMaxSizeRegex = /[0-9]+\.[0-9]{6,}/gm;
let operatorsInARowRegex = /[\/\*\-\+]/gm;
let allOperatorsInARowRegex = /[\/\*\-\+\=]/gm;
let divideByZeroRegex = /\/0*\.0*[\/\*\-\+]/gm;
let historyInputRegex = /[\/\*\-\+]/gm;
let errorInvalidFloat = `ERROR: Float error`;
let errorFloatSizeMax = `ERROR: Float size of 6 reached Error`;
let errorDivideByZero = `ERROR: Do not try to divide by zero, you know better...`;
let errorNumericalExpression = `ERROR: There is something wrong here, but I can't put my finger on it`;
let errorEqualsUnknown = `Something went wrong with the evaluation of the expression`;
let errorhistoryAddingToValue = `Please do not add values from the history to a already typed value`
let numberRegex = /[0-9]/;
let decimalRegex = /\./;

function checkProperValueKeyInput() {
  let displayString = displayArray.join(``);
  let newDisplayString = displayArray.join(``);
  newDisplayString +=(this.childNodes[1].innerHTML.trim());


  if (newDisplayString.search(invalidFloatRegex) !== -1)
  {
    document.getElementById(`errorDisplay`).innerText = errorInvalidFloat;
    return;

  }else if(newDisplayString.search(floatMaxSizeRegex) !== -1) {
    document.getElementById(`errorDisplay`).innerText = errorFloatSizeMax;
    return;
  }else if(newDisplayString.search(divideByZeroRegex) !== -1)
  {
    document.getElementById(`errorDisplay`).innerText = errorDivideByZero;
    return;
  }else if(newDisplayString.search(decimalAloneRegex) !== -1) {
    document.getElementById(`errorDisplay`).innerText = ``;
    document.getElementById(`displayBox`).innerText += `0`;
    displayArray.push(`0`);
  }
  document.getElementById(`errorDisplay`).innerText = ``;
  document.getElementById(`displayBox`).innerText += this.childNodes[1].innerHTML.trim();
  displayArray.push(this.childNodes[1].innerHTML.trim());
  return;
}
function checkProperOperatorKeyInput() {
  let displayString = displayArray.join(``);
  let newDisplayString = displayArray.join(``);
  newDisplayString +=(this.childNodes[1].innerHTML.trim());
  if (newDisplayString[newDisplayString.length-2].search(operatorsInARowRegex) !== -1)
  {
    document.getElementById(`errorDisplay`).innerText = ``;
    displayArray.pop();
    displayArray.push(this.childNodes[1].innerHTML.trim());
    document.getElementById(`displayBox`).innerText = displayArray.join(``);
    return;
  }else if(newDisplayString.search(divideByZeroRegex) !== -1) {
    document.getElementById(`errorDisplay`).innerText = errorDivideByZero;
    return;
  }
  document.getElementById(`errorDisplay`).innerText = ``;
  document.getElementById(`displayBox`).innerText += this.childNodes[1].innerHTML.trim();
  displayArray.push(this.childNodes[1].innerHTML.trim());
  return;
}

function backspaceOperation() {
  if(displayArray !== [])
  {
    displayArray.pop();
    document.getElementById(`displayBox`).innerText = displayArray.join(``);
  }
  return;
}
function clearOperation(){
  displayArray = [];
  document.getElementById(`displayBox`).innerText = displayArray.join(``);
  return;
}

function equalsOperation() {
  let displayString = displayArray.join(``);
  let newDisplayString = displayArray.join(``);
  newDisplayString +=(this.childNodes[1].innerHTML.trim());


  if (newDisplayString.search(validNumericExpressionRegex) === -1)
  {
    document.getElementById(`errorDisplay`).innerText = errorNumericalExpression;
    return;
  }
  let numericalExpressionComplete = [];
  let numericalExpressionPiece = ``;
  for (let i = 0; i < newDisplayString.length; i++) {
    if (newDisplayString[i].search(allOperatorsInARowRegex) === -1){
      numericalExpressionPiece += newDisplayString[i];
    }else {
      numericalExpressionComplete.push(numericalExpressionPiece);
      numericalExpressionComplete.push(newDisplayString[i]);
      numericalExpressionPiece = ``;
    }
  }
  numericalExpressionComplete.pop();
  numericalExpressionComplete.reverse();
  let rightHandValue = null;
  let leftHandValue = null;
  let currentOperand = null;
  if (numericalExpressionComplete.length === 1){

  }else {
    for (let i = numericalExpressionComplete.length - 2; i > 0; i -= 2) {
      rightHandValue = numericalExpressionComplete[i+1];
      leftHandValue = numericalExpressionComplete[i-1];
      currentOperand = numericalExpressionComplete[i];
      switch (currentOperand) {
        case `+`:
          numericalExpressionComplete[i-1] = rightHandValue + leftHandValue;
          break;
        case `-`:
          numericalExpressionComplete[i-1] = rightHandValue - leftHandValue;
          break;
        case  `*`:
          numericalExpressionComplete[i-1] = rightHandValue * leftHandValue;
          break;
        case  `/`:
          numericalExpressionComplete[i-1] = rightHandValue / leftHandValue;
          break;
        default:
          document.getElementById(`errorDisplay`).innerText = errorEqualsUnknown;
          break;
      }
    }
  }
  let logNode = document.createElement("DIV");
  logNode.classList.add(`historyEntry`);
  let expressionNode = document.createElement("P");
  let answerNode = document.createElement("P");
  answerNode.classList.add(`nodeAnswer`);
  let textNode = document.createTextNode(displayString);
  expressionNode.appendChild(textNode);
  textNode = document.createTextNode(numericalExpressionComplete[0]);
  answerNode.appendChild(textNode);
  logNode.appendChild(expressionNode);
  logNode.appendChild(answerNode);
  logNode.addEventListener
  (`mouseup`, function(e){ historyAddExpresion.call(this, e) },true  );
  document.getElementById("historyBox").appendChild(logNode);
  displayArray = [];
  document.getElementById(`displayBox`).innerText = ``;
  return;
}
function historyAddExpresion() {
  let displayString = displayArray.join(``);
  let newDisplayString = displayArray.join(``);
  if (newDisplayString.length === 0 || newDisplayString[newDisplayString.length-1].search(historyInputRegex) !== -1) {
    displayArray.push(this.childNodes[1].innerHTML.trim());
    document.getElementById(`displayBox`).innerText += this.childNodes[1].innerHTML.trim();
  }else {
    document.getElementById(`errorDisplay`).innerText = errorhistoryAddingToValue;
  }
}
function clearHistory() {
  document.getElementById(`historyBox`).innerHTML = ``;
}

let valueElements = Array.from(document.getElementsByClassName(`valueBox`));
valueElements.forEach(box => box.addEventListener
    (`mouseup`, function(e){ checkProperValueKeyInput.call(this, e) },true  ));

let operatorElements = Array.from(document.getElementsByClassName(`operandBox basicOperator`));
operatorElements.forEach(box => box.addEventListener
    (`mouseup`, function(e){ checkProperOperatorKeyInput.call(this, e) },true  ));

let backspaceKey = document.getElementById(`backspaceBox`);
backspaceKey.addEventListener
    (`mouseup`, function(e){ backspaceOperation.call(this, e) },true  );

let clearKey = document.getElementById(`clearBox`);
clearKey.addEventListener
    (`mouseup`, function(e){ clearOperation.call(this, e) },true  );

let equalsKey = document.getElementById(`equalBox`);
equalsKey.addEventListener
    (`mouseup`, function(e){ equalsOperation.call(this, e) },true  );

let clearHistoryKey = document.getElementById(`resetHistoryButton`);
clearHistoryKey.addEventListener
(`mouseup`, function(e){ clearHistory.call(this, e) },true  );
