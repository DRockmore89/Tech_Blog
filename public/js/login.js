const loginFormHandler = async function (event) {
    event.preventDefault();
  
    const userName = document.querySelector('#username-login');
    const passWord = document.querySelector('#password-login');
  
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: userName.value,
        password: passWord.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // alert('You have successfully logged in!')
      document.location.replace('/dashboard');
    } else {
      alert('Login failed');
    }
  };
  document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);