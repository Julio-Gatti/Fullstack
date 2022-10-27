import Notification from './Notification'

const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleURLChange,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
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
