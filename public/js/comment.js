const commentFormHandler = async function (event) {
    event.preventDefault();
  
    const commentBody = document.querySelector(
      'textarea[name="comment-body"]'
    ).value;
    const postID = document.querySelector('input[name="post-id"]').value;
  
    if (commentBody) {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          postID,
          commentBody,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      document.location.reload();
    }
  };
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);