import { useState } from 'react'

const Blog = ({ blog, like, remove, user }) => {
  const [full, setFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setFull(!full)}>
        {full ? 'Hide' : 'View'}
      </button>
      {full &&
        <div>
          <p>
            {blog.url}
          </p>
          Likes {blog.likes}
          <button id='like' onClick={() => like(blog)}>
            Like
          </button>
          <p>
            {blog.author}
          </p>
          {(blog.user && /*blog.user.id === */user.id) &&
            <button onClick={() => remove(blog)}>
              Remove
            </button>
          }
        </div>
      }
    </div>
  )
}

export default Blog
