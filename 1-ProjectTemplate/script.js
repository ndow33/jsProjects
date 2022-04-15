const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Functions

//show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message
}
//show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}

//check if email is valid
function checkEmail(input) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Invalid email')
    }
}

//check required fields are filled out
function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}

//get the fields name with the first letter capitalized
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

//check the length of the password
function checkLength(inputArr, min, max) {
    inputArr.forEach(function(input){
        if (input.value.length < min) {
            showError(input, `${getFieldName(input)} must be at least ${min} characters in length`)
        } else if (input.value.length > max) {
            showError(input,`${getFieldName(input)} must be less than ${max} characters in length`)
        } else {
            showSuccess(input)
        }
    })
}

//make sure the passwords match
function checkPassword(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Your passwords must match')
    }
}

//event listener(s)
form.addEventListener('submit', function(e) {
    e.preventDefault();

   checkRequired([username, email, password, password2]);
   checkLength([username, password, password2], 6, 20)
   checkEmail(email)
   checkPassword(password, password2)
})