let displayArray = [];
let validNumericExpressionRegex = /^(([0-9]{1,}(\.?[0-9]{1,})?)([\/\*\-\+])*)+\=$/gm;
let doubleDecimalCheckRegex = /(\.\.)/gm;
let invalidFloatRegex = /([0-9]*\.[0-9]*\.)/gm;
let decimalAloneRegex = /[\/\*\-\+]*\./gm;
let floatMaxSizeRegex = /[0-9]+\.[0-9]{6,}/gm;
let operatorsInARowRegex = /[\/\*\-\+]/gm;
let divideByZeroRegex = /\/0*\.0*[\/\*\-\+]/gm;
let errorInvalidFloat = `ERROR: Float error`;
let errorFloatSizeMax = `ERROR: Float size of 6 reached Error`;
let errorInvalidNumericExpression = `ERROR: Numeric expression Error`;
let errorDivideByZero = `Do not try to divide by zero, you know better...`;
let numberRegex = /[0-9]/;
let decimalRegex = /\./;

function checkProperValueKeyInput() {
  let displayString = displayArray.join(``);
  let newDisplayString = displayArray.join(``);
  newDisplayString.push(this.childNodes[1].innerHTML.trim());


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
  }else if(newDisplayString.search(decimalAloneRegex) !== -1)
  {
    document.getElementById(`errorDisplay`).innerText = ``;
    document.getElementById(`displayBox`).innerText += `0`;
    displayArray.push(`0`);

  document.getElementById(`errorDisplay`).innerText = ``;
  document.getElementById(`displayBox`).innerText += this.childNodes[1].innerHTML.trim();
  displayArray.push(this.childNodes[1].innerHTML.trim());
  return;
}
function checkProperOperatorKeyInput() {
  let displayString = displayArray.join(``);
  let newDisplayString = displayArray.join(``);
  newDisplayString.push(this.childNodes[1].innerHTML.trim());
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

function decimalKeyBlocker() {



}
let valueElements = Array.from(document.getElementsByClassName(`valueBox`));
valueElements.forEach(box => box.addEventListener
    (`mouseup`, function(e){ checkProperValueKeyInput.call(this, e) },true  ));

let operatorElements = Array.from(document.getElementsByClassName(`operandBox basicOperator`));
operatorElements.forEach(box => box.addEventListener
    (`mouseup`, function(e){ checkProperOperatorKeyInput.call(this, e) },true  ));
