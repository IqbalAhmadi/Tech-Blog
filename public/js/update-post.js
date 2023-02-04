async function createPostHandler(event) {
  event.preventDefault()

  const title = document.querySelector('#post-title').value.trim()
  const body = document.querySelector('#comment-text').value.trim()
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ]

  if (body) {
    // making sure we have comment text
    const response = await fetch('/api/posts/' + post_id, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // checking to make sure everything works well
    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      alert(response.statusText)
    }
  }
}

// post a comment
document
  .querySelector('#create-post-btn')
  .addEventListener('click', createPostHandler)
