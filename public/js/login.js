// activity 18, public/js/loginFormHandler.js

const loginFormHandler = async function(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();;
    const password = document.querySelector('#password-login').value.trim();;

    if (username && password) {
        const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        //send user to dashboard if login is OK.
        document.location.replace('./dashboard');
        } else {
        alert('Failed to login');
        }
    }
};

    document
    .querySelector('#login-user')
    .addEventListener('submit', loginFormHandler);