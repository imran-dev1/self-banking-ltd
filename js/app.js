// Login Functions
const userEmail = document.querySelector(".user-email");
const userPass = document.querySelector(".user-password");
function login() {
   if (userEmail.value == "demo@gmail.com" && userPass.value == "12345") {
      window.location.href = "account.html";
   } else if (userEmail.value == "" || userPass.value == "") {
      const loginError = document.getElementById("login-error");
      loginError.innerText = "Please provide Email and Password!";
      loginError.classList.remove("hidden");
   } else {
      const loginError = document.getElementById("login-error");
      loginError.innerText = "Email or Password is incorrect!";
      loginError.classList.remove("hidden");
   }
}

// Copy Login Credentials

const copyUserMessage = document.getElementById("copied-user");
const copyPassMessage = document.getElementById("copied-pass");
function copy_user() {
   const userEmailText = document.getElementById("user-email");
   navigator.clipboard.writeText(userEmailText.innerText);
   userEmail.value = userEmailText.innerText;

   copyPassMessage.innerText = "";
   copyUserMessage.innerText = "Copied!";
}
function copy_pass() {
   const userPassText = document.getElementById("user-pass");
   navigator.clipboard.writeText(userPassText.innerText);
   userPass.value = userPassText.innerText;

   copyUserMessage.innerText = "";
   copyPassMessage.innerText = "Copied!";
}

function logout() {
   window.location.href = "/";
}

// Account Dashboard

function getTheTag(id) {
   return document.getElementById(id);
}

function getInputValue(id) {
   const field = document.getElementById(id);
   const value = parseFloat(field.value);
   return value;
}

function getInnerText(id) {
   const field = document.getElementById(id);
   const tagValue = parseFloat(field.innerText);
   return tagValue;
}

function calculate(innerText, inputField, isAdding) {
   const previousWithdrawInnerText = getInnerText(innerText);
   const inputValue = getInputValue(inputField);
   const newWithdrawTotal = previousWithdrawInnerText + inputValue;

   getTheTag(innerText).innerText = newWithdrawTotal;
   getTheTag(inputField).value = "";

   const previousBalanceTotal = getInnerText("b_amount");
   if (isAdding == true) {
      const newBalanceTotal = previousBalanceTotal + inputValue;

      getTheTag("b_amount").innerText = newBalanceTotal;
   } else {
      const newBalanceTotal = previousBalanceTotal - inputValue;

      getTheTag("b_amount").innerText = newBalanceTotal;
   }
}

const depositSuccess = document.getElementById("deposit-success");
const withdrawSuccess = document.getElementById("withdraw-success");
function removeDepositMessage() {
   depositSuccess.style.opacity = "0";
}
function removeWithdrawMessage() {
   withdrawSuccess.style.opacity = "0";
}

// Deposit handler
const depositErrorMessage = document.getElementById("deposit-error-message");
const withdrawErrorMessage = document.getElementById("withdraw-error-message");
getTheTag("deposit_btn").addEventListener("click", function () {
   if (getInputValue("deposit_field") > 0) {
      withdrawErrorMessage.innerText = "";
      depositErrorMessage.innerText = "";
      calculate("d_amount", "deposit_field", true);

      depositSuccess.style.opacity = "1";
      setTimeout(removeDepositMessage, 1000);
   } else {
      getTheTag("deposit_field").value = "";

      depositErrorMessage.innerText = "Please add a valid deposit amount!";
   }
});

// Withdraw handler

getTheTag("withdraw_btn").addEventListener("click", function () {
   if (
      getInputValue("withdraw_field") <= getInnerText("b_amount") &&
      getInputValue("withdraw_field") > 0
   ) {
      depositErrorMessage.innerText = "";
      withdrawErrorMessage.innerText = "";
      calculate("w_amount", "withdraw_field", false);
      withdrawSuccess.style.opacity = "1";
      setTimeout(removeWithdrawMessage, 1000);
   } else if (getInputValue("withdraw_field") > getInnerText("b_amount")) {
      getTheTag("withdraw_field").value = "";
      withdrawErrorMessage.innerText =
         "You do not have enough amount to withdraw!";
   } else {
      getTheTag("withdraw_field").value = "";
      withdrawErrorMessage.innerText = "Please add a valid withdraw amount!";
   }
});
