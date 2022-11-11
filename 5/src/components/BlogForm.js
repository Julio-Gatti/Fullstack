import { useState } from 'react'

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
            id='title'
            type="text"
            value={title}
            name="Username"
            onChange={handleTitleChange}
            placeholder='Title'
          />
        </div>
        <div>
          Author
          <input
            id='author'
            type="text"
            value={author}
            name="Password"
            onChange={handleAuthorChange}
            placeholder='Author'
          />
        </div>
        <div>
          URL
          <input
            id='url'
            type="text"
            value={url}
            name="Password"
            onChange={handleURLChange}
            placeholder='URL'
          />
        </div>
        <button id='create' type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
