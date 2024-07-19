function toggleForm() {
    const signInForm = document.getElementById('sign-in-form');
    const signUpForm = document.getElementById('sign-up-form');
    const formTitle = document.getElementById('form-title');

    if (signInForm.style.display === 'none') {
        signInForm.style.display = 'block';
        signUpForm.style.display = 'none';
        formTitle.textContent = 'Share Space';
    } else {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
        formTitle.textContent = 'Sign Up for Share Space';
    }
}

function signUp() {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (username && email && password) {
        const user = {
            username: username,
            email: email,
            password: password
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        // Redirect to the homepage
        window.location.href = 'index.html'; 
    } else {
        alert('Please fill in all fields');
    }
}
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => (user.username === username || user.email === username) && user.password === password);

    if (user) {
        // Store the logged-in user
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));

        // Redirect to the homepage
        window.location.href = 'index.html'; 
    } else {
        alert('Invalid username or password');
    }
}
// function logOut() {
//     sessionStorage.removeItem('loggedInUser');
//     window.location.href = 'login.html'; 
// }