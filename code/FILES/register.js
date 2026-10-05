const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_password");
const form = document.getElementById("registerForm");

function validatePasswordInput() {
  const value = password.value;
  let errors = [];
  
  if (value.length < 8) {
    errors.push("At least 8 characters");
  }
  if (!/\d/.test(value)) {
    errors.push("At least 1 number");
  }
  if (!/[A-Z]/.test(value)) {
    errors.push("At least 1 uppercase letter");
  }
  
  if (errors.length > 0) {
    password.style.borderColor = "#d32f2f";
    password.title = "Password requirements:\n- " + errors.join("\n- ");
  } else {
    password.style.borderColor = "#4caf50";
    password.title = "Password meets all requirements";
  }
}

password.addEventListener("input", validatePasswordInput);

function validatePasswordMatch() {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords do not match");
    confirmPassword.style.borderColor = "#d32f2f";
  } else {
    confirmPassword.setCustomValidity("");
    confirmPassword.style.borderColor = "#4caf50";
  }
}

password.addEventListener("change", validatePasswordMatch);
password.addEventListener("input", validatePasswordMatch);
confirmPassword.addEventListener("keyup", validatePasswordMatch);

const nameInput = document.querySelector("input[name='name']");

function validateNameInput() {
  const value = nameInput.value;
  
  if (/\d/.test(value)) {
    nameInput.style.borderColor = "#d32f2f";
    nameInput.title = "Only letters are allowed (no numbers)";
  } else if (value.length < 3 && value.length > 0) {
    nameInput.style.borderColor = "#d32f2f";
    nameInput.title = "Full name must be at least 3 characters";
  } else if (value.length > 50) {
    nameInput.style.borderColor = "#d32f2f";
    nameInput.title = "Full name must be 50 characters or less";
  } else if (value.length === 0) {
    nameInput.style.borderColor = "";
    nameInput.title = "";
  } else {
    nameInput.style.borderColor = "#4caf50";
    nameInput.title = "Full name is valid";
  }
}

nameInput.addEventListener("input", validateNameInput);


const captchaDisplay = document.getElementById("captchaDisplay");
const captchaInput = document.getElementById("captchaInput");
const refreshBtn = document.getElementById("refreshCaptcha");


let currentCaptcha = "";

function generateCaptcha() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  
  currentCaptcha = result;
  captchaDisplay.innerText = result;
  captchaInput.value = "";
}

window.onload = function() {
  generateCaptcha();
};
refreshBtn.onclick = generateCaptcha;


form.onsubmit = function(event) {
  if (captchaInput.value !== currentCaptcha) {
    alert("Incorrect CAPTCHA code. Please try again.");
    generateCaptcha(); 
    event.preventDefault();
    return false;
  }

  alert("Form submitted successfully!");
  return true;
};