async function submitCommentHandler(event) {
  event.preventDefault()

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ]
  const comment_text = document.querySelector('#comment-text').value.trim()

  if (comment_text) {
    // making sure we have comment text
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        comment_text,
        post_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // checking to make sure everything works well
    if (response.ok) {
      document.location.reload()
    } else {
      alert(response.statusText)
    }
  }
}

// post a comment
document
  .querySelector('#post-comment-btn')
  .addEventListener('click', submitCommentHandler)
