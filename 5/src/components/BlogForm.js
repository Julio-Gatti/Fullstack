import { useState } from 'react'
import Notification from './Notification'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setURL(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="Username"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="Password"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            value={url}
            name="Password"
            onChange={handleURLChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
