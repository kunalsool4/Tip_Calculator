//----------------------CLASS---------------------//
class TipCalculator {
  //data members for tip
  bill; // total bill amount
  people; // no of people
  percentage; // tip percentage

  //calculate tip amount per person
  calculateTipAmount() {
    var totalTipAmount = (this.bill * this.percentage) / 100;
    var tipPerPerson = totalTipAmount / this.people;
    return tipPerPerson;
  }

  //calculate the total amount per person
  calculateTotalAmount() {
    var tipPerPerson = this.calculateTipAmount();
    var totalPerPerson = this.bill / this.people + tipPerPerson;
    return totalPerPerson;
  }
}
//creating a new tip object
var tip = new TipCalculator();

//------------------CONTROLLER FUNCTIONS--------------------//
//function called from DOM
function calculateTip(event) {
  if (event.keyCode == 13) {
    calculate();
  }
}
//controller for calculater
function calculate() {
  //getting the reference input fields from DOM
  var bill = document.getElementById("bill");
  var percentage = document.getElementById("percentage");
  var people = document.getElementById("people");

  //getting the values from input fields
  var billAmount = parseFloat(bill.value);
  var percentageValue = parseFloat(percentage.value);
  var peopleCount = parseFloat(people.value);

  //validating values
  if (billAmount < 0) {
    billAmount = 0;
    bill.value = 0;
    showErrorMsg('Bill amount cannot be less than 0');
  }
  if (percentageValue < 0) {
    percentageValue = 0;
    percentage.value = 0;
    showErrorMsg('Tip percentage cannot be less than 0');
  }
  if (percentageValue > 100) {
    percentageValue = 100;
    percentage.value = 100;
    showErrorMsg('Tip percentage cannot be greater than 100');
  }
  if (peopleCount < 1) {
    peopleCount = 1;
    people.value = 1;
    showErrorMsg('People count cannot be less than 1')
  }
  if (!Number.isInteger(peopleCount)) {
    peopleCount = Math.floor(peopleCount);
    people.value = peopleCount;
    showErrorMsg('People count cannot be in decimal')
  }

  //passing the values to the tip object
  tip.bill = billAmount;
  tip.percentage = percentageValue;
  tip.people = peopleCount;

  //calculaing tip
  var tipPerPerson = tip.calculateTipAmount().toFixed(2);
  var totalPerPerson = tip.calculateTotalAmount().toFixed(2);

  //diplaying answer in DOM
  displayAnswers(tipPerPerson, totalPerPerson, peopleCount);
}
//increase the value of input field
function increase(element) {
  var elementRef = document.getElementById(element);
  if (element == "percentage" && elementRef.value == 100) {
    showErrorMsg('Tip percentage cannot be greater than 100');
    return;
  } 
  elementRef.value++;
}
//decrease the value of input field
function decrease(element) {
  var elementRef = document.getElementById(element);

  if(elementRef.value == 0 && element == "percentage"){
    showErrorMsg('Tip percentage cannot be less than 0');
    return;
  }
  if (
    (elementRef.value == 1 && element == "people")
  ){
    showErrorMsg('People count cannot be less than 1');
    return;
  }
    
  elementRef.value--;
}

//------------------UI FUNCTIONS--------------------//
//function called from DOM
function displayAnswers(tipPerPerson, totalPerPerson, peopleCount) {
  //get the reference of the element diplaying answers from DOM
  var tipRef = document.getElementById("tip-per-person");
  var totalRef = document.getElementById("total-per-person");

  //passing values to display in DOM
  tipRef.textContent = `$ ${tipPerPerson}`;
  totalRef.textContent = `$ ${totalPerPerson}`;

  //checking the no. of people
  var perPersonTags = document.querySelectorAll(".per-person");
  var perPersonArray = Array.from(perPersonTags);

  //toggle 'per person' text based on no. of people
  if (peopleCount == 1) {
    perPersonArray.forEach((el) => {
      el.style.display = "none";
    });
  } else {
    perPersonArray.forEach((el) => {
      el.style.display = "block";
    });
  }
}
//display error if any
function showErrorMsg(message) {
  var errorText = document.getElementById("error-msg");
  errorText.textContent = message;
  errorText.style.opacity = 1;
  setTimeout(function () {
    errorText.style.opacity = 0;
  }, 2000);
}

//initializing the function
calculate();
