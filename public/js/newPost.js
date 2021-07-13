const newPostFormHandler = async function(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="postTitle"]').value.trim();
    const body = document.querySelector('textarea[name="postContent"]').value.trim();
  
    await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({title, body,}),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/dashboard');
  };
  
  document
    .querySelector('#newPost')
    .addEventListener('submit', newPostFormHandler);
