function toggleForm() {
    var signInForm = document.getElementById('sign-in-form');
    var signUpForm = document.getElementById('sign-up-form');
    var formTitle = document.getElementById('form-title');

    if (signInForm.style.display === 'none') {
        signInForm.style.display = 'block';
        signUpForm.style.display = 'none';
        formTitle.textContent = 'Sign in';
    } else {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
        formTitle.textContent = 'Sign up for Share Space';
    }
}