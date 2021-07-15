// activity 28 Main/pulbic/js/logout.js
const logout = async function () {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Logout failed');
  }
};
document.querySelector('#logout').addEventListener('click', logout);