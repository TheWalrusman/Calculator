let displayArray = [];
let validNumericExpressionRegex = /^(([0-9]{1,}(\.?[0-9]{1,})?)([\/\*\-\+])*)+\=$/gm;
let doubleDecimalCheckRegex = /(\.\.)/gm;
let invalidFloatRegex = /([0-9]*\.[0-9]*\.)/gm;
let decimalAloneRegex = /([\/\*\-\+]\.)|(^\.)/gm;
let floatMaxSizeRegex = /[0-9]+\.[0-9]{6,}/gm;
let operatorsInARowRegex = /[\/\*\-\+]/gm;
let allOperatorsInARowRegex = /[\/\*\-\+\=]/gm;
let divideByZeroRegex = /\/0*\.0*[\/\*\-\+]/gm;
let errorInvalidFloat = `ERROR: Float error`;
let errorFloatSizeMax = `ERROR: Float size of 6 reached Error`;
let errorDivideByZero = `ERROR: Do not try to divide by zero, you know better...`;
let errorNumericalExpression = `ERROR: There is something wrong here, but I can't put my finger on it`;
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
  return;
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
