const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const emailStatus = document.getElementById('forEmail');
const passStatus = document.getElementById('forPass'); //will also tc of success message
const divElem = document.getElementById('finalCheck');
const errorMesg = document.createElement('p');
const checkEmail = inputs[0];
const checkPass = inputs[1];

function isInputEmpty(input) {
  return input.value.trim() === '';
}

checkEmail.addEventListener('change', () => {
  //we can use input events for real time validation
  const email = checkEmail.value;
  if (email.length < 3 || !email.includes('@') || !email.includes('.')) {
    hasErrors = true;
    emailStatus.style.cssText = `color: red; font-size : 0.9rem; margin-top: 9px;`;
    emailStatus.innerText = `Make sure email is more than 3 characters and has @ and a .`;
  } else {
    emailStatus.innerText = '';
    hasErrors = false;
  }
});

checkPass.addEventListener('change', () => {
  const pass = checkPass.value;
  const specialChars = ['!', '@', '|', '$', '%', '!', '*', '#', '^'];
  let hasSpecialChars = false;
  specialChars.forEach((c) => {
    if (pass.includes(c)) hasSpecialChars = true;
  });
  passStatus.style.cssText = `color:red; font-size:0.9rem; margin-top: 9px;`;
  if (pass.length <= 8) {
    hasErrors = true;
    passStatus.innerText = `Make sure password is more than 8 characters`;
  } else if (!hasSpecialChars) {
    hasErrors = true;
    passStatus.innerText = `Make sure password contains any special char(eg : symbols from button 1-8)`;
  } else {
    hasErrors = false;
    passStatus.style.color = 'green';
    passStatus.innerText = 'All good to go!';
  }
});

for (let t of inputs) {
  t.addEventListener('input', () => {
    errorMesg.innerText = '';
  });
}

form.addEventListener('submit', (event_details) => {
  event_details.preventDefault();

  const emailInput = checkEmail.value.trim();
  const passwordInput = checkPass.value.trim();

  if (isInputEmpty(checkEmail) || isInputEmpty(checkPass)) {
    errorMesg.style.cssText = `color: red; font-size: 0.9rem; margin-top: 15px;`;
    errorMesg.innerText = 'Please fill in both the email and password fields.';
    divElem.append(errorMesg);
  } else if (!hasErrors) {
    const confirmed = confirm('Are you sure you want to submit the form?');
    errorMesg.innerText = ``;
    errorMesg.remove();
    if (confirmed) {
      alert("successful signup!");
      form.submit();
    } else {
      window.location.href = window.location.href; //reloading the page, input value goes itself
    }
  } else {
    errorMesg.style.cssText = `color: red; font-size: 0.9rem; margin-top: 15px;`;
    errorMesg.innerText = `First fill the form correctly`;
    divElem.append(errorMesg);
    console.log('checking', errorMesg, divElem);
  }
});